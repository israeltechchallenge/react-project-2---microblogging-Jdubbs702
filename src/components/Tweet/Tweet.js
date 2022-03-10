import './Tweet.css'

const Tweet = ({ user, text, date }) => {
    return (
        <div className="tweet">
            <div className="line">
                <div>{user}</div>
                <div>{date}</div>
            </div>
            <div className='text'>{text}</div>
        </div>
    );
}

export default Tweet;