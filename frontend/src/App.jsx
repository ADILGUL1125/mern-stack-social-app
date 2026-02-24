import React from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Feed from "./pages/feed";
import Messages from "./pages/messages";
import Chatbox from "./pages/chatbox";
import Connection from "./pages/connection";
import Discover from "./pages/discover";
import Profile from "./pages/profile";
import Createpost from "./pages/createpost";
import {useUser} from "@clerk/clerk-react"
import Layout from "./pages/layout";
import {Toaster} from "react-hot-toast"
const App = () => {
  // console.log("user",useUser)
  const {user}=useUser()
  console.log(user)
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={!user ?<Login /> :<Layout/>}>
        <Route index element={<Feed />} />
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/messages/:userid" element={<Chatbox/>}/>
        <Route path="/connection" element={<Connection/>}/>
        <Route path="/discover" element={<Discover/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/:profileid" element={<Profile/>}/>
        <Route path="/creat-post" element={<Createpost/>}/>
      </Route>
    </Routes>
    </>
  );
};

export default App;
