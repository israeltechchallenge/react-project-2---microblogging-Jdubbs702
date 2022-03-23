import './Login.css'
import { useContext, useState } from "react";
import Btn from '../../UIKit/Elements/Btn/Btn';
import { AuthContext } from '../../contexts/AuthContext';

const LogIn = () => {
    const {login} = useContext(AuthContext);
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        email:'',
        password:''
    });
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e) => {
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

    const emailClick = () => {setInputs({...inputs, email:''}); setError('');}
    const passwordClick = () => {setInputs({...inputs, password:''}); setError('');}

    return (
        <div className="login">
            <div>Login</div>
            <form onSubmit={handleSubmit} className='login-form'>
                <label className='login-label1'>Email</label>
                <input className='login-input1'
                    onClick={emailClick}
                    name='email'
                    value={inputs.email}
                    onChange={(e) => setInputs({...inputs, email: e.target.value})}
                />
                <label className='login-label2'>Password</label>
                <input className='login-input2'
                    onClick={passwordClick}
                    name='password'
                    value={inputs.password}
                    onChange={(e) => setInputs({...inputs, password: e.target.value})}
                />
                <div className='login-footer'>
                    <div>
                        {isPending && <div className='login-loader' style={{ color: '#CCCCCC' }}>Loading...</div>}
                        {error && <div className='login-message' >{error}</div>}
                    </div>
                    <div>
                        <Btn>Login</Btn>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default LogIn;