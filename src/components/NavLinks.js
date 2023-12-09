import links from "../utils/links"
import { NavLink } from "react-router-dom"


function NavLinks({toggleSidebar}) {
  return (
    <div className="nav-links">
            {links.map(link=>{
              const {id, text, icon, path} = link;
              return <NavLink to={path} key={id} onClick={toggleSidebar}
              className={({isActive})=> isActive?'nav-link active' :'nav-link'}>
              <span className="icon">{icon}</span> {text}
              </NavLink>
            })}
          </div>
  )
}

export default NavLinks