import { Logo, FormRow } from "../components"
import Wrapper from '../assets/wrappers/RegisterPage'
import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../features/users/userSlice"
import { useNavigate } from "react-router-dom"
const initialState = {
    name:'',
    email:'',
    password:'',
    isMember:true
}
function Register() {
    const {user, isLoading} = useSelector((state)=> state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState(initialState);
    const handleOnChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setValues({...values, [name]:value})

    }
    const handleSubmit = (e)=>{
        e.preventDefault();
       const {name, email, password, isMember} = values;
       if(!email|| !password || (!isMember && !name)){
        toast.error("Please fill out all fields");
        return;
       }
       if(isMember){
        dispatch(loginUser({email:email, password:password}));
        return;
       }

        dispatch(registerUser({name, email, password}))


    }

const toggleIsMember = () =>{
    setValues({...values, isMember:!values.isMember})
}
useEffect(()=>{
    if(user){
        setTimeout(()=>{
            navigate('/')
        }, 2000);
    };
}, [user]);

  return (
    <Wrapper className='full-page'>
        <form className="form" onSubmit={handleSubmit}>
            <Logo/>
            { values.isMember?<h3>Login</h3>: <h3>Register</h3>}
           {!values.isMember && <FormRow type='text' label='Name' name='name' value={values.name || ''} onChange={handleOnChange} />}
            <FormRow type='email' label='Email' name='email' value={values.email || ''} onChange={handleOnChange} />
            <FormRow type='password' label='Password' name='password' value={values.password || ''} onChange={handleOnChange} />


            <button type="submit"  className="btn btn-block" disabled={isLoading} >
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
            <p>
                {values.isMember ? "Not a member yet" :"Already a member"}
                <button className="member-btn" onClick={toggleIsMember}>
                    {values.isMember ? "Register" :"Login"}
                </button>
            </p>
        </form>
    </Wrapper>
  )
}

export default Register