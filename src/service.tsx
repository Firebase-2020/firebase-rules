import React, { useState, useEffect, useCallback } from 'react';

import firebase from './firebase';
import './App.css';

export interface ServiceProps {
  userName: any,
  userEmail: any,
  userId: any
}

const Service: React.SFC<ServiceProps> = ({ userName, userEmail, userId }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [changeName, setChangeName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [usersRef] = useState<any>(firebase.database().ref().child('users'));

  const handleName = (event: React.SyntheticEvent<EventTarget>) => {
    setName((event.target as HTMLInputElement).value)
  }
  const handleEmail = (event: React.SyntheticEvent<EventTarget>) => {
    setEmail((event.target as HTMLInputElement).value)
  }
  const handlePassword = (event: React.SyntheticEvent<EventTarget>) => {
    setPassword((event.target as HTMLInputElement).value)
  }

  const handleChangeName = (event: React.SyntheticEvent<EventTarget>) => {
    setChangeName((event.target as HTMLInputElement).value)
  }

  const saveUser = (createdUser: any) => {
    return firebase.database().ref("users").child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      email: createdUser.user.email,
      role: admin ? 'admin' : 'user',
      id: createdUser.user.uid
    });
  };

  const getUserRole = useCallback(() => {
    return users.length > 0 && users.map((user: any) => {
      for (const key in user) {
        if (userId === user[key].id) {
          console.log(user[key].role);
          setUserRole(user[key].role)
          return user[key].role
        }
      }
      return true;
    })
  }, [setUserRole, users, userId])

  useEffect(() => {
    getUserRole()
  }, [getUserRole])

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
  }, [usersRef, getUsers,])

  const editUser = async (userId: string) => {
    setLoading(true)
    try {
      if (changeName.length > 0) {
        window.location.reload(false);
        await usersRef.child(userId).update({ name: changeName });
        // admin cannot change the name in other user's firebase-profile.
        // Just only in users database, in Realtime Database.
        if ((userRole === 'admin' && userId === '49HG4u2qXmPgluFKyGh9xYzhK2r1') ||
          userRole === 'user') {
          const user: any = firebase.auth().currentUser;
          user.updateProfile({
            displayName: changeName
          })
        }
        setLoading(false)
      } else {
        setLoading(false)
        alert('Please write a name with at least 1 character.')
      }
    } catch (err) {
      setLoading(false)
      console.error(err);
      alert("PERMISSION_DENIED - You are not allowed to edit other user's profile.")
    }
  }

  const displayUsers = (users: any) => {
    return users.length > 0 && users.map((userObj: any) => {
      const usersArray = []
      for (const key in userObj) {
        usersArray.push(userObj[key])
      }

      return usersArray.map((user: any) =>
        <tr key={user.id} style={{ margin: 20 }}>
          <td style={{ margin: 20 }} >{user.name}
            <button onClick={() => editUser(user.id)} style={{ margin: 10 }}>
              apply here new name
          </button>
          </td>
        </tr>
      )
    })
  }

  const handleSubmit = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    setIsSubmitting(true)
    // Check if form is valid
    if (true) {
      // Reset errors and set loading to true
      setLoading(true)
      if (login) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
          setLoading(false)
          setIsSubmitting(false)
          setEmail('')
          setPassword('')
          getUsers();
          displayUsers(users);
          getUserRole();
          setEmail('');
          setPassword('');

        } catch (err) {
          console.error(err);
          // set errors
          // set loading to false
          setIsSubmitting(false)
        }
      } else {
        try {
          // Reset errors and set loading to true
          setLoading(true)

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
              getUsers()
              displayUsers(users);
              getUserRole()
              setLoading(false)

              setIsSubmitting(false)
              setEmail('');
              setPassword('');
            } catch (err) {
              console.error("err", err);
              // set errors
              setLoading(false)
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


  const logout = async () => {
    await firebase.auth().signOut();
    setUsers([])

  }

  const showInfo = () => {
    alert(`
* Admin can change every user's name, but only in 'users' database,
in Realtime Database.
* Admin can change only their own name in Firebase-profile.
* Users may change only their own name, both in their Firebase-profile,
as in Realtime Database.
* Permission is denied for normal users to change other user's name.
`)
  }

  if (loading) {
    return (
      <div className='container' >
        <h1 >Loading...</h1>
      </div>
    )
  }

  return (
    <div className='container' >
      {/* Action buttons */}
      {!userEmail && <div>
        {!login ? <h2>Sign up as {admin ? 'admin' : 'user'}</h2> :
          <h2>Login</h2>}
        <button
          type="button"
          className="login-button"
          onClick={() => setLogin(prev => !prev)}
          style={{ marginRight: 10 }}
        >
          {login ? "need to create an account?" : "already have an account"}
        </button>
        {!login && <button
          type="button"
          className="admin-button"
          onClick={() => setAdmin(prev => !prev)}
          style={{ marginRight: 10 }}
        >
          {admin ? "change to user" : "change to admin"}
        </button>}
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
      </div>}
      {users.length > 0 && <button
        type="button"
        className="logout-button"
        onClick={logout}
      >
        Logout
      </button>}

      {/* Curent User info */}
      {users.length > 0 && (
        <div >
          <h4> Current User:   </h4>
          <ul style={{ margin: 10 }}>
            <li>
              Name: {userName},
          </li>
            <li>
              Email:  {userEmail},
          </li>
            <li>
              Role: {userRole}
            </li>
          </ul>
        </div>
      )}
      {users.length > 0 && <div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <h4> Users:   </h4>
          <button onClick={showInfo} style={{ height: 20, margin: 10 }} >info</button>
        </div>
        <input
          value={changeName}
          onChange={handleChangeName}
          type="text"
          placeholder="Write new name"
          autoComplete="off"
          style={{ margin: 10 }}
        />
      </div>}
      {displayUsers(users)}
    </div>);
}



export default Service;
