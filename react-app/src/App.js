import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
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
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
              <ProtectedRoute exact path="/users/profile/">
                <ProfilePage />
              </ProtectedRoute>
              <Route exact path="/users/profile/:userId">
                <UserProfilePage />
              </Route>
              <ProtectedRoute exact path="/users/:userId/messages">
                <Message />
              </ProtectedRoute>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
