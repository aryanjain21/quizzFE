import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Rules from './components/rules/Rules'
import Quiz from './components/quiz/Quiz'
import Score from './components/score/Score'
import Scoreboard from './components/scoreboard/Scoreboard'
import WorldScoreBoard from './components/worldScoreBoard/WorldScoreBoard'
import Category from './components/category/Category'
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import { Toaster } from 'react-hot-toast';
import './config/AxiosConfig'
import './App.css';

function App() {
  return (
    <div className="App">
       <Toaster
        position='top-right'
        toastOptions={{
          duration:1500
        }}
      />

      <Navbar />
    
      <Switch>
        <Route path='/' component={Home} exact></Route>
        <Route path='/home' component={Home} exact></Route>
        <Route path='/signup' component={Signup} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/select/category' component={Category} exact/>
        <Route path='/world/scoreboard' component={WorldScoreBoard} exact></Route>
        <PrivateRoute path='/rules' component={Rules} exact ></PrivateRoute>
        <PrivateRoute path='/quiz' component={Quiz}></PrivateRoute>
        <PrivateRoute path='/score' component={Score} exact ></PrivateRoute>
        <PrivateRoute path='/scoreboard' component={Scoreboard} exact ></PrivateRoute>
      </Switch>


    </div>
  );
}

export default App;
