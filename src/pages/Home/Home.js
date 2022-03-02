import './Home.css'
import { useState, useEffect } from "react";
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import TweetList from "../../components/TweetList/TweetList";
import axios from 'axios';
import { nanoid } from 'nanoid';
import { TweetsContext } from '../../contexts/TweetsContext'
import moment from 'moment';

const url = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

const TweetsContainer = ({ userName }) => {
    const [tweets, setTweets] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const handleAddTweet = (content) => {
        if(userName){
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
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchTweets();
        }, 2000);
        return () => clearInterval(interval);
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

    //↓↓↓ tweets and these items passed through context ↓↓↓//
    const [content, setContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim().length > 0) {
            handleAddTweet(content);
        }
        setContent('')
    }
    //↑↑↑ tweets and these items passed through context ↑↑↑//

    return (
        <div className="Home">
            <TweetsContext.Provider value={{ content, setContent, handleSubmit, tweets }}>
                <CreateTweet isUser={userName}/>
                {tweets && <TweetList />}
            </TweetsContext.Provider>
            {error && <div style={{ color: '#CCCCCC' }}>{error}</div>}
            {isPending && <div style={{ color: '#CCCCCC' }}>Loading...</div>}
        </div>
    );
}

export default TweetsContainer;