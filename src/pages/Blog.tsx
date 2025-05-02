
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, Clock, Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts, getFeaturedPosts } from '@/data/blogPosts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const featuredPosts = getFeaturedPosts();
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  // Get all unique tags across all blog posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));
  
  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* SEO-friendly header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">UIN Blog</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Insights on gamification, financial technology, and building engaging digital experiences for the next generation.
            </p>
          </header>
          
          {/* Search and filters */}
          <div className="mb-10">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 bg-uin-black/50 border-uin-purple/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTag(null)}
                className={cn(
                  "bg-gradient-to-r hover:opacity-90",
                  activeTag === null ? "from-uin-purple to-uin-magenta" : "bg-uin-black"
                )}
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button 
                  key={tag}
                  variant={activeTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "bg-gradient-to-r hover:opacity-90",
                    activeTag === tag ? "from-uin-purple to-uin-magenta" : "bg-uin-black"
                  )}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Featured post */}
          {featuredPosts.length > 0 && activeTag === null && !searchQuery && (
            <section className="mb-16">
              <h2 className="text-xl font-semibold mb-6">Featured</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map(post => (
                  <Card key={post.id} className="bg-uin-black/50 border-uin-purple/20 card-hover">
                    <CardHeader className="p-0">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 bg-uin-purple/20 text-uin-purple rounded-full"
                            onClick={() => setActiveTag(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-400 mb-4">{post.description}</p>
                    </CardContent>
                    <CardFooter className="px-6 py-4 border-t border-uin-purple/20 flex justify-between">
                      <div className="flex items-center text-sm text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="text-uin-purple hover:text-uin-magenta transition-colors"
                      >
                        Read more →
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}
          
          {/* All posts grid */}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              {activeTag ? `Posts tagged with "${activeTag}"` : 
               searchQuery ? "Search Results" : "All Articles"}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>No articles found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <Card key={post.id} className="bg-uin-black/50 border-uin-purple/20 card-hover">
                    <CardHeader className="p-0">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs flex items-center text-gray-400">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {post.date}
                        </span>
                        <span className="text-xs flex items-center text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{post.description}</p>
                    </CardContent>
                    <CardFooter className="px-5 py-4 border-t border-uin-purple/20 flex justify-between items-center">
                      <div className="flex gap-1">
                        {post.tags.slice(0, 1).map(tag => (
                          <span 
                            key={tag}
                            className="text-xs px-2 py-1 bg-uin-purple/20 text-uin-purple rounded-full cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTag(tag);
                            }}
                          >
                            <Tag className="h-3 w-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="text-sm text-uin-purple hover:text-uin-magenta transition-colors"
                      >
                        Read →
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
