import React from 'react'
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import Dock from './components/Dock'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import Terminal from './windows/terminal'
import Safari from './windows/Safari'
import Resume from './windows/Resume'
import Finder from './windows/Finder'
import Text from './windows/Text'
import Image from './windows/Image'
import Contact from './windows/Contact'
// import TerminalWindow from './windows/terminal'
gsap.registerPlugin(Draggable);

const App = () => {
  return (
      <main>
        <Navbar />
        <Welcome />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
      </main>
  )
}

export default App