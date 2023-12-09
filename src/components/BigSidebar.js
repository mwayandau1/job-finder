import Wrapper from "../assets/wrappers/BigSidebar"
import { useSelector } from "react-redux"
import NavLinks from "./NavLinks"
import Logo from "./Logo"
function BigSidebar() {
  const {isSidebarOpen} = useSelector((state)=>state.user)
  return (
    <Wrapper>
      <div className={` sidebar-container ${isSidebarOpen ? '':'show-sidebar'}`}>
      <div className="content">
        <header> <Logo /> </header>
      </div>
      <NavLinks />

      </div>

    </Wrapper>
  )
}

export default BigSidebar