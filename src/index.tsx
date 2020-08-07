import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from './firebase'

export interface IndexProps {

}

const Index: React.SFC<IndexProps> = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!!user) {
        console.log(user);
        
        const email: any = user.email
        const userId: any = user.uid
        const userName: any = user.displayName
        setUserEmail(email)
        setUserId(userId)
        setUserName(userName)
      } else {
        console.log('error user is not logged in');
      }
    });
    return () => unsubscribe();
  })
  return (

    <App userName={userName}  userEmail={userEmail} userId={userId} />
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
