import WindowControl from '@/components/WindowControl';
import { locations } from '@/constants';
import WindowWrapper from '@/hoc/WindowWrapper'
import useLocationStore from '@/store/location';
import useWindowStore from '@/store/window';
import { fetchProjects } from '@/lib/projects';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'

// reuse the original 3-slot layout, cycling if you add more projects
const POSITIONS = [
  { position: "top-10 left-5", windowPosition: "top-[5vh] left-5" },
  { position: "top-52 right-80", windowPosition: "top-[20vh] left-7" },
  { position: "top-10 left-80", windowPosition: "top-[33vh] left-7" },
];

const projectToFolderItem = (project, idx) => {
  const pos = POSITIONS[idx % POSITIONS.length];
  let hostname = project.liveLink;
  try { hostname = new URL(project.liveLink).hostname.replace("www.", ""); } catch {}

  return {
    id: project._id,
    name: project.title,
    icon: "/images/folder.png",
    kind: "folder",
    position: pos.position,
    windowPosition: pos.windowPosition,
    children: [
      {
        id: `${project._id}-txt`,
        name: `${project.title} Project.txt`,
        icon: "/images/txt.png",
        kind: "file",
        fileType: "txt",
        position: "top-5 left-10",
        description: project.description.split("\n").filter(Boolean),
      },
      {
        id: `${project._id}-url`,
        name: hostname,
        icon: "/images/safari.png",
        kind: "file",
        fileType: "url",
        href: project.liveLink,
        position: "top-10 right-20",
      },
      {
        id: `${project._id}-img`,
        name: `${project.title.toLowerCase().replace(/\s+/g, "-")}.png`,
        icon: "/images/image.png",
        kind: "file",
        fileType: "img",
        imageUrl: project.screenshot?.url || "/images/project-placeholder.png",
        position: "top-52 right-80",
      },
      {
        id: `${project._id}-github`,
        name: "GitHub Repo",
        icon: "/images/github.png",
        kind: "file",
        fileType: "url",
        href: project.githubLink,
        position: "top-60 right-20",
      },
    ],
  };
};

const Finder = () => {
    const { openWindow } = useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore();
    const [workChildren, setWorkChildren] = useState(locations.work.children);

    useEffect(() => {
        let cancelled = false;

        fetchProjects()
            .then((projects) => {
                if (cancelled) return;
                const folders = projects.map(projectToFolderItem);
                setWorkChildren(folders);

                // if the user is still on the default Work view, refresh it
                if (activeLocation?.id === locations.work.id) {
                    setActiveLocation({ ...locations.work, children: folders });
                }
            })
            .catch((err) => console.error("Failed to load projects:", err));

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const workLocation = { ...locations.work, children: workChildren };
    const sidebarLocations = { ...locations, work: workLocation };

    const openItem = (item) => {
        if (item.fileType === 'pdf') return openWindow('resume');
        if (item.kind === 'folder') return setActiveLocation(item);
        if (['fig', 'url'].includes(item.fileType) && item.href)
            return window.open(item.href, '_blank');

        openWindow(`${item.fileType}${item.kind}`, item);
    };

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActiveLocation(item)}
                        className={clsx(item.id === activeLocation.id ? "active" : "not-active")}
                    >
                        <img src={item.icon} alt={item.name} className='w-4' />
                        <p className='text-sm font-medium truncate'>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

  return (
    <>
       <div id='window-header'>
            <WindowControl target='finder'/>
            <Search className='icon' />
        </div>

        <div className='bg-white flex h-full'>
            <div className='sidebar'>
                {renderList('Favourites', Object.values(sidebarLocations))}
                {renderList('My Projects', workLocation.children)}
            </div>

            <ul className='content overflow-hidden relative'>
                {activeLocation?.children?.map((item)=> (
                    <li
                        key={item.id}
                        className={item.position}
                        onClick={() => openItem(item)}
                    >
                        <img src={item.icon} alt={item.name} />
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;