import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInFormData, setSignInFormData] = useState({
    userEmail: "",
    password: "",
  });
  const [signUpFormData, setSignUpFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function handleSignIn() {
    // Handle Sign In logic here (API call)
    console.log("Sign In: ", signInFormData);
  }

  function handleSignUp() {
    // Handle Sign Up logic here (API call)
    console.log("Sign Up: ", signUpFormData);
  }

  // Check if all fields are filled in for Sign In form
  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  // Check if all fields are filled in for Sign Up form
  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInFormData.userEmail}
                    onChange={(e) =>
                      setSignInFormData({
                        ...signInFormData,
                        userEmail: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInFormData.password}
                    onChange={(e) =>
                      setSignInFormData({
                        ...signInFormData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSignIn}
                  className="w-full"
                  disabled={!checkIfSignInFormIsValid()}
                >
                  Sign In
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label htmlFor="signup-username">Username</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    value={signUpFormData.userName}
                    onChange={(e) =>
                      setSignUpFormData({
                        ...signUpFormData,
                        userName: e.target.value,
                      })
                    }
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpFormData.userEmail}
                    onChange={(e) =>
                      setSignUpFormData({
                        ...signUpFormData,
                        userEmail: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpFormData.password}
                    onChange={(e) =>
                      setSignUpFormData({
                        ...signUpFormData,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSignUp}
                  className="w-full"
                  disabled={!checkIfSignUpFormIsValid()}
                >
                  Sign Up
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
