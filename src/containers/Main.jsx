import React, { useEffect } from 'react'
import { setSubscription } from './subscriptionActions';
import fetchData from '../funtions/fetchData'
import { SubscriptionUrl } from '../funtions/config'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ThemedSuspense from '../components/ThemedSuspense';


function Main({ children }) {
  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.subscription.subscription);

  useEffect(() => {
    // Realizar la llamada GET a la API aquí
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `jwt ${localStorage.getItem('Token')}`,
      org: localStorage.getItem('org')
    }

    fetchData(`${SubscriptionUrl}/`, "GET", null, headers).then(data => {
      if(!data.error){
        dispatch(setSubscription(data.data))
      } else {
        localStorage.clear()
        return <Redirect to='/login/'></Redirect>
      }
    }).catch(e => console.error(e))

  }, [dispatch]);
  
  return (
    <main className="h-full overflow-y-auto">
      <div className="container grid px-6 mx-auto">
        {subscription ? children : <ThemedSuspense/>}
      </div>
    </main>
  )
}

export default Main
