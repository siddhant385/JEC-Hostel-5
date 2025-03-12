import React from 'react'

const ImageCard = (props) => {
  return (
    <div>
        <figure className="group relative max-w-sm transition-all duration-300 cursor-pointer rounded-3xl backdrop-brightness-150 shadow-[0px_0px_28px_18px_rgba(52,27,243,0.7)] hover:shadow-none">
        <a href="#">
            <img className="rounded-lg" src={props.src} alt={props.alt}/>
        </a>
        <figcaption className="px-4 text-lg text-white bottom-6">
            <p className='text-blue-400 font-mono font-semibold rounded text center group-hover:text-red-500'>{props.description}</p>
        </figcaption>
        </figure>

    </div>
  )
}

export default ImageCard