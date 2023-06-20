import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProfileThunk } from "../../store/session";
import { useModal } from "../../context/Modal";

const EditProfile = ({ sessionUser }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [profilePic, setProfilePic] = useState(sessionUser.profile_pic);
  const [name, setName] = useState(sessionUser.name);
  const [bio, setBio] = useState(sessionUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...sessionUser,
      profile_pic: profilePic,
      name,
      bio
    };

    // const errors = {};
    // if (comments === "") {
    //   errors.comments = "Comment is required";
    // }
    // setErrors(errors);

    await dispatch(editProfileThunk(user));

    closeModal();
  };

  return (
    <div className="log-in-modal">
      <h1>Edit your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Profile Picture
            {/* <h4 className="formErrors">{errors?.comments}</h4> */}
            <input
              placeholder="Enter your profile picture here"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </label>
          <label>
            Name
            {/* <h4 className="formErrors">{errors?.comments}</h4> */}
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Bio
            {/* <h4 className="formErrors">{errors?.comments}</h4> */}
            <textarea
              placeholder="Enter your bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
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
        </div>
      </form>
    </div>
  );
};
export default EditProfile;
