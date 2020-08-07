import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from './firebase'

export interface IndexProps {

}

const Index: React.SFC<IndexProps> = () => {
  const [user, setUser] = useState({});


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        setUser(user)
        // console.log('user', user);
      } else {
        console.log('error user is not logged in');
        setUser({})
      }
    });
    return () => unsubscribe();
  })

  return (
      <App user={user} />
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
