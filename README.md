- All code to be written in Typescript.
- Create a Firebase test project
- Firebase config should provide for an admin role, a normal user role
- Create a Firebase service.ts (use async/await)
- Service should handle user signup
- Service should retrieve list of users (admin role only or error otherwise)
- In React (you can use create-react-app), table should display list of users.

Full journey:
1. Manually create an admin user in data
2. Normal user journey - user signs up
3. User is displayed in React table, viewed by admin role.
4. User can be edited by admin role (e.g. one column example, name)
5. User can edit and update themselves (e.g. name)
6. User CANNOT be edited by other users.
7. Implement an end-to-end test to ensure permissions are working correctly, e.g.  https://github.com/microsoft/playwright  

References
Realtime database rules: https://firebase.google.com/docs/database/security


* Current story of end-to-end test:
    * Note: When test starts, devtools will also be open. Please select 'console' in order to see the message 'PERMISSION_DENIED' from firebase.
    * Sign up 2 new normal users (admin is already there).
    * Last user tries to modify the name of all three, but only his own changes. User sees every time a message, either PERMISSION_GRANTED or PERMISSION_DENIED, which is a result of firebase rules. 
    * Then we login as admin.
    * Admin modifies all three names.
    * The two normal users login again and delete their accounts, one after the other. Now test is ready to run again.

* Firebase Rules explained:
    * Read access has every logged in user.
    * User has write access only if the logged in id is equal to the id of the database, in the 'users' directory.
    * Further write access is given if the id of the logged in user is equal to the one of the admin.

    ```js
        {
    "rules": {
        "users": {
            ".read": "auth.uid !== null",
            ".write": "'77BjL7t5IlYiyEECV1cjDG0qEDD2' === auth.uid",
        "$uid": {
            ".write": "$uid === auth.uid"
        }
        }
    }
    }
    ```

* Notes:
    * Hosting URL: https://fir-rules-f324d.web.app
    * For automation we installed also ts-node.
    * To run test, type: "npm run auto" (see package.json).
    * To run "npm run build" you need to have this: "export {}" at the very top of automation.tsx, so ts will see it as a module. Then run "firebase deploy". But, when you run "npm run auto" you need to comment it out, otherwise you get an error "Unespected token..."
    * On the screen user sees two buttons, 'delete user' and 'change admin name back to Admin'. These are just for automation reasons.
    * The password for all users is asdasd.
