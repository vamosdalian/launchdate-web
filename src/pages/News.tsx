import { news } from '../data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const News = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Space News</h1>
          <p className="text-xl text-muted-foreground">Latest updates and developments from the space industry</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardDescription>{formatDate(article.date)}</CardDescription>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">{article.summary}</p>
                <Button asChild variant="link" className="px-0">
                  <a href={article.url}>Read More →</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
