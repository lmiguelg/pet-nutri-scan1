import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, petInfo } = await req.json();

    // Remove the data:image/jpeg;base64, prefix if it exists
    const base64Image = image.split(',')[1] || image;

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a pet nutritionist expert. Analyze the nutritional information from pet food labels and provide recommendations based on the pet's profile."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Please analyze this pet food label for a ${petInfo.age} year old ${petInfo.petType} named ${petInfo.name}. They weigh ${petInfo.weight} pounds.${petInfo.allergies.length ? ` They have allergies to: ${petInfo.allergies.join(', ')}.` : ''} ${petInfo.healthIssues.length ? ` They have the following health issues: ${petInfo.healthIssues.join(', ')}.` : ''} Please provide a detailed analysis of whether this food is suitable for them, including any concerns or recommendations.`
              },
              {
                type: "image",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to analyze image');
    }

    const data = await openAIResponse.json();
    console.log('OpenAI Response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-nutrition function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});