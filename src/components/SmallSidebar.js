import Wrapper from "../assets/wrappers/SmallSidebar"
import { useSelector, useDispatch } from "react-redux"
import { FaTimes } from "react-icons/fa"
import Logo from "./Logo"
import { toggleSidebar } from "../features/users/userSlice"
import NavLinks from "./NavLinks"

function SmallSidebar() {
  const {isSidebarOpen} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className={`sidebar-container ${isSidebarOpen ? 'show-sidebar':''}`}>
        <div className="content">
          <button className="close-btn" onClick={()=>dispatch(toggleSidebar())}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={()=>dispatch(toggleSidebar())}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar