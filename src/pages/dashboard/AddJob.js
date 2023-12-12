import { useDispatch, useSelector } from "react-redux"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import {toast} from 'react-toastify'
import { FormRow, FormSelectInput } from "../../components"
import { clearValues, createJob, handleChange, editJob } from "../../features/job/jobSlice"
import { useEffect } from "react"
function AddJob() {
  const dispatch = useDispatch();
  const {editJobId,isLoading, position, company, jobLocation,jobTypeOptions,
    jobType, statusOptions, status, isEditing } =
    useSelector((state)=>state.job)
  // GET USER LOCATION
  const {user} = useSelector((state)=>state.user)

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(!position || !company || !jobLocation){
        toast.error("Please fill out all fields")
      }
      if(isEditing){
        dispatch(editJob({
          jobId:editJobId,
          job:{
            position, company, jobLocation,jobType, status
          }
        }))
        return;
      }
      dispatch(createJob({position, company, jobLocation, jobType, status}))
    }

    useEffect(()=>{
      if(!isEditing){
      dispatch(handleChange({
        name:'jobLocation', value:user.location
      }))}
    })
    const handleInputJob = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      dispatch(handleChange({name, value}))
      console.log(name)
      console.log(value)
    }
 return (
    <Wrapper>
      <form className="form" >
        <h2>{isEditing ? "Edit job" : "Add job"}</h2>
        <div className="form-center">
          <FormRow type='text' name='position'
          value={position} label="Position" onChange={handleInputJob} />
          <FormRow type='text' name='company'
          value={company} label="Company" onChange={handleInputJob} />
          <FormRow type='text' name='jobLocation'
          value={jobLocation} label="Job Location" onChange={handleInputJob} />


          <FormSelectInput list={statusOptions} value={status} name='status' handleChange={handleInputJob}
          label='Status'/>
          <FormSelectInput list={jobTypeOptions} value={jobType} label='Job Type' name='jobType'
           handleChange={handleInputJob}/>
          <div className="btn-container">
          <button type="button" className="btn btn-block clear-btn"
          onClick={()=>dispatch(clearValues())}>Clear</button>
            <button type="submit" className="btn btn-primary btn-block"
            onClick={handleSubmit} disabled={isLoading}>Submit</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob