import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { news } from '@/data/sampleData';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = news.find((n) => n.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">The requested article does not exist.</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/news">Back to News</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get related articles (exclude current one)
  const relatedArticles = news.filter(n => n.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Article Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1630343719250-6c9d0407420c?q=80&w=1200&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
            background: 'linear-gradient(0deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.7) 30%, rgba(10, 10, 10, 0) 100%)'
          }}></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <Badge className="mb-4 bg-blue-600">Space News</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-300">
            <span>{formatDate(article.date)}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8 text-gray-300 hover:text-white">
              <Link to="/news">← Back to News</Link>
            </Button>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 md:p-12">
              {/* Summary */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Summary</h2>
                <p className="text-xl text-gray-300 leading-relaxed">{article.summary}</p>
              </div>

              {/* Full Content Placeholder */}
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                  This is a detailed article about the latest developments in space exploration. 
                  The story covers significant breakthroughs and provides insights into the future of aerospace technology.
                </p>
                <p className="text-gray-300 mb-4">
                  {article.summary} The implications of these developments are far-reaching and will 
                  shape the trajectory of space exploration for years to come.
                </p>
                <p className="text-gray-300 mb-4">
                  Industry experts suggest that this marks a turning point in our approach to space missions,
                  combining innovative technology with sustainable practices.
                </p>
              </div>

              {/* External Link */}
              <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read Original Article →
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-[#111]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} to={`/news/${related.id}`}>
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#4a4a4a] hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-video bg-[#0a0a0a]">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-400 mb-2">{formatDate(related.date)}</p>
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{related.title}</h3>
                      <p className="text-gray-400 line-clamp-2">{related.summary}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetail;
