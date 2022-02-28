import Tweet from '../Tweet/Tweet';
import './TweetList.css'

const TweetList = ({ tweets }) => {
    const tweetsArray = tweets.slice(0);
    return (
        <div className="TweetList">
            {tweetsArray.map((tweet) => (
                <Tweet key={tweet.id} user={tweet.userName} text={tweet.content} date={tweet.date} />
            ))}
        </div>
    );
}

export default TweetList;