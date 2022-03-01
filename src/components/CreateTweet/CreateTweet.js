import './CreateTweet.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import Btn from '../../UIKit/Elements/Btn/Btn'

const CreateTweet = ({ handleAddTweet }) => {
    const [content, setContent] = useState('');

    const [btnDisabled, setBtnDisabled] = useState(false);
    const [footerBetween, setFooterBetween] = useState(null);

    const handleTextAreaChange = (e) => {
        setContent(e.target.value);
        if (content.length < 140) {
            setBtnDisabled(false);
            setFooterBetween(null)
        } else {
            setContent(e.target.value);
            setBtnDisabled(true);
            const footerBetween = { justifyContent: 'space-between' }
            setFooterBetween(footerBetween)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim().length > 0) {
            handleAddTweet(content);
        }
        setContent('')
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
                <Btn disabled={btnDisabled} className="add-button">Tweet</Btn>
            </div>
        </form>
    );
}

export default CreateTweet;