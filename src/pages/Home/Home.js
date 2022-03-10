import './Home.css'
import { useState, useEffect } from "react";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import TweetList from "../../components/TweetList/TweetList";
import axios from 'axios';
import { TweetsContext } from '../../contexts/TweetsContext'

const url = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

const TweetsContainer = ({ userName }) => {
    const [tweets, setTweets] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const handleAddTweet = (content) => {
        if (userName) {
            const newTweet = {
                content: content,
                userName: userName,
                date: new Date().toISOString()
            }
            axios.post(url, newTweet);
        }
    }

    const fetchTweets = async () => {
        await axios.get(url)
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

    const updateTweets = async () => {
        await axios.get(url)
            .then(res => {
                if (!res.request.status === 200) {
                    throw Error('Could not get tweets');
                } else if (res.data.tweets !== tweets) {
                    setTweets(res.data.tweets);
                    setIsPending(false);
                    setError(null);
                }
            })
            .catch(e => {
                setIsPending(false);
                setError(e.message);
            })
    }

    useEffect(() => {

        fetchTweets();

        const interval = setInterval(() => {
            updateTweets();
        }, 9000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="Home">
            <TweetsContext.Provider value={{ handleAddTweet, tweets }}>
                <CreateTweet isUser={userName} />
                {tweets && <TweetList />}
            </TweetsContext.Provider>
            {error && <div style={{ color: '#CCCCCC' }}>{error}</div>}
            {isPending && <div style={{ color: '#CCCCCC' }}>Loading...</div>}
        </div>
    );
}

export default TweetsContainer;