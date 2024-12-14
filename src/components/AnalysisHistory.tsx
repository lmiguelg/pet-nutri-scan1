import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";
import { AnalysisResult } from "./AnalysisResult";
import { format } from "date-fns";

interface AnalysisHistoryProps {
  petId: string;
}

export const AnalysisHistory = ({ petId }: AnalysisHistoryProps) => {
  const { data: analyses = [], isLoading } = useQuery({
    queryKey: ['analyses', petId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pet_food_analyses')
        .select('*')
        .eq('pet_id', petId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!petId,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (analyses.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Analysis History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <div key={analysis.id} className="space-y-2">
                <p className="text-sm text-gray-500">
                  {format(new Date(analysis.created_at), "MMMM d, yyyy 'at' h:mm a")}
                </p>
                <AnalysisResult analysis={analysis.analysis_text} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};