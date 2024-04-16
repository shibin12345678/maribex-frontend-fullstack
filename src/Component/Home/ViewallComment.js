import React from 'react'

import { FaRegComment } from 'react-icons/fa'
import "../Home/Post.css"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height:500,
    bgcolor: 'background.paper',
    border: "none",
    boxShadow: 24,
    p: 4,
  };
const ViewallComment = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (

   <>
   
       <div>
                <button  className='nnnn' onClick={handleOpen} >
                  View all comment
               </button>
               <Modal  className='modall'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQpDP8YdDInq4fDdf1r5iyPnQmCnJ59033g&s' className='moadal-image'/>
          <div className='right-section'>
               <div className='modal-usename'> 
               <div className='modal-span'>
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTYigPM4PcXD1TaeZvnyS1pNRpZE3R1BQ1XQ&s" alt="" className="postProfile" />
               <span  className='modal-user'>usenanme</span> </div>
               </div>
                 <div className='allusername'>
                    <div className='modal-span'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTYigPM4PcXD1TaeZvnyS1pNRpZE3R1BQ1XQ&s" alt="" className="postProfile" />
                < span  className='modal-user'>usenanme</span>
                   </div>
                   </div>
                     <div className='comment-sec'>
                             <input  type='text' placeholder='Add a comment..' className='modal-input'/>
                             <button className='btn-modal'> post</button>
                     </div>
                      
          </div>
        </Box>
      </Modal>
    </div>
   
   
   </>
  )
}

export default ViewallComment
