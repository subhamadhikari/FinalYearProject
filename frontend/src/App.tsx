import React,{useState,useEffect} from 'react';
import Register from './pages/Register.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Route, Routes,BrowserRouter as Router } from 'react-router-dom';
// import './App.css';
import PageTitle from './components/PageTitle.tsx';
import Home from './pages/Home.tsx';
import DefaultLayout from './components/DashboardLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Visualization from './pages/Visualization.tsx';
import Segmentation from './pages/Segmentation.tsx';
import NoMatch from './pages/NoMatch.tsx';
import Login from './pages/Login.tsx';
import ProtectedRoutes from './components/ProtectedRoutes.tsx';
import PatientDashboard from './pages/PatientDashboard.tsx';
import TumorAnalysis from './pages/TumorAnalysis.tsx';
import { AuthUser } from './types/user.ts';
import { getCurrentUser } from './api/auth.tsx';

import { useSelector } from 'react-redux';


const App: React.FC = () => {

  // const {predictedSegmentation,isLoading,isError} = useSelector((state:any) => state.makeSegmentation)

  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async() => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setLoading(false);
    }
    getUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner/component
  }
  
  return (
    <Provider store={store}>
    <Router>
      {/* <Routes>
          <Route
          path='/register'
          element={<Register/>}/> */}

          {/* <Route path='/dashboard'> */}
            {/* <DefaultLayout> */}
              <Routes>
                {/* <DefaultLayout> */}
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/' index element={<Home/>}/>
                  <Route path='/login' element= {
                    <>
                    <PageTitle title='Login Page'/>
                    <Login/>
                    </>
                  }/>

                  <Route
                        path='/dashboard'
                        element={
                          <>
                          <ProtectedRoutes isAllowed={user?.email!== undefined && user.role=='1'} redirectedPath='/login'>
                            <PageTitle title="Doctor's Dashboard" />
                            <DefaultLayout userRole={user?.role}>
                              <Dashboard doctorID={user?.id}/>
                            </DefaultLayout>
                          </ProtectedRoutes>
                          </>
                        }
                      />
                  <Route
                        path='/patient-dashboard'
                        element={
                          <>
                          <ProtectedRoutes isAllowed={user?.email!== undefined && user.role=='2'} redirectedPath='/login'>
                            <PageTitle title="Doctor's Dashboard" />
                            <DefaultLayout userRole={user?.role}>
                              {user && <PatientDashboard user={user}/>}
                            </DefaultLayout>
                          </ProtectedRoutes>
                          </>
                        }
                      />
                  <Route
                    path="/mri-visualization"
                    element={
                      <>
                      <ProtectedRoutes isAllowed={user?.email!== undefined && user.role=='1'} redirectedPath='/login'>
                        <PageTitle title="Visualize MRI Scan" />
                        <DefaultLayout userRole={user?.role}>
                          <Visualization/>
                        </DefaultLayout>
                      </ProtectedRoutes>
                      </>
                    }
                  />
                  <Route
                    path="/tumor-analysis"
                    element={
                      <>
                      <ProtectedRoutes isAllowed={user?.email!== undefined && user.role=='1'} redirectedPath='/login'>
                        <PageTitle title="Analyze the Tumor" />
                        <DefaultLayout userRole={user?.role}>
                          <TumorAnalysis/>
                        </DefaultLayout>
                      </ProtectedRoutes>
                      </>
                    }
                  />
                  <Route
                    path="/mri-visualization/:mri_name"
                    element={
                      <>
                      <ProtectedRoutes isAllowed={user?.email!== undefined && user.role=='1'} redirectedPath='/login'>
                        <PageTitle title="Visualize MRI Scan" />
                        <DefaultLayout userRole={user?.role}>
                          <Visualization/>
                        </DefaultLayout>
                      </ProtectedRoutes>
                      </>
                    }
                  />
                  <Route
                    path="/mri-segmentation"
                    element={
                      <>
                      <ProtectedRoutes isAllowed={user?.email!== undefined && user.role=='1'} redirectedPath='/login'>
                        <PageTitle title="Segment the MRI Scan" />
                        <DefaultLayout userRole={user?.role}>
                          <Segmentation user={user}/>
                        </DefaultLayout>
                      </ProtectedRoutes>
                      </>
                    }
                  />
                  <Route path={`*`} element={<NoMatch/>}/>   
                {/* </DefaultLayout> */}
              </Routes>
        {/* </DefaultLayout> */}
        {/* </Route> */}

        {/* <Route path={`*`}
        element={<NoMatch/>}
        />   
      </Routes> */}
    </Router>
    </Provider>
  );
};

export default App;
