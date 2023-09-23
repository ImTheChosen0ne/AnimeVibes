import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProfileThunk } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./EditProfile.css"

const EditProfile = ({ sessionUser }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [profilePic, setProfilePic] = useState(sessionUser.profile_pic);
  const [name, setName] = useState(sessionUser.name);
  const [bio, setBio] = useState(sessionUser.bio);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...sessionUser,
      profile_pic: profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      name: name || "Set a profile name.",
      bio: bio || "No bio yet.",
    };

    const errors = {};
    if (name.length > 25) {
      errors.name = "Name can not have more than 25 characters";
    }
    if (bio.length > 100) {
      errors.bio = "Bio can not have more than 100 characters";
    }
    if (
      profilePic &&
      !profilePic.endsWith(".png") &&
      !profilePic.endsWith(".jpg") &&
      !profilePic.endsWith(".jpeg")
    )
      errors.profilePic = "Image URL must end in .png, .jpg, or .jpeg";
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      await dispatch(editProfileThunk(user));
      closeModal();
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-container">
      <h1>Edit your Profile</h1>
      <form onSubmit={handleSubmit}>
            <p>Profile Picture URL</p>
            <h4 className="formErrors">{errors?.profilePic}</h4>
            <input
              type="url"
              placeholder="Enter your profile picture here"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
            <p>Name</p>
            <h4 className="formErrors">{errors?.name}</h4>
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Bio</p>
            <h4 className="formErrors">{errors?.bio}</h4>
            <textarea
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          <button
            className="createbutton-post"
            type="submit"
            // disabled={!!Object.values(errors).length}
          >
            Save
          </button>
          <button onClick={() => closeModal()}>
            Cancel
          </button>
      </form>
      </div>
    </div>
  );
};
export default EditProfile;
