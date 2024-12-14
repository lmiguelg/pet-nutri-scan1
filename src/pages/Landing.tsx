import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Bone, PawPrint, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PawPrint className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">PetNutriScan</h1>
          </div>
          <Link to="/login">
            <Button variant="outline">Sign up →</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Care Of Your<br />
                Little Pets <Bone className="inline h-8 w-8 text-primary" />
              </h2>
              <p className="text-xl text-gray-600">
                We believe finding the right nutrition for your pet should be easy.
                So we make sure every meal is safe and healthy for your family member.
              </p>
            </div>

            <div className="flex gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-primary hover:bg-primary-600">
                  Our Services
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule a scan
              </Button>
            </div>

            {/* Alerts Section */}
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Safety Notice</AlertTitle>
                <AlertDescription>
                  Incorrect pet food can lead to serious health issues. Always verify ingredients carefully.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden md:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80"
                alt="Happy pets"
                className="rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-100/50 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gray-900 text-white p-8 rounded-2xl">
            <div className="space-y-4">
              <PawPrint className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Nutrition Analysis</h3>
              <p className="text-gray-300">Let us know what we can do for your pet's diet</p>
              <Link to="/login" className="text-primary-300 hover:text-primary-200 inline-flex items-center">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="bg-primary-600 text-white p-8 rounded-2xl">
            <div className="space-y-4">
              <Heart className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Feed with love</h3>
              <p className="text-primary-100">Feed your pet with love and ensure their health with proper nutrition</p>
              <Link to="/login" className="text-primary-200 hover:text-primary-100 inline-flex items-center">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-2xl">
            <div className="space-y-4">
              <BookOpen className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Pet stories</h3>
              <p className="text-gray-300">Read success stories from our happy pet parents</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">55+</span>
                <span className="text-gray-400">stories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Medical Disclaimer</AlertTitle>
          <AlertDescription>
            This tool is for informational purposes only. Always consult with your veterinarian
            about your pet's specific dietary needs and before making any changes to their diet.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Landing;