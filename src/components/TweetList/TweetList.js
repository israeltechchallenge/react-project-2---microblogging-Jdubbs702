import Tweet from '../Tweet/Tweet';
import './TweetList.css';
import { useContext } from 'react';
import { TweetsContext } from '../../contexts/TweetsContext';
import {AuthContext} from '../../contexts/AuthContext'

const TweetList = () => {
    const { tweets } = useContext(TweetsContext);
    return (
        <div className="TweetList">
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </div> 
    );
}
export default TweetList;

// const TweetList = ({onScroll}) => {
//     const { listOfTweets } = useContext(TweetsContext);
//     const handleScroll = onScroll;
//     const tweetsArray = listOfTweets.slice(0);
//     return (
//         <div onScroll={handleScroll} className="TweetList">
//             {tweetsArray.map((tweet) => (
//                 <Tweet key={tweet.date} user={tweet.userName} text={tweet.content} date={tweet.date} />
//             ))}
//         </div>
//     );
// }

// export default TweetList;