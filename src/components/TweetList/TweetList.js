import Tweet from '../Tweet/Tweet';
import './TweetList.css';
import { useContext, useState } from 'react';
import { TweetsContext } from '../../contexts/TweetsContext';
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

const TweetList = () => {
    const { tweets, scrollDown, isEmpty } = useContext(TweetsContext);
    const [isLoading, setIsLoading] = useState(false);

    const downHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await scrollDown();
        setIsLoading(false);
    };

    return (
        <>
            <ReactScrollWheelHandler downHandler={downHandler} >
                <div className="TweetList">
                {tweets.map((tweet) => (
                    <Tweet key={tweet.date} {...tweet} />
                ))}
                </div>
            </ReactScrollWheelHandler>
            {isLoading && <div style={{ color: '#CCCCCC' }}>Loading...</div>}
            {isEmpty && <div style={{ color: '#CCCCCC' }}>Nothing to see here..</div>}
        </>
    );
}
export default TweetList;
