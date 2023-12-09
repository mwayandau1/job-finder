import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
function Landing() {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>job <span>tracking</span></h1>
                <p>I'm baby readymade synth literally pug jawn cornhole
                    tumblr activated charcoal venmo tbh beard keytar
                    taxidermy. Prism XOXO cold-pressed hot chicken crucifix
                     messenger bag chillwave chicharrones paleo direct trade
                     drinking vinegar adaptogen put a bird on it stumptown gentrify.
                      Chillwave fit chicharrones fashion axe, JOMO enamel pin af.
                       Cardigan four loko sustainable, big mood air plant
                       readymade jawn banh mi bespoke unicorn tousled venmo taiyaki.
                </p>
                <Link to='/register' className='btn btn-hero'>Log/Sigup</Link>
            </div>
            <img src={main} alt='Hero image' className='img main-img' />
        </div>
    </Wrapper>
  )
}

export default Landing