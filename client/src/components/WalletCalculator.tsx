import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign } from "lucide-react";
import { useState } from "react";

export default function WalletCalculator() {
  const [deposits, setDeposits] = useState([10000000]); // $10M default
  const [fedRate, setFedRate] = useState([4.5]); // 4.5% default

  // Calculation: Deposits * Fed Rate * 0.80 (Revenue Share)
  const annualRevenue = deposits[0] * (fedRate[0] / 100) * 0.80;
  const monthlyRevenue = annualRevenue / 12;

  return (
    <Card className="border-blue-200 shadow-md bg-gradient-to-br from-white to-blue-50/50">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calculator className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle>Wallet Revenue Potential</CardTitle>
        </div>
        <CardDescription>
          Estimate revenue from the new 80% Fed Funds Rate share model.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700">Projected Deposits</label>
            <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm">
              ${(deposits[0] / 1000000).toFixed(1)}M
            </span>
          </div>
          <Slider
            value={deposits}
            onValueChange={setDeposits}
            min={1000000}
            max={100000000}
            step={1000000}
            className="py-2"
          />
          <p className="text-xs text-slate-500">
            Based on current user base of ~27k customers
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-700">Fed Funds Rate</label>
            <span className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full text-sm">
              {fedRate[0]}%
            </span>
          </div>
          <Slider
            value={fedRate}
            onValueChange={setFedRate}
            min={0}
            max={10}
            step={0.25}
            className="py-2"
          />
        </div>

        <div className="pt-6 border-t border-blue-100 grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Monthly Revenue</div>
            <div className="text-2xl font-bold text-slate-900 flex items-center">
              <DollarSign className="h-5 w-5 text-slate-400" />
              {Math.round(monthlyRevenue).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Annual Revenue</div>
            <div className="text-2xl font-bold text-green-600 flex items-center">
              <DollarSign className="h-5 w-5 text-green-500" />
              {Math.round(annualRevenue).toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 italic bg-white/50 p-3 rounded border border-blue-100">
          *Calculated as: Deposits × {fedRate[0]}% × 80% share. 
          This is pure margin revenue with zero cost of goods sold.
        </div>
      </CardContent>
    </Card>
  );
}
