import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../components/pages/Home";
import Explore from "../components/pages/Explore";
import Trending from "../components/pages/Trending";
import AboutUs from "../components/pages/AboutUs";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import CreatePost from "../components/Posts/CreatePost";
import Profile from "../components/pages/Profile";


let routes = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'/trending',
                element:<Trending/>
            },
            {
                path:'/about',
                element:<AboutUs/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
            {
                path:'/create-post',
                element:<CreatePost/>
            },
            {
                path:'/profile',
                element:<Profile/>
            }
        ]
    }
])

export default routes