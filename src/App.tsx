import React from 'react';
import './App.css';

import Service from './service'

export interface AppProps {
  userName: any,
  userEmail: any,
  userId: any
}

const App: React.SFC<AppProps> = ({ userName, userEmail, userId }) => {
  return (
    <Service userName={userName} userEmail={userEmail} userId={userId} />
  )
}



export default App;
