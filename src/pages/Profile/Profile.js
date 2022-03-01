import './Profile.css'
import Btn from '../../UIKit/Elements/Btn/Btn'

const Profile = ({ userName, setUserName, handleSave }) => {
    const handleOnChange = (e) => {
        setUserName(e.target.value)
    }

    return (
        <div className="profile">
            <div>Profile</div>
            <form onSubmit={handleSave} className='form'>
                <label>User Name</label>
                <input
                    //onClick={handleClick}
                    value={userName}
                    onChange={handleOnChange}
                />
                <div>
                    <Btn>Save</Btn>
                </div>
            </form>
        </div>
    );
}

export default Profile;