import './Tweet.css'

const Tweet = ({ displayName, content, date, photoURL }) => {

    return (
        <div className="tweet">
            <div className="line">
                <div className='line2'>
                    <img src={photoURL} className='thumbnail' alt=''></img>
                    <div className='username'>{displayName}</div>
                </div>
                <div>{date}</div>
            </div>
            <div className='text'>{content}</div>
        </div>
    );
}

export default Tweet;