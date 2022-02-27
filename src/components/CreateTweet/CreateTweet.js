import './CreateTweet.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';


const CreateTweet = ({ handleAddTweet }) => {
    const [userName, setUserName] = useState('');
    const [tweetText, setTweetText] = useState('');

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [footerBetween, setFooterBetween] = useState(null);

    const handleTextAreaChange = (e) => {
        if (tweetText.length < 140) {
            setTweetText(e.target.value);
            setBtnDisabled(false);
            setFooterBetween(null)
        } else {
            setTweetText(e.target.value);
            setBtnDisabled(true);
            const footerBetween = { justifyContent: 'space-between' }
            setFooterBetween(footerBetween)
        }
    }
    const handleAdd = () => {
        if (tweetText.trim().length > 0) {
            handleAddTweet(tweetText, userName);
            setUserName('');
            setTweetText('');
        }
    }

    return (
        <div className="CreateTweet">
            <TextareaAutosize
                placeholder="Something you wanna say?"
                value={tweetText}
                onChange={handleTextAreaChange}
            ></TextareaAutosize>
            <div className='tweet-footer' style={footerBetween}>
                {btnDisabled && <div className='message'>The tweet can't contain more than 140 chars.</div>}
                <button onClick={handleAdd} disabled={btnDisabled} className="add-button">Tweet</button>
            </div>
        </div>
    );
}

export default CreateTweet;