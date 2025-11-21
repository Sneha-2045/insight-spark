import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Award, Flame, Gamepad2, MessageSquare, Rocket, Sparkles, Star, TrendingUp, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, verifyAuth, logoutUser } from "@/lib/auth";
import { dashboardApi } from "@/lib/api";
import { toast } from "@/hooks/use-toast";


const pulseStats = [
  { label: "Level", value: "07", detail: "Nova tier", icon: Trophy },
  { label: "Squad XP", value: "2,847", detail: "+240 today", icon: Zap },
  { label: "Badges", value: "12", detail: "3 legendary", icon: Award },
  { label: "Responses", value: "48", detail: "streak ×11", icon: MessageSquare },
];

const quests = [
  {
    title: "TechFest Remix",
    tag: "Event Feedback",
    reward: "+50 XP",
    detail: "Drop your take on stage transitions & workshops.",
    minutes: "3 min run",
    accent: "from-primary/50 to-emerald-400/40",
  },
  {
    title: "Data Structures Pulse",
    tag: "Course Sprint",
    reward: "+30 XP",
    detail: "Rate clarity, pace & lab synergy.",
    minutes: "5 min run",
    accent: "from-accent/50 to-pink-400/40",
  },
  {
    title: "Cafeteria Clash",
    tag: "Quick Poll",
    reward: "+10 XP",
    detail: "Vote the next hyperfuel menu.",
    minutes: "1 min run",
    accent: "from-secondary/50 to-amber-400/40",
  },
  {
    title: "Robotics Lab Debrief",
    tag: "Society Quest",
    reward: "+40 XP",
    detail: "Sync with mentors on hardware stack.",
    minutes: "4 min run",
    accent: "from-violet-500/40 to-indigo-400/40",
  },
];

const badgeStack = [
  { title: "Quick Responder", info: "sub 2m answers" },
  { title: "Detailed Analyst", info: "avg 180 words" },
  { title: "Event Enthusiast", info: "12 festivals" },
  { title: "Feedback Streak", info: "11 days" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verify token and get user data
        const verifiedUser = await verifyAuth();
        if (verifiedUser) {
          setUser(verifiedUser);
          // Fetch dashboard-specific data
          await dashboardApi.getStudentDashboard();
        } else {
          toast({
            title: "Authentication Error",
            description: "Please login again",
            variant: "destructive",
          });
          logoutUser();
          navigate("/login");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load dashboard",
          variant: "destructive",
        });
        logoutUser();
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="glowing-orb absolute -top-20 right-0" />
      <div className="glowing-orb absolute bottom-0 left-0 delay-[1600ms]" />

      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">FeedbackFlow</p>
              <p className="text-lg font-semibold">Student Arena</p>
            </div>
          </div>
          <Button variant="outline" className="border-white/30 text-white" onClick={handleLogout}>
            Exit arena
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-10 px-6 py-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-primary/20">
            <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70">Welcome back, {user?.name || "Student"}</p>
            <h1 className="text-4xl font-semibold">Your campus saga continues.</h1>
          </div>
              <Gamepad2 className="h-10 w-10 text-accent" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pulseStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>{stat.label}</span>
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
                    <p className="text-xs text-white/60">{stat.detail}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Level 07 → Level 08</span>
                <span>153 XP to go</span>
              </div>
              <Progress value={72} className="h-3 overflow-hidden rounded-full bg-white/10" />
              <p className="text-sm text-emerald-300">Complete 3 more forms to unlock “Super Contributor”.</p>
            </div>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 p-8 text-white shadow-2xl shadow-primary/20">
            <div className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-accent" />
              <p className="text-sm uppercase tracking-[0.4em] text-white/70">Streak reactor</p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold">11-day streak alive</h2>
            <p className="text-white/70">Keep daily responses rolling to double your XP multiplier.</p>
            <div className="mt-8 grid gap-4">
              {[72, 84, 96].map((value, idx) => (
                <div key={idx} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>{`Squad ${idx + 1}`}</span>
                    <span>{value}% sync</span>
                  </div>
                  <Progress value={value} className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" />
                </div>
              ))}
            </div>
            <Button className="mt-8 w-full rounded-full bg-black/40 text-white hover:bg-black/60" onClick={() => navigate("/landing")}>
              Share streak reel
            </Button>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Quest board</p>
              <h2 className="text-3xl font-semibold">Pending feedback runs</h2>
            </div>
            <Badge className="rounded-full border-none bg-white/15 text-white/80">3 new drops</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {quests.map((quest) => (
              <Card key={quest.title} className="group border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-primary/60">
                <div className="flex items-center justify-between">
                  <Badge className="border-white/30 bg-white/10 text-xs text-white/80">{quest.tag}</Badge>
                  <Badge className="border-none bg-white/15 text-white/80">{quest.reward}</Badge>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{quest.title}</h3>
                <p className="mt-1 text-sm text-white/70">{quest.detail}</p>
                <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                  <TrendingUp className="h-4 w-4" />
                  {quest.minutes}
                </div>
                <Button className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-accent font-semibold shadow-lg shadow-primary/40">
                  Launch quest
                </Button>
                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${quest.accent}`} />
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-primary/20">
            <div className="flex items-center gap-3">
              <Rocket className="h-6 w-6 text-secondary" />
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Hype moments</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { title: "AI Workshop", detail: "320 peers vibed", stat: "+92% positive" },
                { title: "Cultural Night", detail: "Top 3 highlight", stat: "+178 clips" },
                { title: "Lab Sprint", detail: "Mentor shoutouts", stat: "×3 boosts" },
                { title: "Wellness Poll", detail: "Fastest fill", stat: "1m 12s avg" },
              ].map((moment) => (
                <div key={moment.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-white/60">{moment.detail}</p>
                  <h3 className="mt-1 text-xl font-semibold">{moment.title}</h3>
                  <p className="text-xs text-emerald-300">{moment.stat}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-xl shadow-black/30">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Badge stack</p>
            </div>
            <div className="mt-6 space-y-3">
              {badgeStack.map((badge) => (
                <div key={badge.title} className="floating-card flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div>
                    <p className="text-lg font-semibold">{badge.title}</p>
                    <p className="text-xs text-white/60">{badge.info}</p>
                  </div>
                  <Award className="h-6 w-6 text-secondary" />
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
