import './TweetsContainer.css'
import { useState, useEffect } from "react";
import CreateTweet from "../CreateTweet/CreateTweet";
import TweetList from "../TweetList/TweetList";
import { Grid } from '../../UIKit';
import localforage from "localforage";
import moment from 'moment';
import { nanoid } from 'nanoid';


const TweetsContainer = () => {
    const [tweets, setTweets] = useState([
    ]);

    const handleAddTweet = (text, user) => {
        const currentDateTime = moment().format('ddd MMM Do, HH:mm A')

        const newTweet = {
            id: nanoid(),
            user: user,
            text: text,
            date: `${currentDateTime}`
        }
        const newTweets = [...tweets, newTweet];
        setTweets(newTweets)
    }

    useEffect(() => {
        localforage.setItem("tweets-app", tweets).then(() => {
            console.log("used localForage");
        });
    }, [tweets])

    useEffect(() => {
        localforage.getItem("tweets-app").then(val => {
            console.log("got: ", val);
            if (val) {
                setTweets(val)
            }
        });
    }, [])

    return (
        <div className="TweetsContainer">       
                <CreateTweet handleAddTweet={handleAddTweet} />
                <TweetList tweets={tweets} />         
        </div>
    );
}

export default TweetsContainer;