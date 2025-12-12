import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BarChart3, Building2, CheckCircle2, CreditCard, Globe, TrendingUp, Wallet, Users } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Link } from "wouter";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import financialData from "@/lib/financial_data.json";
import highlights from "@/lib/highlights.json";
import teamData from "@/lib/team_data.json";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const growthPillars = [
  {
    title: "Self-Service Wallet",
    icon: <Wallet className="h-6 w-6 text-[#20319D]" />,
    description: "80% fed funds rate revenue on deposits. New UX/UI & pricing launching Dec '25.",
    metric: "High Margin"
  },
  {
    title: "Enterprise & PaaS",
    icon: <Building2 className="h-6 w-6 text-[#20319D]" />,
    description: "Powering fintechs & enterprises. Deluxe pilot ($1B/mo volume) & hospital lockbox.",
    metric: "$1B+ Opportunity"
  },
  {
    title: "Credit & International",
    icon: <Globe className="h-6 w-6 text-[#20319D]" />,
    description: "Unlimited credit rail capacity. Ripple partnership opening 20 international corridors.",
    metric: "Global Scale"
  }
];

export default function Home() {
  // Sensitivity Analysis State
  const [isBullCase, setIsBullCase] = useState(false);

  // Calculate CAGR for projection period (Nov '25 to Feb '26 = 3 months = 0.25 years)
  // Ensure strict separation: Actuals up to Nov '25, Projections start Dec '25
  const actuals = financialData.monthly_revenue_with_projection
    .filter(d => !d.month.includes("'26") && d.month !== "Dec '25")
    .map(d => ({ ...d, projected: undefined })); // Explicitly remove projected field from actuals

  const baseProjections = financialData.monthly_revenue_with_projection.filter(d => d.month.includes("'26") || d.month === "Dec '25");

  // Apply sensitivity multiplier if Bull Case is selected (e.g., 1.1x growth)
  const projections = baseProjections.map(d => ({
    ...d,
    revenue: undefined, // Explicitly remove revenue field from projections
    projected: isBullCase ? (d.projected || 0) * 1.15 : (d.projected || 0)
  }));

  // Connect the lines visually by starting the projection series at the last actual data point
  // This ensures the blue line (Actual) meets the dashed line (Projected) without a gap
  if (actuals.length > 0) {
    const lastIndex = actuals.length - 1;
    // Force cast to any to bypass strict type checking for this visualization hack
    (actuals[lastIndex] as any).projected = actuals[lastIndex].revenue;
  }

  const lastActual = actuals[actuals.length - 1];
  const lastProjected = projections[projections.length - 1];

  const startRev = lastActual?.revenue || lastActual?.projected || 540266;
  const endRev = lastProjected?.projected || 705048;
  const years = projections.length / 12;
  const cagr = (Math.pow(endRev / startRev, 1 / years) - 1) * 100;

  // Merge actuals and dynamic projections for the chart
  const chartData = [...actuals, ...projections];

  // Process data for charts
  // Filter to start from March '25
  const revenueTrendData = chartData.filter(d => {
    const monthIndex = ["Dec '24", "Jan '25", "Feb '25"].indexOf(d.month);
    return monthIndex === -1;
  });

  const productRevenueData = financialData.revenue_by_product;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <svg width="0" height="0">
        <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#20319d" />
          <stop offset="100%" stopColor="#3bf493" />
        </linearGradient>
      </svg>
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/images/logo_color.png" alt="Zil Money" className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#overview" className="hover:text-primary transition-colors">Overview</a>
            <a href="#financials" className="hover:text-primary transition-colors">Financials</a>
            <a href="#strategy" className="hover:text-primary transition-colors">Strategy</a>
            <a href="#ask" className="hover:text-primary transition-colors">The Ask</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => window.open("https://calendly.com/zmvc/ir", "_blank")}>
            Set up Meeting
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Executive Summary */}
        <section id="overview" className="space-y-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              The Financial Operating System for Modern SMBs
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We are transitioning from a transactional model to a sticky, high-margin wallet ecosystem. 
              Profitable, compliant, and ready for exponential growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue (2022-25)</CardDescription>
                <CardTitle className="text-2xl font-bold">$14.9M</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" /> Verified Historical
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardDescription>Total Customers</CardDescription>
                <CardTitle className="text-2xl font-bold">26,934</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-blue-500" /> Across 8 Products
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-400 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardDescription>Growth Target</CardDescription>
                <CardTitle className="text-2xl font-bold">$10M</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-slate-500">Minimum Raise</div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-300 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardDescription>6-Month Growth</CardDescription>
                <CardTitle className="text-2xl font-bold text-secondary-brand">+{highlights.six_month_growth}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-blue-400" /> Jun '25 - Nov '25
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Financial Performance */}
        <section id="financials" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Financial Performance</h2>
              <p className="text-slate-600 mt-2">Transparent view of our transition and recovery.</p>
            </div>
            <Tabs defaultValue="revenue" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="revenue">Revenue Trend</TabsTrigger>
                <TabsTrigger value="breakdown">Product Mix</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Monthly Revenue Recovery</CardTitle>
                    <CardDescription>
                      Recovering from planned credit rail transition (Apr-Jun '25). 
                      Now back to unlimited capacity.
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-4 text-right">
                      <div>
                        <div className="text-xs text-slate-500 uppercase font-semibold">Credit NRR</div>
                        <div className="text-lg font-bold text-primary">{highlights.credit_rail_nrr}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase font-semibold">Embedded NRR</div>
                        <div className="text-lg font-bold text-primary">{highlights.embedded_nrr}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase font-semibold">Wallet NRR</div>
                        <div className="text-lg font-bold text-primary">{highlights.wallet_nrr}%</div>
                      </div>
                      <div className="pl-4 border-l border-slate-200">
                        <div className="text-xs text-slate-500 uppercase font-semibold">Proj. CAGR</div>
                        <div className="text-lg font-bold text-secondary-brand">{cagr.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                      <Switch id="bull-case" checked={isBullCase} onCheckedChange={setIsBullCase} className="scale-75" />
                      <Label htmlFor="bull-case" className="text-xs font-medium cursor-pointer text-slate-600">Bull Case (+15%)</Label>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
<AreaChart data={revenueTrendData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      formatter={(value: number, name: string) => {
                        if (value === undefined || value === null) return [];
                        return [`$${value.toLocaleString()}`, name === 'projected' ? 'Forecasted' : 'Actual'];
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" name="Actual" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="projected" name="Projected" stroke="#93c5fd" strokeWidth={3} strokeDasharray="5 5" fillOpacity={0} />
                    <ReferenceLine x="Nov '25" stroke="#16a34a" strokeDasharray="3 3" label={{ value: 'Unlimited Credit', position: 'insideTopLeft', fill: '#16a34a', fontSize: 12, dy: -10 }} />
                    <ReferenceLine x="Dec '25" stroke="#9333ea" strokeDasharray="3 3" label={{ value: 'Wallet Launch', position: 'insideTopRight', fill: '#9333ea', fontSize: 12, dy: 10 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Revenue by Product</CardTitle>
                <CardDescription>Diversified revenue streams</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productRevenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {productRevenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Strategic Narrative */}
        <section id="strategy" className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Strategic Transition</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#3bf493]">The Shift</h3>
                <p className="text-slate-300 leading-relaxed">
                  We intentionally deprecated legacy subscription plans to transition customers to our high-margin Wallet product. 
                  Transactional fluctuations are now captured by wallet deposits, turning dormant users into revenue generators.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#3bf493]">The Resolution</h3>
                <p className="text-slate-300 leading-relaxed">
                  Credit rail capacity issues (Apr-Nov '25) are fully resolved. We now have unlimited capacity across 
                  2 processors and 2 banks, positioning us to exceed historical highs within 2 months.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6">Three Pillars of Growth</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {growthPillars.map((pillar, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="bg-white p-3 rounded-lg w-fit mb-4 shadow-sm">
                    {pillar.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{pillar.title}</h4>
                  <p className="text-sm text-slate-300 mb-4">{pillar.description}</p>
                  <div className="inline-block bg-[#20319d] text-white text-xs font-semibold px-2 py-1 rounded">
                    {pillar.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Experience */}
        <section id="platform" className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Platform Experience</h2>
          </div>
          <p className="text-slate-600 max-w-3xl">
            A unified financial operating system designed for modern SMBs. From bill payments to payroll, 
            our intuitive interface simplifies complex financial workflows.
          </p>
          
          <Card className="overflow-hidden border-slate-200 shadow-lg">
            <div className="relative w-full aspect-[16/9] bg-slate-100">
              <BeforeAfterSlider 
                beforeImage="/images/legacy_ui_real.png"
                afterImage="/images/platform_preview.png"
                beforeLabel="Legacy Interface"
                afterLabel="New Platform Experience"
              />
            </div>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                <div className="p-6 space-y-3 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-slate-900">Unified Financial Control</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A single pane of glass for all financial operations. Monitor real-time cash flow, track pending approvals, and manage multi-entity accounts without switching platforms.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1 pt-2">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> Real-time cash position</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> Multi-entity management</li>
                  </ul>
                </div>

                <div className="p-6 space-y-3 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-slate-900">Smart Payables Automation</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    End-to-end AP automation. AI extracts invoice data, routes for approval, and executes payments via ACH, Wire, or Check—all synced to your accounting software.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1 pt-2">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> OCR Invoice Capture</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> One-click reconciliation</li>
                  </ul>
                  <div className="pt-4 mt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 mb-2">Seamlessly Integrates With:</p>
                    <div className="flex gap-3 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                      <img src="/images/quickbooks_logo.png" alt="QuickBooks" className="h-6 object-contain" />
                      <img src="/images/xero_logo.png" alt="Xero" className="h-6 object-contain" />
                      <img src="/images/sage_logo.png" alt="Sage" className="h-6 object-contain" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3 hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-slate-900">Payroll & HR Integration</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Seamlessly fund payroll through credit lines or cash reserves. Integrated with major HR platforms to ensure employees are paid on time, every time.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1 pt-2">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> Payroll funding on credit</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500" /> Automated tax compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section id="team" className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Leadership Team</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamData.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow text-center">
                <div className="pt-6 flex justify-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/400x400?text=" + member.name.charAt(0);
                      }}
                    />
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary whitespace-pre-line">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-4 hover:line-clamp-none transition-all">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Compliance & Ask */}
        <section id="ask" className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-blue-100">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Compliance & Bank Partners</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-green-100 rounded-full shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Money Transmitter Licenses (MTLs)</h4>
                  <p className="text-sm text-slate-600">MTL approvals highlight our deep compliance know-how and regulatory strength.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-green-100 rounded-full shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Bank Partnerships</h4>
                  <p className="text-sm text-slate-600">Partnered with Lincoln Savings Bank and Texas National Bank for secure, scalable banking infrastructure.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground border-none">
            <CardHeader>
              <CardTitle className="text-2xl">The Ask</CardTitle>
              <CardDescription className="text-primary-foreground/80">Fueling our next phase of exponential growth.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold mb-1">$10M</div>
                <div className="text-primary-foreground/80 text-sm">Minimum Growth Capital</div>
              </div>
              <p className="text-primary-foreground/90">
                We remain profitable. This capital will scale growth marketing, hire a dedicated enterprise sales team, and capture the $1B+ embedded finance opportunity.
              </p>
              <Button variant="secondary" className="w-full font-bold group" onClick={() => window.open("https://calendly.com/zmvc/ir", "_blank")}>
                Request Meeting <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src="/images/logo_color.png" alt="Zil Money" className="h-6 w-auto brightness-0 invert" />
          </div>
          <p className="text-sm mb-8 max-w-md mx-auto">
            Building the financial operating system for the modern SMB. 
            Profitable, compliant, and scalable.
          </p>
          <div className="text-xs text-slate-600">
            © 2025 Zil Money. Confidential Investor Presentation.
          </div>
        </div>
      </footer>
    </div>
  );
}
