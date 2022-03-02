import './Profile.css'
import Btn from '../../UIKit/Elements/Btn/Btn';

const Profile = ({ userName, setUserName, handleSave, setUpdatedUserName }) => {
    const handleClick = () => {
        setUpdatedUserName('');
        setUserName('');
    }
    return (
        <div className="profile">
            <div>Profile</div>
            <form onSubmit={handleSave} className='form'>
                <label>User Name</label>
                <input
                    onClick={handleClick}
                    value={userName}
                    onChange={(e) => { setUserName(e.target.value) }}
                />
                <div>
                    <Btn>Save</Btn>
                </div>
            </form>
        </div>
    );
}

export default Profile;