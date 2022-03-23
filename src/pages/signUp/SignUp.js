import './SignUp.css';
import { useState } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import Btn from '../../UIKit/Elements/Btn/Btn';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { signup } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        signup(inputs.email, inputs.password).then((user) => {
            setIsPending(false);
            setError('')
        }).catch((e) => {
            setIsPending(false);
            setError(e.message)
        })
    }

    const emailClick = () => { setInputs({ ...inputs, email: '' }); setError(''); }
    const passwordClick = () => { setInputs({ ...inputs, password: '' }); setError(''); }

    return (
        <div className="signup">
            <div>Signup</div>
            <form onSubmit={handleSubmit} className='signup-form'>
                <label className='signup-label1'>Email</label>
                <input className='signup-input1'
                    onClick={emailClick}
                    name='email'
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
                <label className='signup-label2'>Password</label>
                <input className='signup-input2'
                    onClick={passwordClick}
                    name='password'
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <div className='signup-footer'>
                    <div>
                        {isPending && <div className='signup-loader' style={{ color: '#CCCCCC' }}>Loading...</div>}
                        {error && <div className='signup-message' >{error}</div>}
                    </div>
                    <div>
                        <Btn>Login</Btn>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;