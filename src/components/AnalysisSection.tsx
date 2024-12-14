import { AnalysisResult } from "./AnalysisResult";
import { Scanner } from "./Scanner";

interface AnalysisSectionProps {
  analysis: string | null;
  onImageCapture: (image: File) => void;
}

export const AnalysisSection = ({ analysis, onImageCapture }: AnalysisSectionProps) => {
  return (
    <div className="space-y-6">
      <Scanner onImageCapture={onImageCapture} />
      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
};