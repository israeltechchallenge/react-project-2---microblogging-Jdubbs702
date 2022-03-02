import './CreateTweet.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useContext} from 'react';
import { TweetsContext } from '../../contexts/TweetsContext';
import Btn from '../../UIKit/Elements/Btn/Btn';

const CreateTweet = ({isUser}) => {
    const { content, setContent, handleSubmit } = useContext(TweetsContext);

    const styleFooter = { justifyContent: 'space-between' }
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [footerStyle, setfooterStyle] = useState(null);
    const [noUser, setNoUser] = useState(false);

    const handleTextAreaChange = (e) => {
        setContent(e.target.value);
        if (content.length > 140) {
            setBtnDisabled(true);
            setfooterStyle(styleFooter);
        } else if (!isUser){
            setNoUser(true);
            setfooterStyle(styleFooter);
            setContent('');
        }else {  
            setBtnDisabled(false);
            setfooterStyle(null)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="CreateTweet">
            <TextareaAutosize
                placeholder="Something you wanna say?"
                value={content}
                onChange={handleTextAreaChange}
            ></TextareaAutosize>
            <div className='tweet-footer' style={footerStyle}>
                {noUser ? <div className='message'>Please select Username in Profile.</div> : ''}
                {btnDisabled && <div className='message'>The tweet can't contain more than 140 chars.</div>}
                <Btn disabled={btnDisabled} className="add-button">Tweet</Btn>
            </div>
        </form>
    );
}

export default CreateTweet;