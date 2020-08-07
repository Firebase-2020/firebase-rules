import React, { useState, useEffect, useCallback } from 'react';
import firebase from './firebase';

import './App.css';

export interface AppProps {
}

const App: React.SFC<AppProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [usersRef] = useState<any>(firebase.database().ref().child('users'));

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

  const saveUser = (createdUser: any) => {
    return firebase.database().ref("users").child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      email: createdUser.user.email,
      role: admin ? 'admin' : 'user',
      id: createdUser.user.uid
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setIsSubmitting(true)
    // Check if form is valid
    if (true) {
      // Reset errors and set loading to true
      if (login) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
          // set loading to false
          setIsSubmitting(false)

        } catch (err) {
          console.error(err);
          // set errors
          // set loading to false
          setIsSubmitting(false)
        }
      } else {
        try {
          // Reset errors and set loading to true
          const createdUser: any = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
          if (createdUser !== null) {
            console.log('createdUser', createdUser);
            try {
              await createdUser.user
                .updateProfile({
                  displayName: name
                })
              await saveUser(createdUser);
              console.log("User saved!");
              // set loading to false
              setIsSubmitting(false)

            } catch (err) {
              console.error("err", err);
              // set errors
              // set loading to false
              setIsSubmitting(false)
            }
          }
        } catch (err) {
          console.error(err);
          if (err.code === "auth/email-already-in-use") {
            console.log('Email already in use');
          }
          setIsSubmitting(false)
        }
      }
    };
  }

  const getUsers: () => void = useCallback(() => {
    const loadedUsers: any[] = []
    usersRef.on('value', (snap: any) => {
      loadedUsers.push(snap.val())
      setUsers(loadedUsers)
      console.log('loadedUsers', loadedUsers);
    })
  }, [setUsers, usersRef])

  useEffect(() => {
    getUsers();
    return () => usersRef.off();
  }, [usersRef, getUsers])

  const displayUsers = (users: any) => {
    console.log(users);
    return users.length > 0 && users.map((userObj: any) => {
      const users = []
      for (const key in userObj) {
        users.push(userObj[key])
      }
      return users.map((user: any) =>
        <li key={user.id}>
          {user.email}
        </li>
      )
    }
    )
  }

  return (
    <div className='containter' >
      <h2>{login ? 'Login' : 'Sign up'} as {admin ? 'admin' : 'user'}</h2>
      <button
        type="button"
        className="login-button"
        onClick={() => setLogin(prev => !prev)}
        style={{ marginRight: 10 }}
      >
        {login ? "need to create an account?" : "already have an account"}
      </button>
      <button
        type="button"
        className="admin-button"
        onClick={() => setAdmin(prev => !prev)}
      >
        {admin ? "change to user" : "change to admin"}
      </button>
      {/* The FORM */}
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
        <input
          onChange={handleEmail}
          type="email" value={email}
          placeholder='Your email'
          className='email' id='email'
          autoComplete="off"
          style={{ marginRight: 10 }} />
        <input
          onChange={handlePassword}
          type="password"
          value={password}
          placeholder='Your password'
          className='password'
          autoComplete="off" />
        <div className="actions">
          <button
            type="submit"
            className="submit_button"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
          >
            Submit
          </button>
        </div>
      </form>
      <ul>
        {displayUsers(users)}
      </ul>
    </div>);
}



export default App;
