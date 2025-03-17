import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ItemCard({ name, profilePic, branch, from, contactNo }) {
  return (
    <Card sx={{ maxWidth: 245 }} elevation={10}>
      <CardMedia
        component="img"
        sx={{ height: 140, objectFit: "contain" }}
        image={profilePic}
        title={name}
        alt={name}
        className='bg-red-500'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {name}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary',textAlign:'center' }}>
            {branch}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {from}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {contactNo}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}




// import React from 'react'

// const ItemCard = ({name,profilePic,branch,from,contactNo}) => {
//   return (
//     <div className='m-auto p-5 rounded-2xl w-50 flex-col cursor-pointer shadow-[0px_0px_23px_21px_rgba(46,88,255,1)]'>
//        <div className="overflow-hidden">
//             <img className='hover-scale-110 bg-cover h-50 w-40 rounded-full transition ease-in-out' src={profilePic} alt="Loading Image" />
//         </div>
//         <p className='pt-3 pb-1 text-sm text-red-500 text-center'>{name}</p>
//         <p className='text-sm font-medium text-red-500 text-center'>{branch}</p>
//         <p className='text-sm font-medium text-red-500 text-center'>{from}</p>
//         <p className='text-sm font-medium text-red-500 text-center'>{contactNo}</p>
        

//     </div>
//   )
// }

// export default ItemCard