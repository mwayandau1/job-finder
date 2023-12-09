import { Outlet } from "react-router-dom"
import { Navbar, BigSidebar, SmallSidebar } from "../../components"
import Wrapper from '../../assets/wrappers/SharedLayout'
function SharedLayout() {
  return (
    <Wrapper>
        <main className="dashboard">
            <SmallSidebar/>
            <BigSidebar/>

            <div>
                <Navbar/>
                </div>
                <div className="dashboard-page">
                <Outlet />
            </div>
        </main>
    </Wrapper>
  )
}

export default SharedLayout