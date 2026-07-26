import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';
import { blogPosts } from '@/data/blogPosts';

const Blog: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <SEO
      title="StyleMart Blog — Shopping Guides & Tips"
      description="Buying guides, style advice and shopping tips from the StyleMart team."
      path="/blog"
    />
    <h1 className="text-3xl font-bold mb-2">StyleMart Blog</h1>
    <p className="text-muted-foreground mb-8">
      Buying guides, style advice and practical shopping tips.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
          <Card className="h-full overflow-hidden transition-transform group-hover:-translate-y-1 group-hover:shadow-lg">
            <div className="aspect-video overflow-hidden">
              <img
                src={post.cover}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">
                {new Date(post.date).toLocaleDateString()} · {post.readMinutes} min read
              </p>
              <h2 className="font-semibold leading-snug mb-2">{post.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default Blog;
