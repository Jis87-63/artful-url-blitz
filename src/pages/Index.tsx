import { UrlShortener } from "@/components/UrlShortener";
import { Link2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-elegant">
              <Link2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Encurtador de Links
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforme seus links longos em URLs curtas e compartilháveis em segundos
          </p>
        </header>

        <UrlShortener />

        <footer className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card px-6 py-3 rounded-full shadow-card">
            <span>Rápido</span>
            <span>•</span>
            <span>Seguro</span>
            <span>•</span>
            <span>Gratuito</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
