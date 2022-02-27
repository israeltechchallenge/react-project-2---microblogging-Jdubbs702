import Tweet from '../Tweet/Tweet';
import './TweetList.css'

const TweetList = ({ tweets }) => {
    const tweetsCopy = tweets.slice(0);
    return (
        <div className="TweetList">
            {tweetsCopy.reverse().map((tweet) => (
                <Tweet key={tweet.id} id={tweet.id} user={tweet.user} text={tweet.text} date={tweet.date} />
            ))}
        </div>
    );
}

export default TweetList;