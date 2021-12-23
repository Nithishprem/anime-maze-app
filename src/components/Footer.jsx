import {getAuth} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()
    const auth = getAuth()
    
    const onLogout = ()=>{
        auth.signOut()
        navigate('/')
    }
    
    
    return (
        <div className="footer">
            <div className="footerContainer">
                <button type="button" className="btn btnLogout" onClick={onLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Footer
