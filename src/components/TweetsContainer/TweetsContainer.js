import './TweetsContainer.css'
import { useState, useEffect } from "react";
import CreateTweet from "../CreateTweet/CreateTweet";
import TweetList from "../TweetList/TweetList";
import axios from 'axios';
import moment from 'moment';
import { nanoid } from 'nanoid';

const url = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

const TweetsContainer = () => {
    const [tweets, setTweets] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const handleAddTweet = (content, userName) => {
        const newTweet = {
            content: content,
            userName: userName,
            date: new Date().toISOString()
        }
        axios.post(url, newTweet);

        const newTweets = [newTweet, ...tweets];
        setTweets(newTweets)
    }

    useEffect(() => {
    }, [tweets])

    useEffect(() => {
        fetchTweets();
    }, [])

    const fetchTweets = () => {
        axios.get(url)
            .then(res => {
                console.log(res)
                if (!res.request.status === 200) {
                    throw Error('Could not get tweets');
                }
                setTweets(res.data.tweets);
                setIsPending(false);
                setError(null);
            })
            .catch(e => {
                setIsPending(false);
                setError(e.message);
            })
    }


    return (
        <div className="TweetsContainer">
            <CreateTweet handleAddTweet={handleAddTweet} />
            {error && <div style={{ color: '#CCCCCC' }}>{error}</div>}
            {isPending && <div>Loading...</div>}
            {tweets && <TweetList tweets={tweets} />}
        </div>
    );
}

export default TweetsContainer;