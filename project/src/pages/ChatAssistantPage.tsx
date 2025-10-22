
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { MessageCircle } from 'lucide-react';

export default function ChatAssistantPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">AI Tax Assistant</h1>
            <p className="text-muted-foreground">Get instant answers to your tax questions</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Chat with AI</CardTitle>
              <CardDescription>Ask questions in English, Spanish, French, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                AI chat functionality coming soon...
              </div>
              <Button className="w-full" disabled>
                Start Chatting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}