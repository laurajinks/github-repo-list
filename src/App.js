import React, {useReducer, createContext} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Home from './components/Home'
import {reducer, initialState} from './store/index'
import {ToastContainer} from 'react-toastify'
import './tailwind.output.css'
import 'react-toastify/dist/ReactToastify.css'

export const AuthContext = createContext()

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      <Layout>
      <ToastContainer />
        <Router>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App;
