import WindowControl from '@/components/WindowControl';
import { photosLinks } from '@/constants';
import useContentStore from '@/store/contentStore';
import WindowWrapper from '@/hoc/WindowWrapper'
import useWindowStore from '@/store/window';
import clsx from 'clsx';
import { Mail, Search } from 'lucide-react';
import React, { useState } from 'react'

const Gallery = () => {
    const {openWindow} = useWindowStore();
    const gallery = useContentStore((state) => state.gallery);

    console.log('gallery: ', gallery);

  return (
    <>
        <div id='window-header'>
            <WindowControl target='photos'/>

            <div className='flex w-full justify-end items-center gap-3 text-gray-500'>
                <Mail className='icon'/>
                <Search className='icon' />
            </div>
        </div>   

        <div className='flex w-full'>
            <div className='sidebar'>
                <h2>Photos</h2>
                <ul>
                    {photosLinks.map(({id, icon, title }) => (
                        <li key={id}>
                            <img 
                                src={icon}
                                alt={title}
                                className='size-4'
                            />
                            {title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='gallery'>
                <ul>
                    {gallery.map((item) => {
                        const id = item._id;
                        const img = item.image?.url;

                        return (
                            <li 
                                key={id}
                                onClick={() => 
                                    openWindow('imgfile', {
                                        id, 
                                        name: item.title ?? "Gallery image",
                                        icon: "/images/image.png",
                                        kind: "file",
                                        fileType: "img",
                                        imageUrl: img,
                                    })
                                }    
                            >
                                <img src={img} alt={item.title ?? `Gallery image ${id}`} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    </>
  )
}

const GalleryWindow = WindowWrapper(Gallery, 'photos');

export default GalleryWindow;