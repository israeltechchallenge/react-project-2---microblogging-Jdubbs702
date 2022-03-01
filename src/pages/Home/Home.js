import './Home.css'
import { useState, useEffect } from "react";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import TweetList from "../../components/TweetList/TweetList";
import axios from 'axios';
import { nanoid } from 'nanoid';
import moment from 'moment';

const url = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

const TweetsContainer = ({ userName }) => {
    const [tweets, setTweets] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const handleAddTweet = (content) => {
        const newTweet = {
            id: nanoid(),
            content: content,
            userName: userName,
            date: new Date().toISOString()
        }
        axios.post(url, newTweet);

        const newTweets = [newTweet, ...tweets];
        setTweets(newTweets);
    }

    useEffect(() => {
    }, [tweets])

    useEffect(() => {
        fetchTweets();
    }, [])

    const fetchTweets = () => {
        axios.get(url)
            .then(res => {
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
        <div className="Home">
            <CreateTweet handleAddTweet={handleAddTweet} />
            {error && <div style={{ color: '#CCCCCC' }}>{error}</div>}
            {isPending && <div style={{ color: '#CCCCCC' }}>Loading...</div>}
            {tweets && <TweetList tweets={tweets} />}
        </div>
    );
}

export default TweetsContainer;