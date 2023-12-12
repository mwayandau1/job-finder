import { useSelector, useDispatch } from "react-redux"
import {toast} from 'react-toastify';
import { useState } from "react";
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {FormRow} from '../../components'
import { updateUser } from "../../features/users/userSlice";
function Profile() {
  const {isLoading, user} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    name:user?.name || '',
    email:user?.email || '',
    lastName:user?.lastName || '',
    location:user?.location || ''
  });
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!userData.name || !userData.email || !userData.lastName || !userData.location ){
      toast.warn("Please fill out all fields!");
      return;
    }
    dispatch(updateUser(userData))
  }
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]:value})
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit} >
        <div className="form-center">
        <FormRow type='text' name='name' value={userData.name} label='Name' onChange={handleChange}/>
        <FormRow type='text' name='lastName' value={userData.lastName} label='Last Name' onChange={handleChange}/>

        <FormRow type='email' name='email' label='Email' value={userData.email} onChange={handleChange}/>
        <FormRow type='text' name='location' label='location' value={userData.location} onChange={handleChange}/>
            <button type="submit" className="btn btn-block" disabled={isLoading} >
              {isLoading ? "Please wait...":"Save changes"}
            </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile