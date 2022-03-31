import { useState, useEffect, useContext } from "react";
import APIController from "../config/FirebaseController";
import { AuthContext } from '../contexts/AuthContext';

//const uid = () => { Math.random().toString(16).slice(2); }

const useTweets = () => {

    const [tweets, setTweets] = useState([]);
    const [isEmpty, setIsEmpty] = useState(null);
    const [lastDoc, setLastDoc] = useState(null);
    const { displayName, photoURL, userID } = useContext(AuthContext);

    const getTweetsFromServer = async () => {
        const tweetsList = await APIController.getTweets(setIsEmpty, setLastDoc);
        setTweets(tweetsList);
    };

    const scrollDown = async () => {
        const tweetsList = await APIController.fetchMore(setIsEmpty, setLastDoc, lastDoc);
        setTweets([...tweets, ...tweetsList]);
    }

    const addNewTweet = async (content) => {
        await APIController.addNewTweet({
            content,
            displayName: displayName,
            date: new Date().toISOString(),
            photoURL: photoURL,
            userID: userID,
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

    return {
        tweets,
        addNewTweet,
        scrollDown,
        isEmpty,
    };
};

export default useTweets;

    // useEffect(() => {
    //     window.localStorage.setItem('tweets', JSON.stringify(tweets));
    // }, [tweets]);