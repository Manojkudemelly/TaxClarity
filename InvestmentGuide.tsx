import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Shield, Clock, DollarSign, Filter, Search } from 'lucide-react';
import { investmentOptions } from '@/data/taxKnowledge';

const InvestmentGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  const filteredInvestments = investmentOptions.filter(option => {
    const matchesSearch = option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         option.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || option.category === filterCategory;
    const matchesRisk = filterRisk === 'all' || option.riskLevel === filterRisk;
    
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low': return 'bg-success text-success-foreground';
      case 'Low': return 'bg-success/80 text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Medium to High': return 'bg-warning/80 text-warning-foreground';
      case 'High': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const categories = [...new Set(investmentOptions.map(option => option.category))];
  const riskLevels = [...new Set(investmentOptions.map(option => option.riskLevel))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-accent rounded-xl shadow-elegant">
              <TrendingUp className="h-8 w-8 text-accent-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Investment Guide
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive guide to tax-saving investments and wealth creation opportunities in India
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-accent" />
              Filter Investments
            </CardTitle>
            <CardDescription>
              Find the perfect investment options based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search investments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk">Risk Level</Label>
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Risk Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    {riskLevels.map(risk => (
                      <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="all">All Options</TabsTrigger>
            <TabsTrigger value="tax-saving">Tax Saving</TabsTrigger>
            <TabsTrigger value="retirement">Retirement</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {filteredInvestments.map((investment, index) => (
                <Card key={index} className="border-2 border-border/50 shadow-elegant hover:shadow-lg transition-smooth">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{investment.name}</CardTitle>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline">{investment.category}</Badge>
                          <Badge className={getRiskColor(investment.riskLevel)}>
                            {investment.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col lg:items-end gap-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-success" />
                          <span className="font-semibold text-success">{investment.returns}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{investment.lockInPeriod}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {investment.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-primary flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Tax Benefits
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                          {investment.taxBenefit}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-primary">Suitable For</h4>
                        <div className="flex flex-wrap gap-1">
                          {investment.suitableFor.map((suitable, suitableIndex) => (
                            <Badge key={suitableIndex} variant="secondary" className="text-xs">
                              {suitable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tax-saving" className="space-y-6">
            <div className="grid gap-6">
              {filteredInvestments
                .filter(inv => inv.taxBenefit.includes('80C') || inv.taxBenefit.includes('80CCD'))
                .map((investment, index) => (
                  <Card key={index} className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-elegant">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            {investment.name}
                          </CardTitle>
                          <Badge className={getRiskColor(investment.riskLevel)}>
                            {investment.riskLevel} Risk
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-success">{investment.returns}</div>
                          <div className="text-sm text-muted-foreground">{investment.lockInPeriod}</div>
                        </div>
                      </div>
                      <CardDescription>{investment.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                          <div className="font-medium text-success mb-1">Tax Benefits:</div>
                          <div className="text-sm">{investment.taxBenefit}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="retirement" className="space-y-6">
            <div className="grid gap-6">
              {filteredInvestments
                .filter(inv => inv.suitableFor.some(s => s.toLowerCase().includes('retirement')))
                .map((investment, index) => (
                  <Card key={index} className="border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5 shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-accent" />
                        {investment.name}
                      </CardTitle>
                      <CardDescription>{investment.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Returns:</span> {investment.returns}
                        </div>
                        <div>
                          <span className="font-medium">Lock-in:</span> {investment.lockInPeriod}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Tax Benefits:</span> {investment.taxBenefit}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <div className="grid gap-6">
              {filteredInvestments
                .filter(inv => inv.riskLevel.includes('High') || inv.returns.includes('12'))
                .map((investment, index) => (
                  <Card key={index} className="border-2 border-warning/20 bg-gradient-to-br from-card to-warning/5 shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-warning" />
                        {investment.name}
                      </CardTitle>
                      <CardDescription>{investment.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Expected Returns:</span>
                          <span className="text-lg font-bold text-success">{investment.returns}</span>
                        </div>
                        <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                          <div className="font-medium text-warning mb-1">Growth Potential:</div>
                          <div className="text-sm">High growth potential with market-linked returns suitable for long-term wealth creation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Investment Planning Tips */}
        <Card className="bg-gradient-accent shadow-elegant">
          <CardHeader>
            <CardTitle className="text-accent-foreground">💡 Investment Planning Tips</CardTitle>
          </CardHeader>
          <CardContent className="text-accent-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Diversification</h4>
                <p>Spread investments across different asset classes to reduce risk and optimize returns.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Start Early</h4>
                <p>The power of compounding works best when you start investing early in your career.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Goal-Based Investing</h4>
                <p>Align your investments with specific financial goals and time horizons.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentGuide;