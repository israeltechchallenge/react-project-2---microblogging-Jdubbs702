import { useEffect, useState } from "react";
import APIController from '../config/FirebaseController';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({
        displayName: '',
        photoURL: '',
        uid: '',
    });

    const signup = async (email, password) => {
        const user = await APIController.signup(email, password);
        return user;
    };
    const login = async (email, password) => {
        const user = await APIController.login(email, password);
        return user;
    };
    const loginWGoogle = async () => {
        const user = await APIController.loginWGoogle();
        return user;
    };

    const signout = async () => {
        await APIController.signout();
    };

    const updateDisplayName = async (newName) => {
        await APIController.updateDisplayName(newName);
        setUserName(newName);
    };

    const setUserName = (user) => {
        setUserInfo({ ...userInfo, displayName: user })
    };

    const photoSave = async (imageFile) => {
        const thumbNailName = imageFile.name;
        const Path = `thumbnails/${userInfo.uid}/${thumbNailName}`
        await APIController.uploadPhoto(Path, imageFile);
        await APIController.downloadPhoto(Path, setPhotoURL);
    };

    const setPhotoURL = (url) => {
        setUserInfo({ ...userInfo, photoURL: url })
    };

    const setUID = (uid) => {
        setUserInfo({ ...userInfo, uid: uid })
    };

    useEffect(() => {
    }, [userInfo])

    useEffect(() => {
        APIController.observeAuthState((user) => {
            if (user) {
                setUID(user.uid);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    return {
        isLoggedIn,
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL,
        userID: userInfo.uid,
        signup,
        login,
        signout,
        updateDisplayName,
        photoSave,
        loginWGoogle,
    };
}

export default useAuth;