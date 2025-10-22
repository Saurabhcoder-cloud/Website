
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your tax filing progress</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Filing Status</CardTitle>
              <CardDescription>Your current filing progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                Dashboard functionality coming soon...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}