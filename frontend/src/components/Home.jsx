import useLocationStore from '@/store/location';
import useProjectStore from '@/store/projectStore';
import useWindowStore from '@/store/window';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { Draggable } from 'gsap/Draggable';
import React, { useEffect } from 'react'
import Wallpaper from './Wallpaper';

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();
    const { workChildren: projects, loaded, loadProjects } = useProjectStore();

    useEffect(() => {
        if (!loaded) loadProjects();
    }, [loaded, loadProjects]);

    //secret shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            const modifier = e.ctrlKey || e.metaKey;

            if (
            modifier &&
            e.shiftKey &&
            e.key.toLowerCase() === "d"
            ) {
                e.preventDefault();

                openWindow('adminLogin');
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [openWindow]);


    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project);
        openWindow("finder");
    }

    useGSAP(() => {
        Draggable.create(".folder");
    }, [projects]);

  return (
    <section id='home'>
        <Wallpaper />
        <ul>
            {projects.map((project) => (
                <li 
                    key={project.id}
                    className={clsx("group folder",
                        project.windowPosition)}
                    onClick={() => handleOpenProjectFinder(project)}
                >
                    <img 
                        src='/images/folder.png'
                        alt={project.name}
                    />
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home