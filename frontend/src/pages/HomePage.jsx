import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  ArrowRight, CheckCircle2, Sparkles, Zap, Users, Shield, TrendingUp, Globe,
  Star, Moon, Sun, Menu, X as CloseIcon, FileText, Mail, ShoppingCart, Share2,
  ChevronDown, Check
} from 'lucide-react';
import { pricingPlans, testimonials, features, stats, competitorComparison, faqs } from '../mock';
import { LiveDemo } from '../components/LiveDemo';
import { Chatbot } from '../components/Chatbot';
import { useTheme } from '../components/ThemeProvider';
import { toast } from 'sonner';

const iconMap = {
  Sparkles, Zap, Users, Shield, TrendingUp, Globe
};

export const HomePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleCTAClick = (planName) => {
    toast.success(`🎉 Great choice! Starting your ${planName} trial...`, {
      description: 'Redirecting to signup page...'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              SDWrite AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('demo')} className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Live Demo
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('comparison')} className="text-sm font-medium hover:text-cyan-600 transition-colors">
              Compare
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-secondary transition-all duration-300"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button onClick={() => handleCTAClick('Pro')} className="hidden md:flex bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
              Start Free Trial
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white dark:bg-gray-950 p-4 space-y-2">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('demo')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Live Demo
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('comparison')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Compare
            </button>
            <Button onClick={() => handleCTAClick('Pro')} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
              Start Free Trial
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/40 via-blue-100/40 to-purple-100/40 dark:from-cyan-950/20 dark:via-blue-950/20 dark:to-purple-950/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0 hover:from-cyan-700 hover:to-blue-700">
                ✨ Powered by Advanced AI Technology
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Write <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">10x Faster</span> with AI
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your content creation with our AI-powered writing assistant. Create blog posts, marketing copy, emails, and more in seconds—not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('demo')}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Try Live Demo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('pricing')}
                  className="text-lg px-8 py-6 border-2 hover:border-cyan-600 hover:text-cyan-600 transition-all duration-300"
                >
                  View Pricing
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-8 pt-8 border-t">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1508780709619-79562169bc64"
                alt="AI Writing Assistant"
                className="relative rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 border-0">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Everything You Need to <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Create Amazing Content</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools designed for professional content creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <Card key={idx} className="border-2 hover:border-cyan-600 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-950 dark:to-blue-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-cyan-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 bg-gradient-to-b from-cyan-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0">
              Interactive Demo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Experience the <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Magic</span> Yourself
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Try our AI writing tools right now—no signup required
            </p>
          </div>

          <LiveDemo />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 border-0">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Simple, <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative border-2 transition-all duration-300 ${
                  plan.highlighted 
                    ? 'border-cyan-600 shadow-2xl scale-105 bg-gradient-to-b from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20' 
                    : 'hover:border-cyan-600 hover:shadow-xl'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0 px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-3">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleCTAClick(plan.name)}
                    className={`w-full py-6 text-base font-semibold ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {plan.cta} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section id="comparison" className="py-20 bg-gradient-to-b from-cyan-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0">
              Comparison
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              See How We <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Stack Up</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare SDWrite AI with leading competitors
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <Card className="border-2 shadow-xl">
              <div className="min-w-[800px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      {competitorComparison.competitors.map((comp, idx) => (
                        <th key={idx} className={`text-center p-4 font-semibold ${idx === 0 ? 'text-cyan-600' : ''}`}>
                          {comp.name}
                          {idx === 0 && <Badge className="ml-2 bg-cyan-600 text-white">Us</Badge>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.features.map((feature, fIdx) => (
                      <tr key={fIdx} className="border-b hover:bg-secondary/50 transition-colors">
                        <td className="p-4 font-medium">{feature}</td>
                        {competitorComparison.competitors.map((comp, cIdx) => (
                          <td key={cIdx} className={`text-center p-4 ${cIdx === 0 ? 'bg-cyan-50/50 dark:bg-cyan-950/10 font-semibold' : ''}`}>
                            {comp.values[fIdx]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <p className="text-sm text-muted-foreground text-center mt-4">
              * Fair usage limits apply | Data as of December 2025
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 border-0">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Loved by <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">50,000+ Users</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what content creators are saying about WriteAI Pro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-2 hover:border-cyan-600 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 border-2 border-cyan-200 dark:border-cyan-800">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                      <CardDescription className="text-xs">{testimonial.company}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-cyan-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0">
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-2 rounded-lg px-6 hover:border-cyan-600 transition-colors">
                  <AccordionTrigger className="text-left font-semibold hover:text-cyan-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join 50,000+ content creators who are already writing 10x faster with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => handleCTAClick('Pro')}
              className="bg-white text-cyan-600 hover:bg-gray-100 text-lg px-10 py-7 shadow-2xl font-semibold"
            >
              Start Free 14-Day Trial <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('demo')}
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7 font-semibold"
            >
              Try Live Demo First
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">No credit card required • Cancel anytime • 30-day money-back guarantee</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SDWrite AI</span>
              </div>
              <p className="text-sm leading-relaxed">
                SDWrite AI - The most powerful AI writing assistant for content creators, marketers, and businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-cyan-400 transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-cyan-400 transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToSection('demo')} className="hover:text-cyan-400 transition-colors">Live Demo</button></li>
                <li><button onClick={() => scrollToSection('comparison')} className="hover:text-cyan-400 transition-colors">Comparison</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 WriteAI Pro. All rights reserved. Made with ❤️ for content creators.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};
