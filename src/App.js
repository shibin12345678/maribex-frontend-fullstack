
// import {BrowserRouter, Route, Routes}  from"react-router-dom"
// import Login from './Component/Login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Component/Login/Login'
import Registration from './Component/Registration/Registration'
import Home from './Component/Home/Home'
import { Createpost } from './Component/CreatePost/Createpost'
import Profail from './Component/profail/Profail.js'
import EditProfail from './Component/Home/EditProfail.js'
import Users from './Component/Home/Users.js'
import Search from './Component/Sidebar/Search.js'
import Reels from './Component/Sidebar/Reels.js'
import Message from './Component/Sidebar/Message.js'
import Notification from './Component/Sidebar/Notification.js'

const App = () => {
  return (
    <div>   
           <BrowserRouter>
          <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registration' element={<Registration/>}></Route>
          <Route path="/createPost" element={<Createpost/>}></Route>
          <Route path='/profail'  element={<Profail/>}></Route>
          <Route path='/EditProfail' element={<EditProfail/>}></Route>
          <Route path='/Users/:id/' element={<Users/>}></Route>
          <Route path='/Search' element={<Search/>}></Route>
          <Route path='/Reels' element={<Reels/>}></Route>
          <Route path="/Message" element={<Message/>}></Route>
          <Route path='/Notification' element={<Notification/>}></Route>
         </Routes>
           </BrowserRouter>
        
    </div>
  )
}

export default App
