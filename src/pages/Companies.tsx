import { companies } from '../data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Companies = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Space Companies</h1>
          <p className="text-xl text-muted-foreground">Meet the organizations leading the charge in space exploration</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {companies.map((company) => (
            <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img src={company.imageUrl} alt={company.name} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{company.name}</CardTitle>
                <CardDescription className="text-base">Founded {company.founded} by {company.founder}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{company.description}</p>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Headquarters</p>
                    <p className="font-semibold">{company.headquarters}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Employees</p>
                    <p className="font-semibold">{company.employees.toLocaleString()}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    Visit Website →
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
