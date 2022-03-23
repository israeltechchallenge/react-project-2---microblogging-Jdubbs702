import { useContext, useState } from 'react';
import { TweetsContext } from '../../contexts/TweetsContext';
import './Tweet.css'

const Tweet = ({ id, displayName, content, date, photoURL }) => {
    //const {deleteTweetById} = useContext(TweetsContext);
    // const [isLoading, setIsLoading] = useState(false);

    // const handleDelete = async () => { 
    //     setIsLoading(true);
    //     await deleteTweetById(id);
    //  }
    
    return (
        <div className="tweet">
            <div className="line">
                <div className='line2'>
                    <img src={photoURL} className='thumbnail'></img>
                    <div className='username'>{displayName}</div>
                </div>
                <div>{date}</div>
            </div>
            <div className='text'>{content}</div>
        </div>
    );
}

export default Tweet;