"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useAuth } from "~/hooks/useAuth";
import { ThemeToggle } from "~/components/theme-toggle";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const { signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Signed in successfully! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 800);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to sign in. Please check your credentials.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const result = await signUp(data.email, data.password);
      if (result.session) {
        toast.success("Account created successfully! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 800);
      } else {
        toast.success("Account created! Please check your email to confirm registration.");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to create account. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-4  rounded-md bg-ac cent overflow-hidden">
      <Card className="w-full min-w-xl shadow-none backdrop-blur-2xl border-none relative overflow-hidden hidden sm:flex flex-col justify-between p-8 rounded-r-none">
        <div className="relative z-10 space-y-4 max-w-[280px]">
          <h2 className="text-3xl font-semibold italic tracking-tight leading-tight">
            Make day more Productive using <span className="text-primary">GitBro</span>.
          </h2>
        </div>

        {/* Premium SVG linear curve wave graph at bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full h-56"
            viewBox="0 0 500 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Back Wave Layer */}
            <motion.path
              fill="url(#waveGrad3)"
              animate={{
                d: [
                  "M0,250 L0,140 Q125,180 250,130 Q375,80 500,150 L500,250 Z",
                  "M0,250 L0,160 Q125,100 250,160 Q375,210 500,130 L500,250 Z",
                  "M0,250 L0,120 Q125,150 250,110 Q375,170 500,160 L500,250 Z",
                  "M0,250 L0,140 Q125,180 250,130 Q375,80 500,150 L500,250 Z",
                ],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Middle Wave Layer */}
            <motion.path
              fill="url(#waveGrad2)"
              animate={{
                d: [
                  "M0,250 L0,160 Q125,90 250,150 Q375,200 500,120 L500,250 Z",
                  "M0,250 L0,110 Q125,170 250,100 Q375,140 500,170 L500,250 Z",
                  "M0,250 L0,150 Q125,110 250,170 Q375,90 500,110 L500,250 Z",
                  "M0,250 L0,160 Q125,90 250,150 Q375,200 500,120 L500,250 Z",
                ],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Front Wave Layer */}
            <motion.path
              fill="url(#waveGrad1)"
              stroke="var(--primary)"
              strokeWidth="2"
              animate={{
                d: [
                  "M0,250 L0,180 Q125,110 250,160 Q375,90 500,140 L500,250 Z",
                  "M0,250 L0,130 Q125,190 250,110 Q375,170 500,100 L500,250 Z",
                  "M0,250 L0,160 Q125,120 250,180 Q375,110 500,150 L500,250 Z",
                  "M0,250 L0,180 Q125,110 250,160 Q375,90 500,140 L500,250 Z",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Ambient Glow */}
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-40 bg-primary/25 blur-3xl rounded-full"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.95, 1.1, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </Card>

      <Card className="w-full max-w-xl shadow-none bg-card p-6 sm:p-10 rounded-l-none relative">
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Gitbro Account</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={(val) => {
              setActiveTab(val);
              router.replace(`/auth?mode=${val}`, { scroll: false });
            }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="login" className="text-sm font-medium ">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-sm font-medium ">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      {...loginForm.register("email")}
                      className="pl-11 h-12 text-base rounded-lg"
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive font-medium">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...loginForm.register("password")}
                      className="pl-11 pr-11 h-12 text-base rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive font-medium">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 h-12 text-base font-semibold rounded-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      {...signUpForm.register("email")}
                      className="pl-11 h-12 text-base rounded-lg"
                    />
                  </div>
                  {signUpForm.formState.errors.email && (
                    <p className="text-sm text-destructive font-medium">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      {...signUpForm.register("password")}
                      className="pl-11 pr-11 h-12 text-base rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {signUpForm.formState.errors.password && (
                    <p className="text-sm text-destructive font-medium">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 h-12 text-base font-semibold rounded-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-xs text-muted-foreground hover:underline hover:cursor-pointer capitalize">
            privacy-policy & Terms of Use
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <AuthContent />
      </Suspense>
    </main>
  );
}
