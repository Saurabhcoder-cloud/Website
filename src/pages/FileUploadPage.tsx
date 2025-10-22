
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { Upload } from 'lucide-react';

export default function FileUploadPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-tax-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">File Your Taxes</h1>
            <p className="text-muted-foreground">Upload your tax documents for automatic processing</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upload Tax Documents</CardTitle>
              <CardDescription>Drag and drop your W-2s, 1099s, and other tax forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                File upload functionality coming soon...
              </div>
              <Button className="w-full" disabled>
                Upload Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}