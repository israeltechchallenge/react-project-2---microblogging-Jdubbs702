import './Login.css'
import { useContext, useState } from "react";
import Btn from '../../UIKit/Elements/Btn/Btn';
import { AuthContext } from '../../contexts/AuthContext';

const LogIn = () => {
    const { login, loginWGoogle } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [isPending, setIsPending] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        setError('');
        setIsPending(true);
        await login(inputs.email, inputs.password).then((user) => {
            setIsPending(false);
            setError('');
        }).catch((e) => {
            setIsPending(false);
            setError(e.message)
        })
    }
    const handleGoogClick = (e) => {
        e.preventDefault();
        loginWGoogle();
    }

    const emailClick = () => { setInputs({ ...inputs, email: '' }); setError(''); }
    const passwordClick = () => { setInputs({ ...inputs, password: '' }); setError(''); }

    return (
        <div className="login">
            <div>Login</div>
            <form  className='login-form'>
                <label className='login-label1'>Email</label>
                <input className='login-input1'
                    onClick={emailClick}
                    name='email'
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
                <label className='login-label2'>Password</label>
                <input className='login-input2'
                    onClick={passwordClick}
                    name='password'
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <div className='login-footer'>
                    <div>
                        {isPending && <div className='login-loader' style={{ color: '#CCCCCC' }}>Loading...</div>}
                        {error && <div className='login-message' >{error}</div>}
                    </div>
                    <div className='btns-container'>
                        <Btn onClick={handleClick}>Login</Btn>
                        <span className='' style={{ color: '#CCCCCC' }}>or</span>
                        <button className='goog-button' onClick={handleGoogClick}>Login w Google</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LogIn;