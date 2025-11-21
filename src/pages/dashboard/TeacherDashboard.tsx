import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookMarked,
  CheckCircle2,
  Frown,
  LineChart,
  Meh,
  MessageSquare,
  Plus,
  Shield,
  Smile,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, verifyAuth, logoutUser } from "@/lib/auth";
import { dashboardApi } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const mentorStats = [
  { label: "Active Forms", value: "08", detail: "3 new today", icon: MessageSquare },
  { label: "Responses", value: "342", detail: "+58 vs last week", icon: Users },
  { label: "Avg. Rating", value: "4.6", detail: "Momentum ↑", icon: LineChart },
  { label: "Completion", value: "87%", detail: "Goal 90%", icon: BarChart3 },
];

const formDeck = [
  {
    title: "Data Structures Mid-Sem",
    tag: "Course Feedback",
    status: "Live",
    response: "76% (95/125)",
    delta: "+12% week",
    accent: "from-primary/50 to-emerald-400/40",
  },
  {
    title: "Python Lab Sprint",
    tag: "Lab Session",
    status: "Live",
    response: "92% (55/60)",
    delta: "+6% week",
    accent: "from-accent/50 to-pink-400/40",
  },
  {
    title: "Capstone Coaching",
    tag: "Mentor Hours",
    status: "Draft",
    response: "Pre-launch",
    delta: "Need 3 reviewers",
    accent: "from-secondary/50 to-amber-400/40",
  },
];

const sentimentSlices = [
  { label: "Positive", value: 68, color: "text-emerald-300", icon: Smile, detail: "234 responses" },
  { label: "Neutral", value: 23, color: "text-amber-300", icon: Meh, detail: "79 responses" },
  { label: "Negative", value: 9, color: "text-rose-300", icon: Frown, detail: "29 responses" },
];

const playbooks = [
  { title: "Add real-world cases", detail: "Inject 3 demos next lecture", badge: "+18% clarity" },
  { title: "Micro mentoring", detail: "15-min AMA pods weekly", badge: "+12 NPS" },
  { title: "Lab remix", detail: "Peer-led debugging squads", badge: "+23% retention" },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const verifiedUser = await verifyAuth();
        if (verifiedUser) {
          setUser(verifiedUser);
          await dashboardApi.getTeacherDashboard();
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
      <div className="glowing-orb absolute -top-16 left-0" />
      <div className="glowing-orb absolute bottom-0 right-0 delay-[1400ms]" />

      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">FeedbackFlow</p>
              <p className="text-lg font-semibold">Mentor Command</p>
            </div>
          </div>
          <Button variant="outline" className="border-white/30 text-white" onClick={handleLogout}>
            Exit studio
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-10 px-6 py-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-accent/20">
            <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">Welcome back, {user?.name || "Teacher"}</p>
                  <h1 className="text-4xl font-semibold">Classrooms synced. Insights armed.</h1>
                </div>
                <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mentorStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>{stat.label}</span>
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
                    <p className="text-xs text-white/60">{stat.detail}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="rounded-full bg-gradient-to-r from-primary to-accent px-6 font-semibold shadow-lg shadow-primary/30" onClick={() => navigate("/landing")}>
                Launch hyper-form
              </Button>
              <Button variant="outline" className="rounded-full border-white/30 text-white" onClick={() => navigate("/")}>
                Export deck
              </Button>
            </div>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 p-8 text-white shadow-2xl shadow-primary/20">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-emerald-300" />
              <p className="text-sm uppercase tracking-[0.4em] text-white/70">Signal shield</p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold">Live sentiment radar</h2>
            <div className="mt-6 space-y-4">
              {sentimentSlices.map((slice) => {
                const Icon = slice.icon;
                return (
                  <div key={slice.label} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${slice.color}`} />
                        <p className="text-sm text-white/70">{slice.label}</p>
                      </div>
                      <p className={`text-xl font-semibold ${slice.color}`}>{slice.value}%</p>
                    </div>
                    <p className="text-xs text-white/60">{slice.detail}</p>
                    <Progress value={slice.value} className="mt-3 h-2 overflow-hidden rounded-full bg-white/10" />
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-white/60">Form vault</p>
              <h2 className="text-3xl font-semibold">Active & upcoming runs</h2>
            </div>
            <Button className="gap-2 rounded-full bg-white/10 px-6 text-white hover:bg-white/20" onClick={() => navigate("/landing")}>
              <Plus className="h-4 w-4" />
              Deploy new flow
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {formDeck.map((form) => (
              <Card key={form.title} className="group border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-primary/60">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <Badge className="border-white/30 bg-white/10 text-xs text-white/80">{form.tag}</Badge>
                  <Badge className="border-none bg-white/15 text-white/80">{form.status}</Badge>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{form.title}</h3>
                <p className="mt-1 text-sm text-white/70">{form.response}</p>
                <p className="text-xs text-emerald-300">{form.delta}</p>
                <Button className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-accent font-semibold shadow-lg shadow-primary/40">
                  View analytics
                </Button>
                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${form.accent}`} />
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="border-white/10 bg-white/5 p-8 text-white shadow-2xl shadow-accent/20">
            <div className="flex items-center gap-3">
              <BookMarked className="h-6 w-6 text-secondary" />
              <p className="text-sm uppercase tracking-[0.4em] text-white/70">AI classroom reel</p>
            </div>
            <div className="mt-6 space-y-4">
              {playbooks.map((play) => (
                <div key={play.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{play.title}</h3>
                    <Badge className="border-none bg-white/15 text-xs text-white/80">{play.badge}</Badge>
                  </div>
                  <p className="text-sm text-white/70">{play.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-8 text-white shadow-xl shadow-primary/20">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <p className="text-sm uppercase tracking-[0.4em] text-white/70">Impact tracker</p>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: "Lecture clarity", value: 78, note: "+18% vs last term" },
                { label: "Lab engagement", value: 92, note: "record high" },
                { label: "Mentor satisfaction", value: 85, note: "streak x5" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/15 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" />
                  <p className="text-xs text-emerald-300">{item.note}</p>
                </div>
              ))}
            </div>
            <Button className="mt-8 w-full rounded-full bg-black/40 text-white hover:bg-black/60" onClick={() => navigate("/landing")}>
              Share weekly report
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
