'use client'

import { useEffect, useRef } from "react";

export default function Modal(props) {
    useEffect(() => {
      if (props.isVisible) {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').style.overflow = 'auto';
      }
    }, [])
    
    const handleVisability = (e) => {
      if (e.target !== e.currentTarget) {
        return false;
      }
  
      props.visabilityHandler(false);
    }
  
    return (
      <>
        {props.isVisible &&
          <div className="fixed z-40 w-screen h-screen top-0 left-0">
            <div className="relative z-40 w-full h-full flex justify-center overflow-y-auto bg-black/50" onClick={handleVisability}>
              <div className="absolute z-50 mt-20 min-w-[500px] min-h-[300px] bg-background rounded p-8">
                {props.children ?? 'Modal window'}
              </div>
            </div>
          </div>
        }
      </>
    )
  }