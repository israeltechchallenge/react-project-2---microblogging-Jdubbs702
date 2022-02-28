import './CreateTweet.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';

const CreateTweet = ({ handleAddTweet }) => {
    const [userName, setUserName] = useState('Whitesnake');
    const [content, setTweetText] = useState('');

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [footerBetween, setFooterBetween] = useState(null);

    const handleTextAreaChange = (e) => {
        if (content.length < 140) {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim().length > 0) {
            handleAddTweet(content, userName);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="CreateTweet">
            <TextareaAutosize
                placeholder="Something you wanna say?"
                value={content}
                onChange={handleTextAreaChange}
            ></TextareaAutosize>
            <div className='tweet-footer' style={footerBetween}>
                {btnDisabled && <div className='message'>The tweet can't contain more than 140 chars.</div>}
                <button disabled={btnDisabled} className="add-button">Tweet</button>
            </div>
        </form>
    );
}

export default CreateTweet;