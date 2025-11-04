import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link2, Copy, CheckCheck, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ShortenedLink {
  id: string;
  original: string;
  shortened: string;
  clicks: number;
  createdAt: Date;
}

export const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [isShortening, setIsShortening] = useState(false);
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateShortCode = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Por favor, insira uma URL");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Por favor, insira uma URL válida");
      return;
    }

    setIsShortening(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const shortCode = generateShortCode();
    const newLink: ShortenedLink = {
      id: shortCode,
      original: url,
      shortened: `short.link/${shortCode}`,
      clicks: 0,
      createdAt: new Date(),
    };

    setLinks([newLink, ...links]);
    setUrl("");
    setIsShortening(false);
    toast.success("Link encurtado com sucesso!");
  };

  const handleCopy = async (shortened: string, id: string) => {
    await navigator.clipboard.writeText(`https://${shortened}`);
    setCopiedId(id);
    toast.success("Link copiado!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="p-8 shadow-elegant border-0 bg-card">
        <div className="space-y-4">
          <div className="flex gap-3">
            <Input
              type="url"
              placeholder="Cole seu link aqui..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              className="text-lg h-14 border-2 focus-visible:ring-2 focus-visible:ring-primary"
            />
            <Button
              onClick={handleShorten}
              disabled={isShortening}
              size="lg"
              className="h-14 px-8 bg-gradient-primary hover:opacity-90 transition-all shadow-elegant"
            >
              <Link2 className="mr-2 h-5 w-5" />
              {isShortening ? "Encurtando..." : "Encurtar"}
            </Button>
          </div>
        </div>
      </Card>

      {links.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Links Recentes</h2>
          <div className="space-y-3">
            {links.map((link) => (
              <Card
                key={link.id}
                className="p-6 shadow-card hover:shadow-elegant transition-all duration-300 border-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {link.shortened}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(link.shortened, link.id)}
                        className="hover:bg-primary/10"
                      >
                        {copiedId === link.id ? (
                          <CheckCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ExternalLink className="h-4 w-4" />
                      <span className="truncate">{link.original}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{link.clicks} cliques</span>
                      <span>•</span>
                      <span>
                        {new Date(link.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
