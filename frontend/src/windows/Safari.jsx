import { useEffect, useState } from 'react'
import api from '@/lib/api'
import WindowControl from '@/components/WindowControl'
import WindowWrapper from '@/hoc/WindowWrapper';
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from 'lucide-react';

const Safari = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
        {/* search bar */}
      <div id="window-header">
            <WindowControl target="safari"/>

            <PanelLeft className='ml-10 icon'/>

            <div className='flex items-center gap-1 ml-5'>
                <ChevronLeft className='icon'/>
                <ChevronRight className='icon'/>
            </div>

            <div className='flex-1 flex-center gap-3'>
                <ShieldHalf className='icon'/>

                <div className='search'>
                    <Search className='icon'/>

                    <input 
                        type="text"
                        placeholder='Search or enter website name'
                        className='flex-1'
                    />
                </div>
            </div>

            <div className='flex items-center gap-5'>
                <Share className='icon'/>
                <Plus className='icon'/>
                <Copy className='icon'/>
            </div>
        </div>
        {/* Content part */}
        <div className='blog'>
            <h2>My Developer Blog</h2>

            {loading && <p className='text-gray-400'>Loading posts...</p>}
            {!loading && blogs.length === 0 && (
                <p className='text-gray-400'>No blog posts yet.</p>
            )}

            <div className='space-y-8'>
                {blogs.map(({ _id, coverImage, title, createdAt, url }) => (
                    <div key={_id} className='blog-post'>
                        <div className='col-span-2'>
                            <img src={coverImage?.url} alt={title} />
                        </div>

                        <div className='content'>
                            <p>
                                {new Date(createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                            <h3>{title}</h3>
                            <a href={url} target='_blank' rel='noopener noreferrer'>
                                Check out the full post 
                                <MoveRight className='icon-hover'/>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>  
    </>
  )
}

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;