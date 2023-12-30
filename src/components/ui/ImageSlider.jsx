import { useState } from "react"

export default function ImageSlider({ slides, globKey }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectSlide = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div className="w-full h-full">
      <img src={slides[currentIndex]} className="object-scale-down h-full w-full"/>
      <div className="grid grid-cols-4 gap-2 mt-2">
        {slides.length > 1 && 
          slides.map((slide, index) => {
            let imageClass = `object-scale-down h-full w-full hover:cursor-pointer ${index != currentIndex && 'grayscale'} hover:grayscale-0`
            return (<img src={slides[index]} onClick={() => selectSlide(index)} className={imageClass} key={`${globKey}-${index}`}/>)
          })
        }
      </div>
    </div>
  )

}