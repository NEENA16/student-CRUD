[(https://www.youtube.com/watch?v=DihOP19LQdg)]
- student CRUD + search - node, express, postgresql, and pure sql to query the db


login page
  - JWT [https://www.youtube.com/watch?v=7UQBMb8ZpuE] - only for authorization not    authentication 


to Start project
    - npm run starts  OR npm start


for authetication :
  - we can perform either by sending tokens directly or by setting cokkie
  - for token approach, see the [video](https://www.youtube.com/watch?v=7UQBMb8ZpuE)
  - for cookie approach, see the [video](https://www.youtube.com/watch?v=foL7tbTrS9E)
  - in middleware:   - authorization.js and validInfo for token approach
                     - authorize.js for cokkie approach
                     - valid info anothe middleware to check email in register,llogin is valis (a simple m/w for studyuing), can be use in cookie approach also
  - for cokkie method, everything is same, but add res.cookie(.....) in login controller end



cookie approach working

- on login, BE will send a access token and refresh token to FE and will set the refresh toke in the cookie
- FE will send the access token in the req header for all api requests (pass in header)
- BE will check wheather access token send by FE in req header with key 'Authorization' is valid (using m/w authorize), then only it will allow to access the protected routes
- once access token expires, FE will call the refresh token api with the refresh token in cookie (ie set during login by BE in cookie, no need to pass in header), it will genearate new access token and reresh token.
- once refresh token expires, it will automatically logout
