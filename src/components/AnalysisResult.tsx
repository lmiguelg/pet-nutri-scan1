import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface AnalysisResultProps {
  analysis: string;
}

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  // Split the analysis into sections based on common patterns
  const sections = analysis.split(/(?=Ingredients:|Nutritional Analysis:|Recommendation:|Safety Concerns:|Suitability:)/).filter(Boolean);

  const getIcon = (sectionTitle: string) => {
    switch (true) {
      case sectionTitle.includes("Safety Concerns"):
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case sectionTitle.includes("Suitability"):
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const getSectionColor = (sectionTitle: string) => {
    switch (true) {
      case sectionTitle.includes("Safety Concerns"):
        return "bg-yellow-50 border-yellow-200";
      case sectionTitle.includes("Suitability"):
        return "bg-green-50 border-green-200";
      default:
        return "bg-blue-50 border-primary-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Nutritional Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section, index) => {
          const [title, ...content] = section.split("\n").filter(Boolean);
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getSectionColor(title)} space-y-2`}
            >
              <div className="flex items-center gap-2">
                {getIcon(title)}
                <h3 className="font-semibold text-gray-900">
                  {title.replace(":", "")}
                </h3>
              </div>
              <div className="text-gray-700 space-y-2">
                {content.map((line, i) => {
                  // Check if the line contains percentages or key nutrients
                  const isHighlight = /\d+%|protein|fat|fiber|calcium|vitamin/i.test(line);
                  return isHighlight ? (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="mr-2 mb-2"
                    >
                      {line.trim()}
                    </Badge>
                  ) : (
                    <p key={i}>{line.trim()}</p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};