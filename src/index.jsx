import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import App from './App.jsx'
import SidebarProvider from './context/SidebarContext.jsx'
import ThemedSuspense from './components/ThemedSuspense.jsx'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker'
import theme from './theme'

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill theme={theme} usePreferences>
        <App />
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

