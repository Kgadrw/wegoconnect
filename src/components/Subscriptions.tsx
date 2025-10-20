import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Shield, Clock, CheckCircle } from "lucide-react";

const Subscriptions = () => {
  const plans = [
    {
      name: "Residential",
      price: "$110",
      data: "Unlimited",
      speed: "100+ Mbps",
      features: ["Standard priority", "Unlimited data", "24/7 support"]
    },
    {
      name: "Business",
      price: "$500",
      data: "Unlimited",
      speed: "220+ Mbps",
      features: ["Priority access", "99.9% uptime SLA", "Dedicated support", "Business billing"]
    },
    {
      name: "Roam",
      price: "$200",
      data: "1TB",
      speed: "100+ Mbps",
      features: ["Global coverage", "Pause/resume anytime", "Regional roaming"]
    }
  ];

  const paymentMethods = [
    { name: "MTN Mobile Money", icon: "📱" },
    { name: "Airtel Money", icon: "📲" },
    { name: "Visa Card", icon: "💳" },
    { name: "Mastercard", icon: "💳" }
  ];

  return (
    <section id="subscriptions" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Manage Your <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Subscription</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Easy monthly payments with multiple payment options. 
            Pay securely online and never worry about connectivity again.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Current Plans Overview */}
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-bold text-foreground mb-6 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Available Plans</h3>
            
            {plans.map((plan, index) => (
              <Card key={index} className="bg-card shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                      <CardDescription className="text-primary text-2xl font-bold mt-1">
                        {plan.price}/month
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Speed</div>
                      <div className="font-semibold text-foreground">{plan.speed}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground">Data Allowance</div>
                    <div className="font-semibold text-foreground">{plan.data}</div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Form */}
          <div className="animate-scale-in">
            <Card className="bg-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Pay Monthly Subscription
                </CardTitle>
                <CardDescription>
                  Secure payment processing with multiple options available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-id">Customer ID</Label>
                    <Input id="customer-id" placeholder="Enter your customer ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan-select">Subscription Plan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential - $110/month</SelectItem>
                        <SelectItem value="business">Business - $500/month</SelectItem>
                        <SelectItem value="roam">Roam - $200/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method, index) => (
                        <SelectItem key={index} value={method.name.toLowerCase().replace(/\s+/g, '-')}>
                          {method.icon} {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input id="phone-number" placeholder="+250 XXX XXX XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <Input id="amount" placeholder="110.00" disabled />
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Secure Payment Features
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SSL encrypted transactions</li>
                    <li>• Automatic payment confirmations</li>
                    <li>• Instant service activation</li>
                    <li>• Receipt via SMS and email</li>
                  </ul>
                </div>

                <Button variant="cta" className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Subscription
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Payment will be processed securely. Service activation within minutes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Auto-pay Option */}
            <Card className="mt-6 bg-primary-light border-primary">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">Set Up Auto-Pay</h4>
                    <p className="text-sm text-muted-foreground">Never miss a payment with automatic monthly billing</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscriptions;