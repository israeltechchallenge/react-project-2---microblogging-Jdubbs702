import './Tweet.css'

const Tweet = ({ id, user, text, date }) => {
    return (
        <div className="tweet" key={id}>
            <div className="line">
                <div>{user}</div>
                <div>{date}</div>
            </div>
            <div className='text'>{text}</div>
        </div>
    );
}

export default Tweet;