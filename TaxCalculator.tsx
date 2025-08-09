import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { 
  SalaryComponents, 
  Deductions, 
  calculateIncomeTax,
  getTaxSlabDetails
} from '@/utils/taxCalculations';

const TaxCalculator = () => {
  const [salaryComponents, setSalaryComponents] = useState<SalaryComponents>({
    basicSalary: 600000,
    pfContribution: 72000,
    houseRentAllowance: 300000,
    conveyanceAllowance: 19200,
    leaveTravelAllowance: 50000,
    foodCardReimbursement: 26400,
    superannuationFund: 0,
    nationalPensionScheme: 50000,
    carRunningExpenses: 0,
    driverSalary: 0,
    specialAllowance: 100000,
    giftCards: 0,
    otherIncome: 0,
    professionalTax: 2400
  });

  const [deductions, setDeductions] = useState<Deductions>({
    section80C: 150000,
    section80D: 25000,
    section80E: 0,
    section80G: 0,
    section80TTA: 10000,
    standardDeduction: 50000
  });

  const [isNewRegime, setIsNewRegime] = useState(true);
  const [newRegimeResult, setNewRegimeResult] = useState(calculateIncomeTax(salaryComponents, deductions, true));
  const [oldRegimeResult, setOldRegimeResult] = useState(calculateIncomeTax(salaryComponents, deductions, false));

  useEffect(() => {
    setNewRegimeResult(calculateIncomeTax(salaryComponents, deductions, true));
    setOldRegimeResult(calculateIncomeTax(salaryComponents, deductions, false));
  }, [salaryComponents, deductions]);

  const handleSalaryChange = (field: keyof SalaryComponents, value: string) => {
    setSalaryComponents(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleDeductionChange = (field: keyof Deductions, value: string) => {
    setDeductions(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const savings = oldRegimeResult.totalTaxLiability - newRegimeResult.totalTaxLiability;
  const betterRegime = savings > 0 ? 'New Regime' : 'Old Regime';
  const savingsAmount = Math.abs(savings);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-elegant">
              <Calculator className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Income Tax Calculator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your income tax for FY 2024-25 (AY 2025-26) with accurate New vs Old regime comparison
          </p>
          <Badge variant="secondary" className="text-sm">
            Updated for Budget 2024-25
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  Salary Components
                </CardTitle>
                <CardDescription>
                  Enter your annual salary components as per Form 16 or salary slip
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basicSalary">Basic Salary</Label>
                    <Input
                      id="basicSalary"
                      type="number"
                      value={salaryComponents.basicSalary}
                      onChange={(e) => handleSalaryChange('basicSalary', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="houseRentAllowance">House Rent Allowance (HRA)</Label>
                    <Input
                      id="houseRentAllowance"
                      type="number"
                      value={salaryComponents.houseRentAllowance}
                      onChange={(e) => handleSalaryChange('houseRentAllowance', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialAllowance">Special Allowance</Label>
                    <Input
                      id="specialAllowance"
                      type="number"
                      value={salaryComponents.specialAllowance}
                      onChange={(e) => handleSalaryChange('specialAllowance', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conveyanceAllowance">Conveyance Allowance</Label>
                    <Input
                      id="conveyanceAllowance"
                      type="number"
                      value={salaryComponents.conveyanceAllowance}
                      onChange={(e) => handleSalaryChange('conveyanceAllowance', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leaveTravelAllowance">Leave Travel Allowance (LTA)</Label>
                    <Input
                      id="leaveTravelAllowance"
                      type="number"
                      value={salaryComponents.leaveTravelAllowance}
                      onChange={(e) => handleSalaryChange('leaveTravelAllowance', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foodCardReimbursement">Food Card/Meal Vouchers</Label>
                    <Input
                      id="foodCardReimbursement"
                      type="number"
                      value={salaryComponents.foodCardReimbursement}
                      onChange={(e) => handleSalaryChange('foodCardReimbursement', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pfContribution">Provident Fund Contribution</Label>
                    <Input
                      id="pfContribution"
                      type="number"
                      value={salaryComponents.pfContribution}
                      onChange={(e) => handleSalaryChange('pfContribution', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationalPensionScheme">National Pension Scheme (NPS)</Label>
                    <Input
                      id="nationalPensionScheme"
                      type="number"
                      value={salaryComponents.nationalPensionScheme}
                      onChange={(e) => handleSalaryChange('nationalPensionScheme', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carRunningExpenses">Car Running Expenses</Label>
                    <Input
                      id="carRunningExpenses"
                      type="number"
                      value={salaryComponents.carRunningExpenses}
                      onChange={(e) => handleSalaryChange('carRunningExpenses', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverSalary">Driver Salary</Label>
                    <Input
                      id="driverSalary"
                      type="number"
                      value={salaryComponents.driverSalary}
                      onChange={(e) => handleSalaryChange('driverSalary', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="giftCards">Gift Cards/Vouchers</Label>
                    <Input
                      id="giftCards"
                      type="number"
                      value={salaryComponents.giftCards}
                      onChange={(e) => handleSalaryChange('giftCards', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherIncome">Other Income</Label>
                    <Input
                      id="otherIncome"
                      type="number"
                      value={salaryComponents.otherIncome}
                      onChange={(e) => handleSalaryChange('otherIncome', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professionalTax">Professional Tax</Label>
                    <Input
                      id="professionalTax"
                      type="number"
                      value={salaryComponents.professionalTax}
                      onChange={(e) => handleSalaryChange('professionalTax', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deductions Card - Only for Old Regime */}
            <Card className="border-2 border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-success" />
                  Tax Deductions (Old Regime Only)
                </CardTitle>
                <CardDescription>
                  These deductions are available only under the old tax regime
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section80C">Section 80C (Max ₹1.5L)</Label>
                    <Input
                      id="section80C"
                      type="number"
                      value={deductions.section80C}
                      onChange={(e) => handleDeductionChange('section80C', e.target.value)}
                      max={150000}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section80D">Section 80D - Health Insurance</Label>
                    <Input
                      id="section80D"
                      type="number"
                      value={deductions.section80D}
                      onChange={(e) => handleDeductionChange('section80D', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section80E">Section 80E - Education Loan</Label>
                    <Input
                      id="section80E"
                      type="number"
                      value={deductions.section80E}
                      onChange={(e) => handleDeductionChange('section80E', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section80G">Section 80G - Donations</Label>
                    <Input
                      id="section80G"
                      type="number"
                      value={deductions.section80G}
                      onChange={(e) => handleDeductionChange('section80G', e.target.value)}
                      className="transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section80TTA">Section 80TTA - Savings Interest</Label>
                    <Input
                      id="section80TTA"
                      type="number"
                      value={deductions.section80TTA}
                      onChange={(e) => handleDeductionChange('section80TTA', e.target.value)}
                      max={10000}
                      className="transition-smooth"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Regime Comparison */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Best Regime for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">
                    {betterRegime}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Save {formatCurrency(savingsAmount)} annually
                  </div>
                  <Badge 
                    variant={betterRegime === 'New Regime' ? 'default' : 'secondary'}
                    className="text-sm"
                  >
                    {betterRegime === 'New Regime' ? '✓ Recommended' : '✓ Better Choice'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tax Comparison */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Tax Comparison</CardTitle>
                <CardDescription>Side-by-side comparison of both regimes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* New Regime */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-primary">New Regime</h4>
                      <Badge variant="default">Default</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gross Salary:</span>
                        <span className="font-medium">{formatCurrency(newRegimeResult.grossSalary)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Income:</span>
                        <span className="font-medium">{formatCurrency(newRegimeResult.taxableIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income Tax:</span>
                        <span className="font-medium text-destructive">{formatCurrency(newRegimeResult.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cess (4%):</span>
                        <span className="font-medium text-destructive">{formatCurrency(newRegimeResult.cess)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Tax:</span>
                        <span className="text-destructive">{formatCurrency(newRegimeResult.totalTaxLiability)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-success">
                        <span>Net Salary:</span>
                        <span>{formatCurrency(newRegimeResult.netSalary)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Old Regime */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-primary">Old Regime</h4>
                      <Badge variant="secondary">Optional</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gross Salary:</span>
                        <span className="font-medium">{formatCurrency(oldRegimeResult.grossSalary)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Income:</span>
                        <span className="font-medium">{formatCurrency(oldRegimeResult.taxableIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Income Tax:</span>
                        <span className="font-medium text-destructive">{formatCurrency(oldRegimeResult.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cess (4%):</span>
                        <span className="font-medium text-destructive">{formatCurrency(oldRegimeResult.cess)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Tax:</span>
                        <span className="text-destructive">{formatCurrency(oldRegimeResult.totalTaxLiability)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-success">
                        <span>Net Salary:</span>
                        <span>{formatCurrency(oldRegimeResult.netSalary)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Summary */}
            <Card className="bg-gradient-accent shadow-elegant">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-sm text-accent-foreground/80">Annual Tax Savings</div>
                  <div className="text-2xl font-bold text-accent-foreground">
                    {formatCurrency(savingsAmount)}
                  </div>
                  <div className="text-xs text-accent-foreground/70">
                    by choosing {betterRegime}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;