import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ViewBlog from './pages/ViewBlog'
import CreateBlog from './pages/CreateBlog'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import UpdateBlog from './pages/UpdateBlog'
import UserBlogs from './pages/UserBlogs'
import SearchResults from './pages/SearchResults'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        <Route path = '/create-blog' element ={<CreateBlog/>}/>
        <Route path = '/update-blog/:id' element ={<UpdateBlog/>}/>
        <Route path = '/user-blogs/:id' element = {<UserBlogs/>}/>
        <Route path = '/search' element = {<SearchResults/>}/>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
