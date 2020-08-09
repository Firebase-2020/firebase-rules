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
    - Sign up 2 new normal users (the admin is already there).
    - Last user tries to modify the name of all three, but only his own changes. Users sees every time a message, either PERMISSION_GRANTED or PERMISSION_DENIED.
    - Then we login as admin.
    - Admin modifies all three names.
    - Two normal users get deleted.


* Hosting URL: https://fir-rules-f324d.web.app
* For automation we installed also ts-node.
* To run test, type: "npm run auto" (see package.json).
* Note: To run "npm run build" you need to have this: "export {}" at the very top of automation.tsx, so ts will see it as a module. Then run firebase deploy. But, when you run "npm run auto" you need to comment it out, otherwise you get an error "Unespected token..."