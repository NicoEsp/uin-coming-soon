
import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CalendarIcon, Clock, Tag, ArrowLeft } from 'lucide-react';
import { getPostBySlug, getRecentPosts } from '@/data/blogPosts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRecentPosts(slug) : [];
  
  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
    }
    
    // Update page title for SEO
    if (post) {
      document.title = `${post.title} | UIN Blog`;
    }
    
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [post, navigate, slug]);

  if (!post) {
    return null;
  }

  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <div className="mb-6">
            <Link to="/blog" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all articles
            </Link>
          </div>
          
          {/* Article header */}
          <article>
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/blog?tag=${tag}`}
                    className="text-xs px-3 py-1 bg-uin-purple/20 text-uin-purple rounded-full hover:bg-uin-purple/30 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <div>
                  By <span className="text-white">{post.author}</span>
                </div>
              </div>
              
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </header>
            
            {/* Article content */}
            <div 
              className="prose prose-invert max-w-none prose-headings:text-white prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-uin-purple prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Author bio */}
            <div className="mt-12 p-6 bg-uin-black/50 border border-uin-purple/20 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-uin-purple rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.split(' ').map(name => name[0]).join('')}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{post.author}</h3>
                  <p className="text-gray-400 text-sm">Content Writer</p>
                </div>
              </div>
              <p className="text-gray-300">
                {post.author} writes about financial technology, gamification, and Gen-Z engagement strategies.
              </p>
            </div>
          </article>
          
          {/* Related articles */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Card key={relatedPost.id} className="bg-uin-black/50 border-uin-purple/20 card-hover">
                  <div className="h-36 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                    <Link 
                      to={`/blog/${relatedPost.slug}`} 
                      className="text-sm text-uin-purple hover:text-uin-magenta transition-colors"
                    >
                      Read article →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-xl font-bold mb-4">Want to learn more about UIN?</h2>
            <p className="text-gray-400 mb-6">Discover how UIN can help you build engaging financial experiences for the next generation.</p>
            <Button className="bg-gradient-to-r from-uin-purple to-uin-magenta hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
