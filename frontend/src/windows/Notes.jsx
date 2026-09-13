import WindowControl from '@/components/WindowControl'
import WindowWrapper from '@/hoc/WindowWrapper'
import React, { useState } from 'react'
import { Search, Type, Share, SquarePen, User, Zap } from 'lucide-react'

const notesData = [
  {
    id: 'about-me',
    icon: User,
    title: 'About Me',
    subtitle: 'Software Engineer & Creative...',
    date: 'September 12, 2024 at 4:15 PM',
    heading: '👋 About Me — Dwaipayan',
    body: [
      `Hello there! I'm a passionate Software Engineer & Creative Developer dedicated to engineering intuitive, high-performance digital experiences. I specialize in crafting fluid user interfaces, responsive design architectures, and interactive web tools with meticulous attention to micro-interactions.`,
      `I love working at the intersection of aesthetic design and technical precision—building experiences that feel seamless, tactile, and natural to interact with across modern platforms.`,
    ],
  },
  {
    id: 'future-goals',
    icon: Zap,
    title: 'Future Goals',
    subtitle: 'Roadmap, Architecture &...',
    date: 'September 12, 2024 at 4:15 PM',
    heading: '⚡ Future Goals',
    body: [
      `Placeholder content for future goals — roadmap, architecture decisions, and things I'm working toward.`,
    ],
  },
]

const Notes = () => {
  const [activeId, setActiveId] = useState(notesData[0].id)
  const activeNote = notesData.find((n) => n.id === activeId)

  return (
    <>
      <div id='window-header' className='flex items-center px-4 py-2 gap-4'>
        <WindowControl target='notes' />

        <div className='flex-1 flex justify-center'>
          <div className='flex items-center gap-2 bg-black/5 rounded-lg px-3 py-1.5 w-72'>
            <Search size={14} className='text-yellow-900/40' />
            <input
              type='text'
              placeholder='Search'
              className='bg-transparent outline-none text-sm text-yellow-900/70 placeholder:text-yellow-900/40 w-full'
            />
          </div>
        </div>

        <div className='flex items-center gap-3 text-yellow-900/60'>
          <Type size={16} className='cursor-pointer hover:text-yellow-900' />
          <Share size={16} className='cursor-pointer hover:text-yellow-900' />
          <SquarePen size={16} className='cursor-pointer hover:text-yellow-900' />
        </div>
      </div>

      <div className='body'>
        <div className='sidebar'>
          <h3>Notes</h3>
          <ul className='space-y-1'>
            {notesData.map((note) => {
              const Icon = note.icon
              const isActive = note.id === activeId
              return (
                <li
                  key={note.id}
                  onClick={() => setActiveId(note.id)}
                  className={isActive ? 'active !bg-blue-50 !text-blue-600' : ''}
                >
                  <Icon size={30} strokeWidth={1.75} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                  <div className='flex flex-col min-w-0'>
                    <span className={`truncate ${isActive ? 'font-medium' : ''}`}>{note.title}</span>
                    <span className='text-[11px] text-gray-400 truncate'>{note.subtitle}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className='editor'>
          <time>{activeNote.date}</time>
          <h2>{activeNote.heading}</h2>
          {activeNote.body.map((para, i) => (
            <p key={i} className='mb-4'>{para}</p>
          ))}
        </div>
      </div>
    </>
  )
}

const NotesWindow = WindowWrapper(Notes, 'notes')

export default NotesWindow