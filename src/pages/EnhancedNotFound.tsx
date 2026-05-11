import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SEOHead } from '@/components/common/SEOHead';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Page Not Found - 404 Error"
        description="Sorry, the page you're looking for doesn't exist. Return to Menana's homepage or explore our services."
        noIndex={true}
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">404</div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, 
              deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="max-w-md mx-auto">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search for services, pages..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">Search</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-4 mb-8"
          >
            <Button asChild size="lg" className="h-auto p-6">
              <Link to="/" className="flex flex-col items-center gap-2">
                <Home className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Go Home</div>
                  <div className="text-sm opacity-90">Back to homepage</div>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="h-auto p-6">
              <Link to="/services" className="flex flex-col items-center gap-2">
                <Search className="w-6 h-6" />
                <div>
                  <div className="font-semibold">View Services</div>
                  <div className="text-sm opacity-90">Explore our offerings</div>
                </div>
              </Link>
            </Button>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold mb-4">Popular Pages</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <Button key={link.name} variant="ghost" size="sm" asChild>
                  <Link to={link.href}>{link.name}</Link>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Need Help Finding Something?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team is here to help. Schedule a consultation or contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:contact@menana.net">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8"
          >
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}