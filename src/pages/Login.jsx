import {useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {FaEye} from 'react-icons/fa'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { app } from '../firebase.config'
import {toast} from 'react-toastify'


function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const {email, password} = formData

    const onChange = (e)=>{
        setFormData((prevState)=>{
            return {
                ...prevState,
                [e.target.id]:e.target.value
            }
        })
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        try{
            const auth = getAuth(app)
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            if(userCredentials.user){
                navigate('/main')
            }

        }catch(error){
            console.log(error)
            toast.error('Please provide valid credentials!')
        }
    }
    
    
    return (
        <div className="login">
            <div className="loginHeader">ANIME MAZE</div>
            <form onSubmit={onSubmit}>
                <div className="loginformTitle">Login</div>
                <div className="form-grp">
                    <label htmlFor="email" className="emailLabel">Email Id &nbsp;: &nbsp;</label>
                    <input type="email" id="email" name="email"value={email} onChange={onChange}/>
                </div>
                <div className="form-grp passwordGrp">
                    <label htmlFor="password" className="passwordLabel">Password : </label>
                    <input type={showPassword ? 'text': 'password'} id="password" 
                    name="password" value={password} onChange={onChange}/>
                    <div className='showPassword' 
                        onClick={()=>setShowPassword((prevState)=>!prevState)}>
                         <FaEye/>
                    </div>
                </div>
                <div className="form-grp">
                <button type='submit' className='btn submit-btn'>Submit</button>

                </div>
            </form>

            <div className="registerDiv">Don't Have an account? <Link to="/register" className='registerLink'>Register</Link></div>

        </div>
    )
}

export default Login
