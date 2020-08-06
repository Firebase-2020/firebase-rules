import React, { useState } from 'react';
import './App.css';

export interface AppProps {

}


const App: React.SFC<AppProps> = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleEmail = (event: React.SyntheticEvent<EventTarget>) => {
    console.log((event.target as HTMLInputElement).value);
    
    if (!!email) {
      setEmail((event.target as HTMLInputElement).value)
    }
  }
  const handlePassword = (event: React.SyntheticEvent<EventTarget>) => {
    if (!!password) {
      setPassword((event.target as HTMLInputElement).value)
    }
  }

  handleSubmit = (event) => {
   
  };

  return (
    <div className='containter' >
      <form onClick={handleSubmit}>
        <input onChange={handleEmail} value={email} placeholder='email' className='email' id='email' style={{ marginRight: 10 }} />
        <input onChange={handlePassword} value={password} placeholder='password' className='password' />
      </form>
    </div>);
}



export default App;
