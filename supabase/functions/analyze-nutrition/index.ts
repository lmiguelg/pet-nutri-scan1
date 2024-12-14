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
    console.log('Analyzing image for pet:', petInfo.name);

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
            content: "You are a pet nutritionist expert. Analyze the nutritional information from pet food labels and provide recommendations based on the pet's profile. Return your analysis in a specific JSON format with two main sections: 'concerns' (a list of ingredient concerns and warnings) and 'recommendations' (a list of specific recommendations)."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Please analyze this pet food label for a ${petInfo.age} year old ${petInfo.petType} named ${petInfo.name}. They weigh ${petInfo.weight} pounds.${petInfo.allergies?.length ? ` They have allergies to: ${petInfo.allergies.join(', ')}.` : ''} ${petInfo.healthIssues?.length ? ` They have the following health issues: ${petInfo.healthIssues.join(', ')}.` : ''} Format your response as JSON with 'concerns' and 'recommendations' arrays.`
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API Error: ${JSON.stringify(error)}`);
    }

    const data = await openAIResponse.json();
    console.log('Analysis completed successfully');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-nutrition function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});