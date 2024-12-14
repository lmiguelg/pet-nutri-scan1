import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface AnalysisResultProps {
  analysis: string;
}

interface AnalysisData {
  concerns: string[];
  recommendations: string[];
}

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  let analysisData: AnalysisData;
  
  try {
    // Parse the JSON string from the content field
    const parsed = JSON.parse(analysis);
    analysisData = JSON.parse(parsed.choices[0].message.content);
  } catch (error) {
    console.error('Error parsing analysis:', error);
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Error parsing analysis data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Concerns Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold text-lg">Ingredient Concerns & Warnings</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            {analysisData.concerns.map((concern, index) => (
              <li key={index} className="text-gray-700">
                {concern}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-lg">Recommendations</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            {analysisData.recommendations.map((recommendation, index) => (
              <li key={index} className="text-gray-700">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};