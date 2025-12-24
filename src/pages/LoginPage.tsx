import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // TODO: Implement Supabase Google OAuth
    toast({
      title: "Coming soon",
      description: "Google SSO will be configured with Supabase",
    });
    setIsLoading(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement Supabase email/password auth
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="relative mx-auto mb-6 inline-flex">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 shadow-glow-md">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-success border-2 border-background">
              <Sparkles className="h-3 w-3 text-success-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            MXLens Admin
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Internal Operations Dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          {/* 2FA Notice */}
          <div className="mb-6 rounded-xl bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warning/20">
                <Shield className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-warning">Security Notice</p>
                <p className="text-xs text-warning/80 mt-0.5">
                  All admin accounts require 2FA enabled.
                </p>
              </div>
            </div>
          </div>

          {/* Google SSO */}
          <Button
            variant="outline"
            className="w-full h-12 justify-center gap-3 text-sm font-medium group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span className="relative z-10">Sign in with Google</span>
            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground tracking-wider">
                Emergency fallback
              </span>
            </div>
          </div>

          {/* Email/Password Toggle */}
          {!showEmailForm ? (
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground group"
              onClick={() => setShowEmailForm(true)}
            >
              <Mail className="mr-2 h-4 w-4 group-hover:text-primary transition-colors duration-300" />
              Use email and password
            </Button>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-5 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@mxlens.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-11 input-premium"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-11 input-premium"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 font-medium btn-glow group" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                <span>Sign in</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Access restricted to authorized MXLens personnel only.
        </p>
      </div>
    </div>
  );
}
