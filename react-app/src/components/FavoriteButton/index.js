import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addFavoriteThunk, deleteFavoriteThunk } from "../../store/session";


const FavoriteButton = ({ sessionUser, post }) => {
    const dispatch = useDispatch();

    let [favoriteColor, setfavoriteColor] = useState("")

    if(!sessionUser) favoriteColor=""

    if(sessionUser?.user_favorites){
        for (let favorite of sessionUser?.user_favorites){
            if(favorite.id === post?.id) favoriteColor="yellowFavorite"
        }
    }

    useEffect(() => {

      }, [favoriteColor]);


    const handleFavorite = async () => {
        if(!sessionUser){
            window.alert("Please log in")
        }

        if(favoriteColor === "yellowFavorite"){
            await dispatch(deleteFavoriteThunk(post.id, sessionUser.id))
            setfavoriteColor("")
        }else if(favoriteColor === ""){
            await dispatch(addFavoriteThunk(post?.id, sessionUser?.id))
            setfavoriteColor("yellowFavorite")
        }

    }

    return(
        <button onClick={handleFavorite} className={favoriteColor}>
            <i className={favoriteColor? "fa-solid fa-bookmark":"fa-regular fa-bookmark"} />
        </button>
    )
}

export default FavoriteButton
