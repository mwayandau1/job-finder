import { useEffect, useState } from "react"
import Job from "./Job"
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import { getAllJobs } from "../features/job/allJobs/allJobsSlice";
function JobsContainer() {
    const {jobs, isLoading} = useSelector((state)=>state.allJobs)
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getAllJobs());
    }, [])
    if(isLoading){
        return <Loading center={true} />
    }
    if(jobs.length === 0){
        return <Wrapper>There are not jobs...</Wrapper>
    }
  return (
    <Wrapper>
      <h5>Jobs Info</h5>
      <div className="jobs">
        {jobs.map(job=>{
          return <Job key={job._id} {...job} />
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer