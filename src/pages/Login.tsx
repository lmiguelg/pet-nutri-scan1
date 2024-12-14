import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT") {
        navigate("/login");
      } else if (event === "USER_UPDATED") {
        console.log("User updated:", session?.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-600 to-primary-800 p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-primary-200/20">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-primary-100/90 text-primary-800 hover:bg-primary-200/90">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8 text-primary-800">Welcome to PetNutriScan</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#7C3AED',
                  brandAccent: '#6D28D9',
                  inputBackground: 'white',
                  inputText: '#1F2937',
                  inputBorder: '#E5E7EB',
                  inputBorderHover: '#7C3AED',
                  inputBorderFocus: '#6D28D9',
                }
              }
            },
            className: {
              container: 'auth-container',
              button: 'auth-button',
              input: 'auth-input',
            }
          }}
          theme="default"
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Login;