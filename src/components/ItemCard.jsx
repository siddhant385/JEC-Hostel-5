import React from 'react'

const ItemCard = ({name,profilePic,branch,from,contactNo}) => {
  return (
    <div className='m-auto p-5 rounded-2xl w-50 flex-col cursor-pointer shadow-[0px_0px_23px_21px_rgba(46,88,255,1)]'>
       <div className="overflow-hidden">
            <img className='hover-scale-110 bg-cover h-50 w-40 rounded-full transition ease-in-out' src={profilePic} alt="Loading Image" />
        </div>
        <p className='pt-3 pb-1 text-sm text-red-500 text-center'>{name}</p>
        <p className='text-sm font-medium text-red-500 text-center'>{branch}</p>
        <p className='text-sm font-medium text-red-500 text-center'>{from}</p>
        <p className='text-sm font-medium text-red-500 text-center'>{contactNo}</p>
        

    </div>
  )
}

export default ItemCard