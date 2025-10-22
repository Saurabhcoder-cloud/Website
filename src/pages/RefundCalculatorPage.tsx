
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { Calculator } from 'lucide-react';

export default function RefundCalculatorPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Refund Calculator</h1>
            <p className="text-muted-foreground">Estimate your tax refund instantly</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Refund</CardTitle>
              <CardDescription>Enter your tax information to get an estimate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Refund calculator functionality coming soon...
              </div>
              <Button className="w-full" disabled>
                Calculate Refund
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}