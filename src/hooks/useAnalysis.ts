import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { PetInfo } from "@/types/pet";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export const useAnalysis = (selectedPet: PetInfo) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const { data: subscriptionData } = useQuery({
    queryKey: ['subscription-status'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const response = await fetch('https://ktxnppezwuiulgmbmeip.functions.supabase.co/check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to check subscription');
      return response.json();
    },
  });

  const { data: scanCount } = useQuery({
    queryKey: ['scan-count'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      // First try to get existing record
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('free_scans_used')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code === 'PGRST116') {
        // No record exists, create one
        const { data: newData, error: insertError } = await supabase
          .from('user_subscriptions')
          .insert({ user_id: user.id, free_scans_used: 0 })
          .select('free_scans_used')
          .single();
        
        if (insertError) throw insertError;
        return newData.free_scans_used;
      } else if (error) {
        throw error;
      }
      
      return data.free_scans_used;
    },
  });

  const startCheckout = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const response = await fetch('https://ktxnppezwuiulgmbmeip.functions.supabase.co/create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to create checkout session');
      
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    }
  };

  const analyzeImage = async (image: File) => {
    const isSubscribed = subscriptionData?.subscribed;
    const currentScans = scanCount || 0;

    if (!isSubscribed && currentScans >= 2) {
      toast({
        title: "Scan limit reached",
        description: "You've used all your free scans. Upgrade to continue analyzing pet food!",
        action: <Button onClick={startCheckout}>Upgrade</Button>,
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const reader = new FileReader();
      
      const readerPromise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });

      const base64Image = await readerPromise as string;
      
      const response = await fetch('https://ktxnppezwuiulgmbmeip.functions.supabase.co/analyze-nutrition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
          petInfo: selectedPet,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      setAnalysis(data);

      // Update scan count if not subscribed
      if (!isSubscribed) {
        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            free_scans_used: currentScans + 1,
          });

        if (updateError) {
          console.error('Error updating scan count:', updateError);
        }
      }

      const { error: dbError } = await supabase
        .from('pet_food_analyses')
        .insert({
          pet_id: selectedPet.id,
          analysis_text: data,
          image_data: base64Image,
          score: data.score,
        });

      if (dbError) {
        console.error('Error saving analysis:', dbError);
        toast({
          title: "Warning",
          description: "Analysis completed but couldn't save to history",
          variant: "destructive",
        });
      }
      
      toast({
        title: "Analysis Complete",
        description: "The nutritional information has been analyzed!",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analysis,
    setAnalysis,
    isAnalyzing,
    analyzeImage,
    isSubscribed: subscriptionData?.subscribed,
    scanCount,
    startCheckout,
  };
};