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

    const signout = async () => {
        await APIController.signout();
    };

    const updateDisplayName = async (newName) => {
        await APIController.updateDisplayName(newName);
        setUserName(newName);
    };

    const setUserName = (user) => {
        setUserInfo({...userInfo, displayName: user })
    };

    const photoSave = async (imageFile) => {
        const thumbNailName = imageFile.name;
        const Path = `thumbnails/${userInfo.uid}/${thumbNailName}`
        await APIController.uploadPhoto(Path, imageFile);
        await APIController.downloadPhoto(Path, setPhotoURL);
        console.log(userInfo);
    };

    const setPhotoURL = (url) => {
        setUserInfo({...userInfo, photoURL: url })
    };

    const setUID = (uid) => {
        setUserInfo({...userInfo, uid:uid})
    };

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

    useEffect(() => {
        APIController.observeAuthState((user) => {
            if(user){
                console.log(user);
                setUID(user.uid);
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        });
    }, []);

    return {
        isLoggedIn,
        displayName: userInfo.displayName,
        photoURL: userInfo.photoURL,
        uid: userInfo.uid,
        signup,
        login,
        signout,
        updateDisplayName, 
        photoSave,
    };
}
 
export default useAuth;