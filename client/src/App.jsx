import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ViewBlog from './pages/ViewBlog'
import ViewBlogs from './pages/ViewBlogs'
import CreateBlog from './pages/CreateBlog'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path = '/about' element ={<About/>}/>
        <Route path = '/sign-up' element ={<SignUp/>}/>
        <Route path = '/login' element ={<Login/>}/>
        <Route path='/profile/:id' element = {<Profile/>}/>
        <Route path = '/view-blog/:id' element ={<ViewBlog/>}/>
        <Route path = '/view-blogs' element ={<ViewBlogs/>}/>
        <Route path = '/create-blog' element ={<CreateBlog/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
