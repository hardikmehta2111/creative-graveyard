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
import PrivateRoutes from "./PrivateRoutes";
import ForgotPassword from "../components/auth/ForgotPassword";


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
                path:'/explore',
                element:<PrivateRoutes>
                    <Explore/>
                </PrivateRoutes>
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
                path:'/forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
            {
                path:'/create-post',
                element:
                <PrivateRoutes>

                <CreatePost/>
                </PrivateRoutes>
            },
            {
                path:'/profile',
                element:<PrivateRoutes>
                <Profile/>
                </PrivateRoutes>
            }
        ]
    }
])

export default routes