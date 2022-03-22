import React from "react"
import AuthProvider from "./contexts/AuthContext"
import Signup from "./components/UserInfoAndAccount/Signup"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from "./components/UserInfoAndAccount/Login"
import ForgotPassword from "./components/UserInfoAndAccount/ForgotPassword"
import UserProfileSetUp from "./components/UserInfoAndAccount/UserProfileSetUp"
import UserProfile from "./components/UserInfoAndAccount/UserProfile"
import PasswordReset from "./components/UserInfoAndAccount/PasswordReset"
import Post from "./components/PostAndDetail/Post"
import Detail from "./components/PostAndDetail/Detail"
import ShowPosts from "./components/PostAndDetail/ShowPosts"
import ShowOrders from "./components/PostAndDetail/ShowOrders"

import NavBar from "./components/NavBar"
import Home from "./components/HomePage/Home"
import './stylesheet.css';

import Search from "./components/SearchPage/search"

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <div className="NavBar">
                        <NavBar/>
                    </div>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/user-profile-setup" element={<UserProfileSetUp/>}/>
                        <Route path="/user-profile" element={<UserProfile/>}/>
                        <Route path="/password-reset" element={<PasswordReset/>}/>
                        <Route path="/post" element={<Post/>}/>
                        <Route path="/detail/:postId" element={<Detail/>}/>
                        <Route path="/myposts" element={<ShowPosts/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/search/:query" element={<Search/>}/>
                        <Route path="/myorders" element={<ShowOrders/>}/>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
