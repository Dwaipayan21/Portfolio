import { navLinks } from '#constants';
import { navIcons } from '#constants';
import dayjs from 'dayjs';
import React from 'react'
import { ThemeToggle } from './theme-toggle';
import useWindowStore from '@/store/window';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const {isAdmin, authLoading } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-2
     bg-white/70 dark:bg-neutral-900/90 text-black 
     dark:text-white backdrop-blur-md transition-colors">

        {/* Left side */}
        <div className='flex items-center gap-6'>
            <img src='/images/logo.svg' alt='logo' className='dark:invert'/>
            <p className='font-bold'>Dwaipayan's Portfolio</p>

            <ul className='flex gap-4'>
                {navLinks.map(({ id, name, type})=>(
                    <li key={id} onClick={() => openWindow(type)}>
                        <p className='text-sm text-black/80 dark:text-white/80
                            dark:hover:text-white dark:text-white'>{name}</p>
                    </li>
                ))}
            </ul>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4'>
            {/* theme toggle */}
            <ThemeToggle />
            <ul className='flex items-center gap-3'>
                {navIcons.map(({ id, img})=> {
                    if(id === 3 && authLoading) return null;

                    if(id === 3 && !isAdmin) return null;

                    return(
                        <li 
                            key = {id}
                            onClick={() => id ===3 && openWindow('admin')}    
                        >
                            <img 
                                src={img}
                                className='icon-hover dark:invert cursor-pointer'
                            />
                        </li>
                    );
                })}
            </ul>

            <time className="text-sm text-black dark:text-white">
                {dayjs().format("ddd MMM D h:mm A")}
            </time>
        </div>
    </nav>
  )
}

export default Navbar