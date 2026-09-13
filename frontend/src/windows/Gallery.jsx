import WindowControl from '@/components/WindowControl';
import { photosLinks } from '@/constants';
import useContentStore from '@/store/contentStore';
import WindowWrapper from '@/hoc/WindowWrapper';
import useWindowStore from '@/store/window';
import { Mail, Search } from 'lucide-react';
import { useState } from 'react';

const Gallery = () => {
    const { openWindow } = useWindowStore();
    const gallery = useContentStore((state) => state.gallery);
    const [selectedCategory, setSelectedCategory] = useState('Library');

    const filteredGallery = gallery.filter((item) => {
    if (selectedCategory === 'Library') {
        return true;
    }

    return item.category === selectedCategory;
});

    console.log(`gallery : ${gallery}`);

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">

            {/* HEADER */}
            <div
                id="window-header"
                className="shrink-0"
            >
                <WindowControl target="photos" />

                <div className="flex w-full justify-end items-center gap-3 text-gray-500">
                    <Mail className="icon" />
                    <Search className="icon" />
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex flex-1 min-h-0 w-full overflow-hidden">

                {/* SIDEBAR */}
                <div className="sidebar shrink-0">
                    <h2>Photos</h2>

                    <ul>
                        {photosLinks.map(({ id, icon, title }) => (
                            <li 
                                key={id}
                                onClick={() => setSelectedCategory(id)}
                                className={selectedCategory === id ? 'active' : 'not-active'}
                            >
                                <img
                                    src={icon}
                                    alt={title}
                                    className="size-4"
                                />
                                {title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* GALLERY - SCROLLS */}
                <div className="gallery flex-1 min-h-0 overflow-y-auto scrollbar-hide">
                    <ul>
                        {filteredGallery.map((item) => {
                            const id = item._id;
                            const img = item.image?.url;

                            return (
                                <li
                                    key={id}
                                    onClick={() =>
                                        openWindow('imgfile', {
                                            id,
                                            name: item.title ?? 'Gallery image',
                                            icon: '/images/image.png',
                                            kind: 'file',
                                            fileType: 'img',
                                            imageUrl: img,
                                        })
                                    }
                                >
                                    <img
                                        src={img}
                                        alt={
                                            item.title ??
                                            `Gallery image ${id}`
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>

                    {/* EMPTY CATEGORY */}
                    {filteredGallery.length === 0 && (
                        <div className='flex h-full items-center justify-center text-gray-400'>
                            No Photos Found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const GalleryWindow = WindowWrapper(Gallery, 'photos');

export default GalleryWindow;