import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, BookOpen, TrendingUp, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      label: 'Tax Calculator',
      icon: Calculator,
      description: 'Calculate your income tax'
    },
    {
      to: '/knowledge',
      label: 'Tax Knowledge',
      icon: BookOpen,
      description: 'Learn about tax sections'
    },
    {
      to: '/investments',
      label: 'Investment Guide',
      icon: TrendingUp,
      description: 'Explore investment options'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavContent = () => (
    <div className="flex flex-col space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.to);
        
        return (
          <Link key={item.to} to={item.to}>
            <Button
              variant={active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-auto py-3 px-4 transition-smooth ${
                active 
                  ? 'bg-gradient-primary shadow-elegant' 
                  : 'hover:bg-accent/50'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
              <div className="text-left">
                <div className={`font-medium ${active ? 'text-primary-foreground' : ''}`}>
                  {item.label}
                </div>
                <div className={`text-xs ${
                  active ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {item.description}
                </div>
              </div>
            </Button>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed left-0 top-0 h-full w-80 bg-card border-r border-border/50 shadow-elegant z-40">
        <div className="p-6 space-y-6">
          {/* Logo */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-elegant">
                <Calculator className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  TaxCalc Pro
                </h1>
                <p className="text-xs text-muted-foreground">FY 2024-25</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Updated for Budget 2024-25
            </Badge>
          </div>

          {/* Navigation Items */}
          <NavContent />

          {/* Footer */}
          <div className="pt-6 border-t border-border/50">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>© 2024 TaxCalc Pro</p>
              <p>Data sourced from Income Tax Department</p>
              <p className="text-warning">For educational purposes only</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-elegant z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-elegant">
              <Calculator className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                TaxCalc Pro
              </h1>
              <p className="text-xs text-muted-foreground">FY 2024-25</p>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-primary rounded-lg shadow-elegant">
                      <Calculator className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        TaxCalc Pro
                      </h1>
                      <p className="text-xs text-muted-foreground">FY 2024-25</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Updated for Budget 2024-25
                  </Badge>
                </div>
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer for mobile */}
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default Navigation;