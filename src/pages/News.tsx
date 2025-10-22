import { news } from '../data/sampleData';
import './News.css';

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
    <div className="news-page">
      <div className="page-header">
        <h1>Space News</h1>
        <p>Latest updates and developments from the space industry</p>
      </div>

      <div className="news-grid">
        {news.map((article) => (
          <article key={article.id} className="news-card">
            <div className="news-image">
              <img src={article.imageUrl} alt={article.title} />
            </div>
            <div className="news-content">
              <div className="news-date">{formatDate(article.date)}</div>
              <h2>{article.title}</h2>
              <p className="news-summary">{article.summary}</p>
              <a href={article.url} className="read-more">
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;
