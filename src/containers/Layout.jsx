import React, { useContext, Suspense, useEffect, lazy, useState } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from './Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'

import { useDispatch, useSelector } from 'react-redux';


const Page404 = lazy(() => import('../pages/404'))



function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isAuth') || false)
  const [haveOrg, setHaveOrg] = useState(localStorage.getItem('org') || false)
  const dispatch = useDispatch();

  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [location])

  // Add org verified
  if(!isLoggedIn || !haveOrg){
    localStorage.clear()
    return <Redirect to='/login/'></Redirect>
  }
    return (
      <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
      >
        <Sidebar />
        <div className="flex flex-col flex-1 w-full">
          <Header />
          <Main>
            <Suspense fallback={<ThemedSuspense />}>
              <Switch>
                {routes.map((route, i) => {
                  return route.component ? (
                    <Route
                      key={i}
                      exact={true}
                      path={`/app${route.path}`}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null
                })}
                <Redirect exact from="/app" to="/app/dashboard" />
                <Route component={Page404} />
              </Switch>
            </Suspense>
          </Main>
        </div> 
      </div> 
    )
  }


export default Layout
