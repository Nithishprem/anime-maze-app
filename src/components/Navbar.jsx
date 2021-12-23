import {Link} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import {getAuth} from 'firebase/auth'

function Navbar() {
    const auth = getAuth()
    const userName = auth.currentUser.displayName
    
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/main" className='navHeaderLink'>
                <h1 className="navTitle">ANIME MAZE</h1>
                </Link>
                <div className="navMenu">
                    <div className="navMenuName">Hi, {userName}</div>
                    <FaUserCircle className="navMenuProfile"/>
                </div>
            </div>
        </div>
    )
}

export default Navbar
