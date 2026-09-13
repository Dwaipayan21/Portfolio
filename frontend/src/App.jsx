import React, { useEffect } from 'react'
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
import Home from './components/Home'
import Gallery from './windows/Gallery'
import { fetchProjects } from './lib/portfolioApi'
import useContentStore from './store/contentStore'
import AdminLoginWindow from './windows/AdminLogin'
import AdminDashboardWindow from './windows/AdminDashboard'
import NotesWindow from './windows/Notes'
// import TerminalWindow from './windows/terminal'
gsap.registerPlugin(Draggable);

const App = () => {
  useEffect(() => {
    useContentStore.getState().loadContent();
  }, []);

  //testing zustand
  useEffect(() => {
  setTimeout(() => {
    console.log("ZUSTAND STORE:", useContentStore.getState());
  }, 3000);
}, []);

  return (
      <main>
        <Home />
        <Welcome />
        <Navbar />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
        <Gallery />
        <NotesWindow />
        <AdminLoginWindow/>
        <AdminDashboardWindow />
      </main>
  )
}

export default App