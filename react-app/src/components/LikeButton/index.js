import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addLikeThunk, deleteLikeThunk } from "../../store/session";



const LikeButton = ({sessionUser, post }) => {
    const dispatch = useDispatch();

    let [heartColor, setHeartColor] = useState("")

    if(!sessionUser) heartColor=""

    if(sessionUser?.user_likes){
        for (let likes of sessionUser?.user_likes){
            if(likes.id === post?.id) heartColor="redheart"
        }
    }

    useEffect(() => {

      }, [heartColor]);


    const handleFavorite = async () => {
        if(!sessionUser){
            window.alert("Please log in")
        }

        if(heartColor === "redheart"){
            await dispatch(deleteLikeThunk(post?.id, sessionUser?.id))
            setHeartColor("")
        }else if(heartColor === ""){
            await dispatch(addLikeThunk(post?.id, sessionUser?.id))
            setHeartColor("redheart")
        }

    }

    return(
        <button onClick={handleFavorite} className={heartColor}>
            <i className={heartColor? "fa-solid fa-heart":"fa-regular fa-heart"} />
        </button>
    )
}

export default LikeButton
