import React from 'react'
import Sidebar from './Sidebar'
import "./Search.css"

const Search = () => {
  return (
    <>
      <div className='main-box'> 
      <Sidebar/>

      <div  className='input-box'>
            <span className='input-box-name'>Search</span>
              <div >
                  <input type="text" placeholder='search'  className='input-search'/>
              </div>
      </div>
        
      </div>
    

    
    </>
  )
}

export default Search
