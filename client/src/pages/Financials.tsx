import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import cohortDataRaw from "@/lib/cohort_data.json";

interface Cohort {
  month: string;
  size: number;
  retention: number[];
}

const cohortData = cohortDataRaw as Record<string, Cohort[]>;

export default function Financials() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <a className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </a>
          </Link>
          <h1 className="font-bold text-xl tracking-tight">Detailed Financials</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Cohort Analysis</h2>
          <p className="text-slate-600">
            Deep dive into customer retention for our key growth drivers. 
            Data shows strong underlying retention despite 2025 transitions.
          </p>
        </div>

        <Tabs defaultValue="credit" className="space-y-6">
          <TabsList>
            <TabsTrigger value="credit">Credit Rail</TabsTrigger>
            <TabsTrigger value="wallet">Wallet Share</TabsTrigger>
          </TabsList>

          <TabsContent value="credit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Rail Retention (2024 Cohorts)</CardTitle>
                <CardDescription>
                  Retention stability prior to the April 2025 platform transition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 font-medium">Cohort</th>
                        <th className="px-4 py-3 font-medium">Size</th>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <th key={i} className="px-4 py-3 font-medium">M{i}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cohortData["Credit Rail"].map((cohort, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-medium text-slate-900">{cohort.month}</td>
                          <td className="px-4 py-3 text-slate-600">{cohort.size}</td>
                          {cohort.retention.map((val, j) => (
                            <td key={j} className="px-4 py-3">
                              <div 
                                className="px-2 py-1 rounded text-center w-12"
                                style={{
                                  backgroundColor: `rgba(37, 99, 235, ${val / 100 * 0.5})`,
                                  color: val > 50 ? 'white' : 'inherit'
                                }}
                              >
                                {val}%
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Retention (2024 Cohorts)</CardTitle>
                <CardDescription>
                  High retention demonstrates product stickiness even before new interest-bearing features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 font-medium">Cohort</th>
                        <th className="px-4 py-3 font-medium">Size</th>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <th key={i} className="px-4 py-3 font-medium">M{i}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cohortData["Wallet Share"].map((cohort, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-medium text-slate-900">{cohort.month}</td>
                          <td className="px-4 py-3 text-slate-600">{cohort.size}</td>
                          {cohort.retention.map((val, j) => (
                            <td key={j} className="px-4 py-3">
                              <div 
                                className="px-2 py-1 rounded text-center w-12"
                                style={{
                                  backgroundColor: `rgba(37, 99, 235, ${val / 100 * 0.5})`,
                                  color: val > 50 ? 'white' : 'inherit'
                                }}
                              >
                                {val}%
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6 flex items-start gap-4">
            <TrendingUp className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-1">Analyst Note</h3>
              <p className="text-blue-800 leading-relaxed">
                Wallet retention is notably strong (consistently &gt;60% at M6) even without the high-yield incentives launching in Dec '25. 
                This suggests the core utility is sticky, and the new 80% fed funds rate revenue share will likely drive these numbers even higher while monetizing dormant users.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
