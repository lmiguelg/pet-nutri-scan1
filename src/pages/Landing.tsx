import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Bowl, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PawPrint className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold text-gray-900">PetNutriScan</h1>
              </div>
              <p className="text-xl text-gray-600">
                Ensure your pet's food is safe and nutritious. Scan pet food labels
                instantly for personalized analysis.
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/login">
                <Button size="lg" className="w-full md:w-auto">
                  <Bowl className="mr-2" />
                  Analyze Pet Food Now
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Alerts Section */}
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Safety Notice</AlertTitle>
                <AlertDescription>
                  Incorrect pet food can lead to serious health issues. Always verify
                  ingredients carefully.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Medical Disclaimer</AlertTitle>
                <AlertDescription>
                  This tool is for informational purposes only. Always consult with
                  your veterinarian about your pet's specific dietary needs and
                  before making any changes to their diet.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="hidden md:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80"
                alt="Happy dog and cat"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-100/50 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;