import './Home.css'
import CreateTweet from "../../components/CreateTweet/CreateTweet";
import TweetList from "../../components/TweetList/TweetList";
import { TweetsContext } from '../../contexts/TweetsContext';
import useTweets from '../../hooks/useTweets';

const TweetsContainer = () => {
    const tweetsHandler = useTweets();
    return (
        <div className="Home">
            <TweetsContext.Provider value={tweetsHandler}>
                <CreateTweet />
                <TweetList />
            </TweetsContext.Provider>
        </div>
    );
}
export default TweetsContainer;