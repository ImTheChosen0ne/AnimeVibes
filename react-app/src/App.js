import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./pages/SplashPage";
import SinglePost from "./components/SinglePost";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreatePostForm from "./components/CreatePost";
import EditPostForm from "./components/EditPost";
import ProfilePage from "./pages/ProfilePage";
import SplashSideBar from "./components/SplashSideBar";
import UserProfilePage from "./pages/ProfilePage/UserProfilePage";
import FollowersPosts from "./components/SplashPageFollowing";
import Message from "./components/Messages";
import Search from "./components/Search";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="content-container">
        <Navigation isLoaded={isLoaded} />
        <div className="splash">
        <SplashSideBar isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/following">
              <FollowersPosts />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <ProtectedRoute exact path="/posts/new">
              <CreatePostForm />
            </ProtectedRoute>
            <ProtectedRoute exact path="/posts/:postId/edit">
              <EditPostForm />
            </ProtectedRoute>
            <Route exact path="/posts/:postId">
              <SinglePost />
            </Route>
            <Route exact path="/users/profile/">
              <ProfilePage />
            </Route>
            <Route exact path="/users/profile/:userId">
              <UserProfilePage />
            </Route>
            <ProtectedRoute exact path="/users/:userId/messages">
              <Message />
            </ProtectedRoute>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route>
              <h1>Page Not Found</h1>
            </Route>
          </Switch>
        )}
        </div>
      </div>
    </>
  );
}

export default App;
