import { Outlet } from "react-router-dom"

function HomeLayout() {
  return (
    <div>
        <h1>HomeLayout</h1>
        <Outlet />
    </div>
  )
}

export default HomeLayout