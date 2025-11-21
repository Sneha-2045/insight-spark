import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap, Shield, Sparkles, Trophy, Users } from "lucide-react";
import { loginUser, signupUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

const roleCards = [
  {
    key: "student" as const,
    title: "Student",
    badge: "XP Hunter",
    description: "Daily streaks, pulse polls & badge drops",
    icon: GraduationCap,
    accent: "from-primary/50 to-emerald-400/50",
  },
  {
    key: "teacher" as const,
    title: "Teacher",
    badge: "Insight Maestro",
    description: "AI summaries, heatmaps & coaching loops",
    icon: BookOpen,
    accent: "from-amber-400/60 to-pink-500/50",
  },
  {
    key: "society" as const,
    title: "Society / Event",
    badge: "Hype Chief",
    description: "Live leaderboards & sponsor-ready decks",
    icon: Users,
    accent: "from-violet-500/60 to-indigo-400/60",
  },
];

const boostStats = [
  { label: "Avg. login streak", value: "17 days", detail: "top cohorts" },
  { label: "XP minted today", value: "82k", detail: "across roles" },
  { label: "Hackathons won", value: "9", detail: "with Flow decks" },
];

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "society" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUser(loginEmail, loginPassword);
      toast({
        title: "Success",
        description: "Login successful!",
      });
      // Navigate to the dashboard based on user's role from database
      navigate(`/dashboard/${user.role}`);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role first",
        variant: "destructive",
      });
      return;
    }

    if (!signupName || !signupEmail || !signupPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signupUser(signupName, signupEmail, signupPassword, selectedRole);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      navigate(`/dashboard/${selectedRole}`);
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="glowing-orb absolute -top-32 left-10" />
      <div className="glowing-orb absolute bottom-0 right-0 delay-[1500ms]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-primary/20">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">FeedbackFlow</p>
              <h1 className="text-3xl font-semibold">Mission Login</h1>
            </div>
          </div>
          <p className="mt-4 text-white/70">
            Pick your role, charge up your dashboard, and sync live with campus squads. Every login keeps your streak blazing.
          </p>

          <div className="mt-8 grid gap-4">
            {roleCards.map((role) => {
              const Icon = role.icon;
              const active = selectedRole === role.key;
              return (
                <button
                  key={role.key}
                  onClick={() => setSelectedRole(role.key)}
                  className={`group flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition ${
                    active ? "border-primary/70 bg-white/10 shadow-lg shadow-primary/30" : "border-white/10 bg-white/5 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold">{role.title}</p>
                        <Badge className="rounded-full border-none bg-white/15 text-xs text-white/80">{role.badge}</Badge>
                      </div>
                      <p className="text-sm text-white/70">{role.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/60 transition group-hover:translate-x-1" />
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {boostStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-white/60">{stat.label}</p>
                <p className="mt-2 text-xl font-semibold">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.detail}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-primary/30">
          <div className="space-y-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="mb-4">
                  <p className="text-sm text-white/70">Login with your email and password</p>
                </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/80">
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@campus.edu" 
                      className="border-white/20 bg-black/20 text-white placeholder:text-white/40"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isLoading) {
                          handleLogin();
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/80">
                      Password
                    </Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="border-white/20 bg-black/20 text-white placeholder:text-white/40"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isLoading) {
                          handleLogin();
                        }
                      }}
                    />
                  </div>
                  <Button 
                    className="w-full rounded-full bg-gradient-to-r from-primary to-accent font-semibold shadow-lg shadow-primary/40" 
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  {!selectedRole && (
                    <div className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
                      <p className="font-semibold">Select a role first</p>
                      <p className="mt-1 text-xs text-amber-200/80">Please choose your role from the left to continue with signup.</p>
                    </div>
                  )}
                  {selectedRole && (
                    <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div>
                        <p className="text-xs text-white/70">Signing up as</p>
                        <p className="text-lg font-semibold capitalize">{selectedRole}</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/30 text-white" onClick={() => setSelectedRole(null)}>
                        Change
                      </Button>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80">
                      Full Name
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Avery Patel" 
                      className="border-white/20 bg-black/20 text-white placeholder:text-white/40"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white/80">
                      Campus Email
                    </Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="you@campus.edu" 
                      className="border-white/20 bg-black/20 text-white placeholder:text-white/40"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white/80">
                      Create Password
                    </Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="border-white/20 bg-black/20 text-white placeholder:text-white/40"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    className="w-full rounded-full bg-white/90 font-semibold text-slate-900 hover:bg-white" 
                    onClick={handleSignup}
                    disabled={isLoading || !selectedRole}
                  >
                    {isLoading ? "Creating..." : "Create & jump in"}
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  SOC 2 ready · SSO friendly · Privacy-first
                </div>
              </div>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
