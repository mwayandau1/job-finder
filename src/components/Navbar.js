import { FaHome, FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Navbar'
import Logo from './Logo'
import { useSelector, useDispatch } from 'react-redux'
import {toggleSidebar, logoutUser} from '../features/users/userSlice'
import { useState } from 'react'

function Navbar() {
    const {user} = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
        <div className='nav-center'>
            <button className='toggle-btn' type='button'
            onClick={()=>dispatch(toggleSidebar())}>
                <FaAlignLeft />
            </button>
        <div>
            <Logo />
            <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
            <button className='btn' type='button'
            onClick={()=>setShowLogout(!showLogout)} >
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={`dropdown ${showLogout ? 'show-dropdown': ''}` }>
                <button className='dropdown-btn' onClick={()=>dispatch(logoutUser())}>
                    logout
                </button>
            </div>
        </div>
        </div>
    </Wrapper>
  )
}

export default Navbar