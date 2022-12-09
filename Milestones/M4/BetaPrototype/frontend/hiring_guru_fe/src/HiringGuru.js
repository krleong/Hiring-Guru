import React, {/*Component,*/ useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './HiringGuru.css';
import About from './pages/About/About';
import Landing from './pages/Landing/Landing';
// import JobPosts from './pages/JobPosts/JobPosts';
// import Pricing from './pages/Pricing/Pricing';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateCompany from './pages/CreateCompany/CreateCompany';
// import FreeTrial from './pages/FreeTrial/FreeTrial';
import { ManageJobs } from './pages/ManageJobs/ManageJobs';
import ApplyForJob from './pages/ApplyForJob/ApplyForJob';
import Member from './components/Member/Member';
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer.js';
import Tagline from './components/Tagline/Tagline.js';
import RecruitmentProcess from "./pages/RecruitmentProcess/RecruitmentProcess";
import { Dialog } from "./components/Dialog/Dialog";
import { ManageRoles } from "./pages/ManageRoles/ManageRoles";
import { useAuth0 } from '@auth0/auth0-react';

export const ApplicationContext = React.createContext();

function HiringGuru() {

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const [appState, setAppState] = useState({
    dialogState: {
      title: "",
      dialogOpen: false,
      actions: [],
      body: ""
    }
  })

  useEffect(() => {
    document.title = "Hiring Guru";
  }, []);

  const openDialog = (title, actions = [], body = "") => {
    setAppState({
      ...appState,
      dialogState: {
        ...appState.dialogState,
        dialogOpen: true,
        actions: actions,
        title: title,
        body: body
      }
    })
  }

  const closeDialog = () => {
    setAppState({
      ...appState,
      dialogState: {
        ...appState.dialogState,
        dialogOpen: false
      }
    })
  }

  return (
    <div>
      <Router>
        <Dialog
          show={appState.dialogState.dialogOpen}
          title={appState.dialogState.title}
          body={appState.dialogState.body}
          actions={appState.dialogState.actions.length === 0 ? [
            {
              title: "Close",
              handler: closeDialog,
              variant: "secondary"
            }
          ] : appState.dialogState.actions}
        ></Dialog>
        <ApplicationContext.Provider value={{
          openDialog: openDialog,
          closeDialog: closeDialog
        }}>
          <div>
            <div className="page-wrapper">
              <div className="sticky-top-follow">
                <Routes>
                  <Route path='/' element={<Tagline />} />
                </Routes>
                <NavBar></NavBar>
              </div>
              <Routes>
                <Route path='/' element={<Landing />} />
                {/* <Route path='/jobs' element={<JobPosts />} /> */}
                {/* <Route path='/pricing' element={<Pricing />} /> */}
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/about/members/:index/detail' element={<Member />} />
                {/* Route Protection */}
                {/*Wasn't working => now handled in invidivual pages */}
                {/* {isAuthenticated ? : */}
                <Route path='/dashboard/*' element={<Dashboard />} />
                <Route path='/create-company' element={<CreateCompany />} />
                <Route path='/create-job' element={<ManageJobs />} />
                <Route path='/recruitment-process' element={<RecruitmentProcess />} />
                <Route path='/manage-roles' element={<ManageRoles />} />
                <Route path='/job-apply' element={<ApplyForJob />} />
                {/* <Route path='/job-referral' element={<JobReferral />} />
                <Route path='/job-referral2' element={<JobReferral2 />} /> */}
                {/* <Route path='/dashboard/*' element={loginWithRedirect({
                    redirectUri: `${<Dashboard />}`
                  })} /> */}
              </Routes>
            </div>
          </div>
        </ApplicationContext.Provider>
      </Router><Footer></Footer>
    </div >

  );
}

export default HiringGuru;