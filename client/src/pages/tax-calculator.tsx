import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, CheckCircle2, AlertCircle, Info, Landmark, PiggyBank, RefreshCw } from "lucide-react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function TaxCalculator() {
  // Input states
  const [salary, setSalary] = useState<number>(800000);
  const [otherIncome, setOtherIncome] = useState<number>(50000);
  const [deduction80C, setDeduction80C] = useState<number>(150000);
  const [deduction80D, setDeduction80D] = useState<number>(25000);
  const [hraExemption, setHraExemption] = useState<number>(50000);

  // Reset helper
  const handleReset = () => {
    setSalary(800000);
    setOtherIncome(50000);
    setDeduction80C(150000);
    setDeduction80D(25000);
    setHraExemption(50000);
  };

  // Tax calculations
  const taxResults = useMemo(() => {
    const grossIncome = salary + otherIncome;

    // --- NEW REGIME CALCULATIONS (FY 2024-25 / AY 2025-26) ---
    // Standard deduction of 75,000 for New Regime
    const stdDeductionNew = salary > 0 ? Math.min(salary, 75000) : 0;
    const taxableIncomeNew = Math.max(0, grossIncome - stdDeductionNew);

    let baseTaxNew = 0;
    if (taxableIncomeNew > 1500000) {
      baseTaxNew += (taxableIncomeNew - 1500000) * 0.30;
      baseTaxNew += (1500000 - 1200000) * 0.20;
      baseTaxNew += (1200000 - 1000000) * 0.15;
      baseTaxNew += (1000000 - 700000) * 0.10;
      baseTaxNew += (700000 - 300000) * 0.05;
    } else if (taxableIncomeNew > 1200000) {
      baseTaxNew += (taxableIncomeNew - 1200000) * 0.20;
      baseTaxNew += (1200000 - 1000000) * 0.15;
      baseTaxNew += (1000000 - 700000) * 0.10;
      baseTaxNew += (700000 - 300000) * 0.05;
    } else if (taxableIncomeNew > 1000000) {
      baseTaxNew += (taxableIncomeNew - 1000000) * 0.15;
      baseTaxNew += (1000000 - 700000) * 0.10;
      baseTaxNew += (700000 - 300000) * 0.05;
    } else if (taxableIncomeNew > 700000) {
      baseTaxNew += (taxableIncomeNew - 700000) * 0.10;
      baseTaxNew += (700000 - 300000) * 0.05;
    } else if (taxableIncomeNew > 300000) {
      baseTaxNew += (taxableIncomeNew - 300000) * 0.05;
    }

    // Section 87A rebate for New Regime: full tax rebate if taxable income is <= 7,00,000
    if (taxableIncomeNew <= 700000) {
      baseTaxNew = 0;
    }

    const cessNew = baseTaxNew * 0.04;
    const totalTaxNew = baseTaxNew + cessNew;

    // --- OLD REGIME CALCULATIONS ---
    // Standard deduction of 50,000 for Old Regime
    const stdDeductionOld = salary > 0 ? Math.min(salary, 50000) : 0;
    // Deductions allowed: 80C (max 1.5L), 80D (max 50k), HRA
    const allowed80C = Math.min(deduction80C, 150000);
    const allowed80D = Math.min(deduction80D, 50000);
    const totalDeductionsOld = stdDeductionOld + allowed80C + allowed80D + hraExemption;
    const taxableIncomeOld = Math.max(0, grossIncome - totalDeductionsOld);

    let baseTaxOld = 0;
    if (taxableIncomeOld > 1000000) {
      baseTaxOld += (taxableIncomeOld - 1000000) * 0.30;
      baseTaxOld += (1000000 - 500000) * 0.20;
      baseTaxOld += (500000 - 250000) * 0.05;
    } else if (taxableIncomeOld > 500000) {
      baseTaxOld += (taxableIncomeOld - 500000) * 0.20;
      baseTaxOld += (500000 - 250000) * 0.05;
    } else if (taxableIncomeOld > 250000) {
      baseTaxOld += (taxableIncomeOld - 250000) * 0.05;
    }

    // Section 87A rebate for Old Regime: full tax rebate if taxable income <= 5,00,000 (tax up to 12.5k waived)
    if (taxableIncomeOld <= 500000) {
      baseTaxOld = 0;
    }

    const cessOld = baseTaxOld * 0.04;
    const totalTaxOld = baseTaxOld + cessOld;

    const recommended = totalTaxNew <= totalTaxOld ? "New Regime" : "Old Regime";
    const savings = Math.abs(totalTaxOld - totalTaxNew);

    return {
      grossIncome,
      taxableIncomeNew,
      totalTaxNew,
      taxableIncomeOld,
      totalTaxOld,
      recommended,
      savings,
      stdDeductionNew,
      stdDeductionOld,
      totalDeductionsOld,
    };
  }, [salary, otherIncome, deduction80C, deduction80D, hraExemption]);

  // Chart configuration
  const chartData = [
    { name: "Old Regime", Tax: Math.round(taxResults.totalTaxOld), fill: "var(--destructive)" },
    { name: "New Regime", Tax: Math.round(taxResults.totalTaxNew), fill: "var(--primary)" }
  ];

  const pieDataNew = [
    { name: "Net Take-Home", value: Math.max(0, taxResults.grossIncome - taxResults.totalTaxNew), fill: "var(--chart-2)" },
    { name: "Tax Payable", value: Math.round(taxResults.totalTaxNew), fill: "var(--primary)" },
    { name: "Deductions & Exemptions", value: Math.round(taxResults.stdDeductionNew), fill: "var(--muted-foreground)" }
  ];

  const pieDataOld = [
    { name: "Net Take-Home", value: Math.max(0, taxResults.grossIncome - taxResults.totalTaxOld), fill: "var(--chart-2)" },
    { name: "Tax Payable", value: Math.round(taxResults.totalTaxOld), fill: "var(--destructive)" },
    { name: "Deductions & Exemptions", value: Math.round(taxResults.totalDeductionsOld), fill: "var(--muted-foreground)" }
  ];

  const chartConfig = {
    Tax: {
      label: "Tax Liability (₹)",
      color: "var(--primary)"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-slate-50/50 to-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            <Calculator className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Financial Tools</span>
          </div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl" data-testid="tax-calc-title">
            Interactive Tax & ITR Planner
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare your estimated income tax liability side-by-side between the Old and New tax regimes for FY 2024-25 & FY 2025-26.
          </p>
        </div>

        {/* Comparison Alert Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8 items-start mb-12">
          
          {/* Main Form Fields */}
          <Card className="lg:col-span-1 shadow-md border-slate-100 backdrop-blur-sm bg-white/80">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
              <div>
                <CardTitle className="text-lg">Income & Deductions</CardTitle>
                <CardDescription>Enter details to estimate your tax</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs text-muted-foreground hover:text-primary gap-1">
                <RefreshCw className="h-3 w-3" />
                Reset
              </Button>
            </CardHeader>
            <CardContent className="space-y-5 pt-2">
              {/* Income Fields */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                  <Landmark className="h-4 w-4" /> Income Details
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Gross Salary (₹)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <Input
                      id="salary"
                      type="number"
                      value={salary || ""}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="pl-7 font-semibold"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherIncome">Other Income (Rent, Interest, etc.) (₹)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <Input
                      id="otherIncome"
                      type="number"
                      value={otherIncome || ""}
                      onChange={(e) => setOtherIncome(Number(e.target.value))}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Deductions (Old Regime only) */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-orange-600 flex items-center gap-2">
                    <PiggyBank className="h-4 w-4" /> Deductions (Old Regime)
                  </h3>
                  <Badge variant="outline" className="text-[10px] border-orange-200 text-orange-700 bg-orange-50">
                    Not applicable in New Regime
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deduction80C" className="flex items-center gap-1">
                    Section 80C Deductions (PPF, ELSS, etc.) 
                    <Badge className="text-[9px] h-4" variant="secondary">Max 1.5L</Badge>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <Input
                      id="deduction80C"
                      type="number"
                      value={deduction80C || ""}
                      onChange={(e) => setDeduction80C(Number(e.target.value))}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deduction80D" className="flex items-center gap-1">
                    Section 80D (Health Insurance)
                    <Badge className="text-[9px] h-4" variant="secondary">Max 50K</Badge>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <Input
                      id="deduction80D"
                      type="number"
                      value={deduction80D || ""}
                      onChange={(e) => setDeduction80D(Number(e.target.value))}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hraExemption">HRA / Rent Allowance & Other Exemptions (₹)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <Input
                      id="hraExemption"
                      type="number"
                      value={hraExemption || ""}
                      onChange={(e) => setHraExemption(Number(e.target.value))}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Analytics Slabs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Verdict Card */}
            <Card className="overflow-hidden border-2 border-primary/20 shadow-lg relative bg-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-12 -translate-y-12"></div>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/20 font-bold border-none px-3 py-1 rounded-full text-xs">
                      AI Recommendation
                    </Badge>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Recommended Regime: <span className="text-primary text-3xl font-extrabold block sm:inline">{taxResults.recommended}</span>
                    </h2>
                    {taxResults.savings > 0 ? (
                      <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        You will save <strong className="text-green-600 font-bold text-base">₹{taxResults.savings.toLocaleString("en-IN")}</strong> by choosing the {taxResults.recommended}!
                      </p>
                    ) : (
                      <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        Both regimes result in the same tax liability of ₹0.
                      </p>
                    )}
                  </div>
                  <div className="w-full sm:w-auto shrink-0">
                    <Button 
                      className="w-full bg-primary text-white hover:bg-primary/95 flex items-center justify-center gap-2 h-11 px-6 rounded-lg font-semibold shadow-md"
                      onClick={() => window.location.href = `/service/itr-filing`}
                    >
                      File with Expert Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recharts Graphical comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Bar Chart comparing Taxes */}
              <Card className="shadow-md border-slate-100 bg-white">
                <CardHeader>
                  <CardTitle className="text-base">Tax Liability Comparison</CardTitle>
                  <CardDescription>Lower is better (Includes 4% Education Cess)</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis 
                        stroke="#888888" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `₹${value / 1000}k`}
                      />
                      <RechartsTooltip 
                        formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Total Tax"]}
                        contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                      />
                      <Bar dataKey="Tax" radius={[6, 6, 0, 0]} maxBarSize={60}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Tax Details Comparison Slabs */}
              <Card className="shadow-md border-slate-100 bg-white flex flex-col justify-between">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Calculated Tax Breakdown</CardTitle>
                  <CardDescription>Comparison summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm flex-1 flex flex-col justify-center">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Gross Income:</span>
                      <span className="font-semibold text-slate-800">₹{taxResults.grossIncome.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-b">
                      <div>
                        <span className="text-xs text-muted-foreground block">Old Regime</span>
                        <div className="font-semibold text-slate-800 mt-0.5">₹{taxResults.totalTaxOld.toLocaleString("en-IN")}</div>
                        <span className="text-[10px] text-muted-foreground block">Taxable: ₹{taxResults.taxableIncomeOld.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="border-l pl-4">
                        <span className="text-xs text-muted-foreground block">New Regime</span>
                        <div className="font-semibold text-primary mt-0.5">₹{taxResults.totalTaxNew.toLocaleString("en-IN")}</div>
                        <span className="text-[10px] text-muted-foreground block">Taxable: ₹{taxResults.taxableIncomeNew.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 mt-2 flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 leading-relaxed">
                        The new regime standard deduction is ₹75,000 with a tax rebate up to ₹7,00,000 taxable income. Deductions such as 80C and 80D are exclusive to the old regime.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Regime Income Allocation Pie Charts */}
            <Card className="shadow-md border-slate-100 bg-white">
              <CardHeader>
                <CardTitle className="text-base">Gross Income Allocation Breakdown</CardTitle>
                <CardDescription>Visualizing where your income goes under both regimes</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Tabs defaultValue="new" className="w-full">
                  <div className="flex justify-center mb-6">
                    <TabsList className="bg-slate-100/80 p-0.5 border">
                      <TabsTrigger value="old" className="px-4 py-1.5 text-xs font-semibold rounded-md">Old Regime Allocation</TabsTrigger>
                      <TabsTrigger value="new" className="px-4 py-1.5 text-xs font-semibold rounded-md">New Regime Allocation</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="new">
                    <div className="grid md:grid-cols-2 gap-4 items-center">
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieDataNew}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {pieDataNew.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <RechartsTooltip 
                              formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">New Regime Allocation details</h4>
                        {pieDataNew.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs border-b pb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                              <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="font-semibold">₹{item.value.toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="old">
                    <div className="grid md:grid-cols-2 gap-4 items-center">
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieDataOld}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {pieDataOld.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <RechartsTooltip 
                              formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Old Regime Allocation details</h4>
                        {pieDataOld.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs border-b pb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                              <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="font-semibold">₹{item.value.toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

          </div>

        </div>

        {/* FAQs */}
        <div className="mt-16 bg-muted/40 rounded-2xl border p-8 max-w-4xl mx-auto shadow-sm">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Tax Regime Planning FAQs</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-800">1. What is the standard deduction for FY 2024-25?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The Union Budget has increased the standard deduction for salaried employees under the new tax regime to ₹75,000 (previously ₹50,000). For the old regime, it remains ₹50,000.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-semibold text-slate-800">2. How does the Section 87A rebate work?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Under the new tax regime, if your taxable income does not exceed ₹7,00,000, you are eligible for a tax rebate under section 87A, making your tax liability zero. Under the old regime, the rebate limit is ₹5,00,000.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-semibold text-slate-800">3. Which regime is better if I have high deductions?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If your total deductions (under 80C, 80D, HRA, etc.) exceed ₹3,75,000, the old tax regime often proves more beneficial. However, for lower deduction portfolios, the new tax regime offers lower slab rates and is usually recommended. Use the input fields above to compare your exact numbers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
