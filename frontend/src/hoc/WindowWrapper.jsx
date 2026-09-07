import useWindowStore from '@/store/window'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import React, { useLayoutEffect, useRef } from 'react'

// windows in this list won't be draggable at all
const NON_DRAGGABLE_WINDOWS = ['admin', 'adminLogin'];

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows} = useWindowStore();
        const { isOpen,isMinimized, zIndex} = windows[windowKey];
        const ref = useRef(null);
        const isDraggable = !NON_DRAGGABLE_WINDOWS.includes(windowKey);

        useGSAP(() => {
            const element = ref.current;    
            if(!element || !isDraggable) return;

            const [instance] = Draggable.create(element,{
                onPress: () => focusWindow(windowKey),//only draggable the winow which is pressed
                ignore: 'input, textarea, button, select, option',
            });

            return () => instance.kill();
        },[])

        useGSAP(() => {
            const element = ref.current;
            if(!element || !isOpen || isMinimized) return;

            // element.style.display = "block;"

            //animation
            gsap.fromTo(
                element,
                { scale: 0.0 , opacity:0, y:40},
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out"},
            )
        },[isOpen, isMinimized]);

        useLayoutEffect(() => {
            const element = ref.current;
            if(!element) return;

            element.style.display = (isOpen && !isMinimized) ? 'block' : "none";
        },[isOpen, isMinimized])

        return (
            <section 
                id={windowKey} 
                ref={ref} 
                style={{ 
                    zIndex,
                    width: windowKey === 'adminLogin' ? '380px' : undefined,
                }}
                onMouseDown={() => focusWindow(windowKey)}
            >
                <Component {...props}/>
            </section>
        )
    };

    Wrapped.displayName = `WindowWrapper${Component.displayName || Component.name || "Component"}`;

    return Wrapped;
  
}

export default WindowWrapper