import React  from 'react';
import {createStore, applyMiddleware} from 'redux';
import history from './history';
import {Router,Switch,Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import Root from './componets/root';
import{fetchAuthenticated} from './actions/account';
import AccountDragons from './componets/AccountDragons';
import PublicDragons from './componets/PublicDragons';
import './index.css'







const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);




const AuthRoute = props=>{
  if(!store.getState().account.loggedIn){
      return <Redirect to ={{pathname:'/'}}/>
  }

  const{component,path} = props;
  return <Route path ={path} component = {component}/>
}


store.dispatch(fetchAuthenticated())
  .then(()=>{
     // inline html
      render(
            <Provider store = {store}>
               <Router history = {history}>
                   <Switch>
                       <Route  exact = {true } path = '/' component = {Root}/>
                       <AuthRoute path = '/AD' component = {AccountDragons}/> 
                       <AuthRoute path ='/public-dragons' component = {PublicDragons}/>
                   </Switch>
               </Router>
            </Provider>,

             document.getElementById('root')
       );
  })
  .ca;


