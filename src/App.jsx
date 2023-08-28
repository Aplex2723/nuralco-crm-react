// import ReactDOM from 'react-dom';
// import axios from 'axios';
 import './index.css';

// function App() {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = () => {
//     axios.post('/api/login/', { username, password })
//       .then(response => {
//         console.log(response.data); // Maneja la respuesta del backend
//       })
//       .catch(error => {
//         console.error(error); // Maneja los errores de la solicitud
//       });
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-8 shadow-md rounded-md">
//         <h1 className="text-2xl font-bold mb-4">Login Page</h1>
//         <div className="mb-4">
//           <label className="block mb-2">Username:</label>
//           <input type="text" value={username} onChange={handleUsernameChange} className="border border-gray-300 rounded-md px-2 py-1" />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Password:</label>
//           <input type="password" value={password} onChange={handlePasswordChange} className="border border-gray-300 rounded-md px-2 py-1" />
//         </div>
//         <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
//       </div>
//     </div>
//   );
// }
import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

const store = createStore(rootReducer);

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/forgot-password" component={ForgotPassword} />

            {/* Place new routes over this */}
            <Route path="/app" component={Layout} />
            {/* If you have an index page, you can remothis Redirect */}
            <Redirect exact from="/" to="/login" />
          </Switch>
        </Router>
      </Provider> 
    </>
  )
}
export default App
