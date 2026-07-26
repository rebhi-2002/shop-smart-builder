import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { getPostBySlug } from '@/data/blogPosts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Article not found</h1>
        <Button asChild>
          <Link to="/blog">Back to blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.cover,
            datePublished: post.date,
            author: { '@type': 'Organization', name: post.author },
          })}
        </script>
      </Helmet>

      <nav className="text-sm text-muted-foreground mb-4">
        <Link to="/blog" className="hover:text-foreground">Blog</Link> / {post.title}
      </nav>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {new Date(post.date).toLocaleDateString()} · {post.author} · {post.readMinutes} min read
      </p>

      <img
        src={post.cover}
        alt={post.title}
        className="w-full rounded-lg mb-8 aspect-video object-cover"
      />

      <div className="space-y-4 text-base leading-relaxed">
        {post.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-10 flex gap-3">
        <Button asChild><Link to="/products">Shop now</Link></Button>
        <Button asChild variant="outline"><Link to="/blog">More articles</Link></Button>
      </div>
    </article>
  );
};

export default BlogPost;
