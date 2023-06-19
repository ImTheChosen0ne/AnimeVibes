import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { addFollowerThunk, removeFollowerThunk } from "../../store/session";
import { fetchPosts } from '../../store/post';

const FollowButton = ({ sessionUser, post }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const followers = useSelector((state) => state.session.user?.followers);
  const isFollowing = sessionUser?.followers.find(
    (follower) => follower.id === post.user.id
  );

  const handleFollow = () => {
    if (!sessionUser) {
      history.push("/login")
      return;
    }

    if (isFollowing) {
      dispatch(removeFollowerThunk(sessionUser.id, post.user.id));
    } else {
      dispatch(addFollowerThunk(sessionUser.id, post.user.id));
    }
  };

  return (
    <button className="follow-button" onClick={handleFollow}>
      {!sessionUser ? "Follow" : followers?.some((follower) => follower.id === post.user.id) ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
