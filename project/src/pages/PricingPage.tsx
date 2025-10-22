
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: "Standard",
      price: "$9",
      description: "Perfect for simple tax returns",
      features: [
        "Basic tax filing",
        "Refund calculator",
        "Email support",
        "Standard processing"
      ]
    },
    {
      name: "Pro",
      price: "$19",
      description: "For more complex tax situations",
      features: [
        "Everything in Standard",
        "AI chat assistant",
        "OCR document processing",
        "Priority support",
        "Audit protection"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "$29",
      description: "Maximum refund guarantee",
      features: [
        "Everything in Pro",
        "Expert review",
        "Maximum refund guarantee",
        "Phone support",
        "Previous year amendments"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the tax filing experience that's right for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">
                  {plan.price}<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-tax-green" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "gradient" : "outline"}
                  disabled
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 text-muted-foreground">
          <p>Pricing functionality coming soon...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}