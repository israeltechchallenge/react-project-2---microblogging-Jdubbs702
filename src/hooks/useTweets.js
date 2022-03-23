import { useState, useEffect, useContext } from "react";
import APIController from "../config/FirebaseController";
import { AuthContext } from '../contexts/AuthContext';

//const uid = () => { Math.random().toString(16).slice(2); }

const useTweets = () => {

    const [tweets, setTweets] = useState([]);
    const {displayName, photoURL} = useContext(AuthContext);
    
    const getTweetsFromServer = async () => {
        const tweetsList = await APIController.getAllTweets();
        setTweets(tweetsList);
    }

    const addNewTweet = async (content) => {
        await APIController.addNewTweet({
            content,
            displayName: displayName,
            date: new Date().toISOString(),
            photoURL: photoURL,
        });
        return true;
    };

    useEffect(() => {
        getTweetsFromServer();
        const unsubscribe = APIController.observeTweets((tweetslist) => {
            setTweets(tweetslist);
        });
        return unsubscribe;
     }, []);

     useEffect(() => { 
        window.localStorage.setItem('tweets', JSON.stringify(tweets));
     }, [tweets]);

    return {
        tweets, 
        addNewTweet,
    };
};
 
export default useTweets;