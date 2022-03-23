import './CreateTweet.css'
import TextareaAutosize from 'react-textarea-autosize';
import { useState, useContext, useEffect } from 'react';
import { TweetsContext } from '../../contexts/TweetsContext';
import Btn from '../../UIKit/Elements/Btn/Btn';
import { AuthContext } from '../../contexts/AuthContext';

const CreateTweet = () => {
    const { displayName, photoURL } = useContext(AuthContext);
    const { addNewTweet } = useContext(TweetsContext);
    const [content, setContent] = useState('');
    const [tooLong, setTooLong] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);

    useEffect(() => {
        !photoURL ? setBtnDisabled(true):setBtnDisabled(false);
    }, [photoURL]);
    useEffect(() => {
        !photoURL ? setBtnDisabled(true):setBtnDisabled(false);
    }, [photoURL]);

    const createTweetHandler = async (e) => {
        e.preventDefault();
        if (content.trim().length > 0) {
            await addNewTweet(content);
            setContent('');
        }
    }

    const handleTextAreaChange = (e) => {
        setContent(e.target.value);
        if (content.length > 140) {
            setTooLong(true);
        } else {
            setTooLong(false);
        }
    }

    return (
        <form onSubmit={createTweetHandler} className="CreateTweet">
            <TextareaAutosize
                placeholder="Something you wanna say?"
                value={content}
                onChange={handleTextAreaChange}
            ></TextareaAutosize>
            <div className='tweet-footer'>
                <div>
                    {!displayName ? <div className='create-message'>Please select Username in Profile.</div> : ''}
                    {!photoURL ? <div className='create-message'>Please select Photo in Profile.</div> : ''}
                    {tooLong && <div className='create-message'>The tweet can't contain more than 140 chars.</div>}
                </div>
                <div>
                    <Btn disabled={btnDisabled} className="add-button">Tweet</Btn>
                </div>
            </div>
        </form>
    );
}

export default CreateTweet;

// const CreateTweet = () => {
//     const { handleAddTweet } = useContext(TweetsContext);

//     const [content, setContent] = useState('');
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (content.trim().length > 0) {
//             handleAddTweet(content);
//         }
//         setContent('')
//     }

//     const styleFooter = { justifyContent: 'space-between' }
//     const [btnDisabled, setBtnDisabled] = useState(false);
//     const [footerStyle, setfooterStyle] = useState(null);

//     const handleTextAreaChange = (e) => {
//         setContent(e.target.value);
//         if (content.length > 140) {
//             setBtnDisabled(true);
//             setfooterStyle(styleFooter);
//         } else {
//             setBtnDisabled(false);
//             setfooterStyle(null)
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="CreateTweet">
//             <TextareaAutosize
//                 placeholder="Something you wanna say?"
//                 value={content}
//                 onChange={handleTextAreaChange}
//             ></TextareaAutosize>
//             <div className='tweet-footer' style={footerStyle}>
//                 {/* {noUser ? <div className='create-message'>Please select Username in Profile.</div> : ''} */}
//                 {btnDisabled && <div className='create-message'>The tweet can't contain more than 140 chars.</div>}
//                 <Btn disabled={btnDisabled} className="add-button">Tweet</Btn>
//             </div>
//         </form>
//     );
// }

// export default CreateTweet;