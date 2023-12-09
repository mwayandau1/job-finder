import {Landing,  Error, Register, ProtectedRoutes } from './pages'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Stats, AddJob, AllJobs, Profile, SharedLayout} from './pages/dashboard'


function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={
        <ProtectedRoutes>
          <SharedLayout/>
      </ProtectedRoutes>
      }>
        <Route index element={<Stats/>}/>
        <Route path='all-jobs' element={<AllJobs/>}/>
        <Route path='add-job' element={<AddJob/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
      <Route path='landing' element={<Landing/>}/>
      <Route path='register' element={<Register />}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
