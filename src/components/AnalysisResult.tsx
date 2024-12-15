import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResultProps {
  analysis: string;
}

interface AnalysisData {
  concerns: string[];
  recommendations: string[];
  score: number;
}

const getScoreColor = (score: number) => {
  // Bad scores (1-4) - red to yellow
  if (score <= 4) {
    return "bg-gradient-to-r from-[#ea384c] to-[#FEF7CD]";
  }
  // Medium scores (5-7) - yellow
  if (score <= 7) {
    return "bg-[#FEF7CD]";
  }
  // Good scores (8-10) - yellow to green
  return "bg-gradient-to-r from-[#FEF7CD] to-[#F2FCE2]";
};

const getScoreTextColor = (score: number) => {
  if (score <= 4) return "text-red-700";
  if (score <= 7) return "text-yellow-700";
  return "text-green-700";
};

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  let analysisData: AnalysisData;
  
  try {
    // The analysis should already be a JSON object
    analysisData = typeof analysis === 'string' ? JSON.parse(analysis) : analysis;

    // Validate the structure
    if (!Array.isArray(analysisData.concerns) || 
        !Array.isArray(analysisData.recommendations) || 
        typeof analysisData.score !== 'number') {
      throw new Error('Invalid analysis data structure');
    }
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
        {/* Score Section */}
        <div className={cn(
          "p-4 rounded-lg transition-colors duration-300",
          getScoreColor(analysisData.score)
        )}>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <h3 className="font-semibold text-lg">Nutrition Score</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-3xl font-bold transition-colors duration-300",
              getScoreTextColor(analysisData.score)
            )}>
              {analysisData.score}
            </span>
            <span className="text-gray-600">/10</span>
          </div>
        </div>

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