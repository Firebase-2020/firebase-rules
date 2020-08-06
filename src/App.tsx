import React, { useState } from 'react';
import firebase from './firebase';

import './App.css';

export interface AppProps {
}


const App: React.SFC<AppProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);

  const handleName = (event: React.SyntheticEvent<EventTarget>) => {
    setName((event.target as HTMLInputElement).value)
  }

  const handleEmail = (event: React.SyntheticEvent<EventTarget>) => {
    // console.log((event.target as HTMLInputElement).value);
    setEmail((event.target as HTMLInputElement).value)
  }
  const handlePassword = (event: React.SyntheticEvent<EventTarget>) => {
    setPassword((event.target as HTMLInputElement).value)
  }

  const handleSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    // Check if form is valid
    if (true) {
      // Reset errors and set loading to true
      if (login) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(singedInUser => {
            console.log("singedInUser", singedInUser);
            // set loading to false
          })
          .catch(err => {
            console.error(err);
            // set errors
            // set loading to false
          });
      } else {
        // Reset errors and set loading to true
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((createdUser: any) => {
            if (createdUser !== null) {
              createdUser.user
                .updateProfile({
                  displayName: name,

                })
                .then(() => {
                  // console.log("createdUser", { createdUser });
                  saveUser(createdUser).then(() => {
                    console.log("User saved!");
                  })
                  // set loading to false
                })
                .catch((err: any) => {
                  console.error("err", err);
                  // set errors
                  // set loading to false
                });
            }
          })
          .catch(err => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
              console.log('User alrady in use');

            }

            // set errors
            // set loading to false
          });
      }


    }
  };

  const saveUser = (createdUser: any) => {
    return firebase.database().ref("users").child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      email: createdUser.user.email
    });
  };

  return (
    <div className='containter' >
      <h2>{login ? 'Login' : 'Sign up'} </h2>
      <button
        type="button"
        className="login-button"
        onClick={() => setLogin(prev => !prev)}
      >
        {login ? "need to create an account?" : "already have an account"}
      </button>
      <form onSubmit={handleSubmit}>
        {!login && (
          <input
            value={name}
            onChange={handleName}
            type="text"
            placeholder="Your name"
            autoComplete="off"
            style={{ marginRight: 10 }}
          />
        )}
        <input onChange={handleEmail} type="email" value={email} placeholder='Your email' className='email' id='email' autoComplete="off" style={{ marginRight: 10 }} />
        <input onChange={handlePassword} type="password" value={password} placeholder='Your password' className='password' autoComplete="off" />
        <div className="actions">
          <button
            type="submit"
            className="submit_button"
            style={{ background: "orange" }}
          >
            Submit
          </button>

        </div>
      </form>
    </div>);
}



export default App;
