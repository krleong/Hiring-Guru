import React, {/*Component,*/ useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './HiringGuru.css';
import About from './pages/About/About';
import Landing from './pages/Landing/Landing';
import JobPosts from './pages/JobPosts/JobPosts';
import Pricing from './pages/Pricing/Pricing';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateCompany from './pages/CreateCompany/CreateCompany';
import FreeTrial from './pages/FreeTrial/FreeTrial';
import CreateJob from './pages/CreateJob/CreateJob';
import ApplyForJob from './pages/ApplyForJob/ApplyForJob';
import Member from './components/Member/Member';
import NavBar from './components/NavBar/NavBar.js';
import Footer from './components/Footer/Footer.js';
import Tagline from './components/Tagline/Tagline.js';
import JobApps from './pages/JobApps/JobApps';
import RecruitmentProcess from "./pages/RecruitmentProcess/RecruitmentProcess";
import { Dialog } from "./components/Dialog/Dialog";
import {ManageRoles} from "./pages/ManageRoles/ManageRoles";

export const ApplicationContext = React.createContext();

function HiringGuru() {
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
              <Tagline></Tagline>
              <NavBar></NavBar>
            </div>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/jobs' element={<JobPosts />} />
              <Route path='/pricing' element={<Pricing />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/dashboard/*' element={<Dashboard />} />
              <Route path='/create-company' element={<CreateCompany />} />
              <Route path='/free-trial' element={<FreeTrial />} />
              <Route path='/create-job' element={<CreateJob />} />
              <Route path='/recruitment-process' element={<RecruitmentProcess />} />
              <Route path='/manage-roles' element={<ManageRoles />} />
              <Route path='/job-apply' element={<ApplyForJob />} />
              <Route path='/about/members/:index/detail' element={<Member />} />
            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </ApplicationContext.Provider>
    </Router>
  );
}

export default HiringGuru;