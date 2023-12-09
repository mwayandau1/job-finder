import { Link } from "react-router-dom"
import svg from '../assets/images/not-found.svg'
import Wrapper from "../assets/wrappers/ErrorPage"
function Error() {
  return (
    <Wrapper className="full-page">
        <div>
        <img src={svg} alt="Not Found" />
        <h3>Page Not Found</h3>
        <p>Sorry, We couldn't find the page you are looking for</p>
        <Link to='/' className="btn btn-hipster" >Back Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error