import React, { useState } from 'react';
import { writingTools } from '../mock';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Mail, Sparkles, Share2, ShoppingCart, Megaphone, Loader2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const iconMap = {
  FileText,
  Mail,
  Sparkles,
  Share2,
  ShoppingCart,
  Megaphone
};

export const LiveDemo = () => {
  const [selectedTool, setSelectedTool] = useState(writingTools[0].id);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTool = writingTools.find(tool => tool.id === selectedTool);
  const IconComponent = iconMap[currentTool?.icon] || FileText;

  const handleGenerate = () => {
    if (!input.trim()) {
      toast.error('Please enter some input to generate content');
      return;
    }

    setIsGenerating(true);
    setOutput('');

    // Simulate AI generation with typing effect
    const exampleOutput = currentTool.exampleOutput;
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < exampleOutput.length) {
        setOutput(prev => prev + exampleOutput[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsGenerating(false);
        toast.success('Content generated successfully!');
      }
    }, 10);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={selectedTool} onValueChange={setSelectedTool} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2 h-auto p-2 bg-secondary/50">
          {writingTools.map(tool => {
            const Icon = iconMap[tool.icon] || FileText;
            return (
              <TabsTrigger
                key={tool.id}
                value={tool.id}
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs text-center leading-tight">{tool.name.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {writingTools.map(tool => (
          <TabsContent key={tool.id} value={tool.id} className="mt-6">
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <CardDescription className="mt-1">{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Input</label>
                  <Textarea
                    placeholder={tool.placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[120px] resize-none border-2 focus:border-primary transition-colors"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !input.trim()}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Amazing Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>

                {output && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Generated Content</label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20 min-h-[200px] whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {output}
                    </div>
                  </div>
                )}

                {!output && !isGenerating && (
                  <div className="p-8 rounded-lg border-2 border-dashed border-muted-foreground/20 text-center text-muted-foreground">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Your AI-generated content will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
