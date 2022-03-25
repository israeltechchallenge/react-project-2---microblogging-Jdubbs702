import './Profile.css'
import Btn from '../../UIKit/Elements/Btn/Btn';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
    const [input, setInput] = useState('');
    const { displayName, updateDisplayName, photoURL, photoSave } = useContext(AuthContext);
    const [user, setUser] = useState(displayName);
    const [imageFile, setImageFile] = useState();
    const [photo, setPhoto] = useState(photoURL);
    const [placeholder, setPlaceholder] = useState('Set Username');
    const [btnState, setBtnState] = useState('Save');

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDisplayName(input);
    }
    const handleInputClick = () => {
        setPlaceholder('')
    }
    const handleFileSelect = async (e) => {
        e.preventDefault();
        setImageFile(e.target.files[0])
    }
    const handlePhotoSave = async (e) => {
        e.preventDefault();
        setBtnState('Wait...');
        await photoSave(imageFile);
        setBtnState('Save');
    }
    useEffect(() => {
        setPhoto(photoURL)
    }, [btnState, photoURL])


    return (
        <div className="profile">
            <div>Profile</div>
            <form onSubmit={handleSubmit} className='form'>
                <label className='label'>Current User: {photo && <img src={photo} className='avatar' alt=''></img>}{`   ${user}`}</label>
                <div className="input-container">
                    <input className='input-username' onClick={handleInputClick} onChange={(e) => {
                        setInput(e.target.value)
                        setUser(e.target.value)
                    }} value={input} placeholder={placeholder} />
                    <Btn>Save</Btn>
                </div>
            </form>
            <form onSubmit={handlePhotoSave} className='photo-form'>
                <div className='container-left'>
                    <label className=''>Upload Profile Photo:</label>
                    <div>
                        <input
                            className='dir'
                            type="file"
                            onChange={handleFileSelect}
                        />
                    </div>
                </div>
                <Btn>{btnState}</Btn>
            </form>
        </div>
    );
}
export default Profile;