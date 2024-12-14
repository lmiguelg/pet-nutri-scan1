import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Bone, PawPrint, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PawPrint className="h-9 w-9 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">PetNutriScan</h1>
          </div>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          {/* Left Column - Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Care Of Your<br />
                Little Pets <Bone className="inline h-8 w-8 text-primary" />
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We believe finding the right nutrition for your pet should be easy.
                So we make sure every meal is safe and healthy for your family member.
              </p>
            </div>

            <div className="flex gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-primary hover:bg-primary-600">
                  Scan Food
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Updated Safety Notice */}
            <div className="space-y-4">
              <Alert className="bg-primary-50 border-primary-200">
                <AlertCircle className="h-4 w-4 text-primary-600" />
                <AlertTitle className="text-primary-800">Important Safety Notice</AlertTitle>
                <AlertDescription className="text-primary-700">
                  Incorrect pet food can lead to serious health issues. Always verify ingredients carefully.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1581171383994-afd540b6a4da?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dog eating from a bowl"
            className="rounded-2xl shadow-xl w-full h-auto object-cover"
          />

          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-gray-900 text-white p-10 rounded-2xl">
              <div className="space-y-6">
                <PawPrint className="h-10 w-10" />
                <h3 className="text-2xl font-semibold">Nutrition Analysis</h3>
                <p className="text-gray-300">Let us know what we can do for your pet's diet</p>
                <Link to="/login" className="text-primary-300 hover:text-primary-200 inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-primary-600 text-white p-10 rounded-2xl">
              <div className="space-y-6">
                <Heart className="h-10 w-10" />
                <h3 className="text-2xl font-semibold">Feed with love</h3>
                <p className="text-primary-100">Feed your pet with love and ensure their health with proper nutrition</p>
                <Link to="/login" className="text-primary-200 hover:text-primary-100 inline-flex items-center">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-2xl">
              <div className="space-y-6">
                <BookOpen className="h-10 w-10" />
                <h3 className="text-2xl font-semibold">Pet stories</h3>
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
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-600 bg-white/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-700">
              <AlertCircle className="h-3 w-3" />
              <span className="font-medium">Medical Disclaimer</span>
            </div>
            <p className="mt-1 text-xs">
              This tool is for informational purposes only. Always consult with your veterinarian
              about your pet's specific dietary needs and before making any changes to their diet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
