
## Setup

Please create a `.env` in the root directory. It should contain:
```
PORT=<database server port number (optional)>
MONGODB_URI=<MongoDB URI>
REACT_APP_APIURL=<Heroku deployed api URL>
GITHUB_CLIENT_ID=<GitHub App ID>
GITHUB_CLIENT_SECRET=<GitHub App Secret>
```

## How to run the database server for development work

*Run the React development server, for frontend development*

Run `npm start` from the root directory. This will start the React development server, and should automatically open the live app in the browser. 

NOTE: this will connect the app to the database server on Heroku. It will live update any changes to the frontend (`/src` and `/public`), but changes to the server-side files will not be reflected until the Heroku deployment is updated. The Heroku deployment is monitoring the `bears-20/dev` branch, so soon after the changes are pushed to that branch, Heroku should update.

*Run the database server locally, for backend development*

In the root directory, run `npm run start-server`. This loads up the *server.js* and runs the server at the port specified in *.env* file. (Should be 3001)

NOTE: the client side will be served from the `/build` directory. Changes to files in `/src` or `/public` directories will not update until you run `npm run build`.

## Backend Function

This server connects the client side to the MongoDB database.

The client side program can send a request using [HTTP Request](https://www.w3schools.com/tags/ref_httpmethods.asp). This server will then talk to the database to perform the requested task, then usually send some kind of a response to the client side.

Example requests:

1. Get all the stored data documents (for the client side to render)
2. Add a new document to database
3. Replace an existing document with a new one
4. Delete an existing document

## Code Structure

**Backend**
*server.js* -  All the main functions of the server is contained here. Receiving the HTTP Request, routing it to the correct function which performs the appropriate database task, and send back the response back to client side.

*/model* - This folder contains javascripts, each containing a mongoose Schema which defines the template of database documents. 

**Frontend**
*/build* - The production build files, once you run `npm run build`, goes here. 

*/public* - The development version of static files are here.

*/src* - The javascript files for development version. `index.js` gets loaded first.

Also, please create a *.env* file in the root directory, for each local copy of the repository. This file will contain the environment variables. They are the "secret" variables like keys, passwords, etc that should not be visible to the users, so it should not be uploaded to GitHub. (It is uploaded for now. Once everyone has their local git copy, I will delete it)

*.env* should contain the following:
```
PORT = <API Port Number>
MONGODB_URI = <MongoDB URI>
REACT_APP_APIURL = <API URL for Heroku Deployment>
```

## Server Communication Scheme

*The server is not updated with these schemas and routes yet! But this is the proposal of how it'll work once it's running.*  
This contains all the information needed on the client side in order to talk to the server, and it should be updated continuously to let everyone know if something changed!

**API URL**  
Heroku:  https://bears-20-dev.herokuapp.com/api
Local: http://localhost:3001/api

The app will automatically choose Local if local node server is running, or otherwise switch to the Heroku deployed version.

**Schema**
```
Project
{
    id: String,
    title: String,        //title of the project
    owner: String,        //username of the creator 
    description: String,  //project description
    status: String,       //status of project, why it's stuck
    repoUrl: String,      //GitHub repo URL
    img: [String]         //image URLs of screenshots
}
```

```
User
{
    id: String,
    username: String,     //username
    displayName: String,  //display name
    avatar: String,       //avatar image URL, can be empty
    skillset: [String],   //array of strings, like "React" and "Nodejs"
    email: String         //email address
}
```

**Routes**  
Get list of all Projects
>request: GET to `/projects/`  
>send: nothing  
>receive: array of json documents

Get Post by ID
>request: POST to `/projects/:project_id`  
>send: nothing  
>receive: json document of Project

Create new Project
>request: POST to `/projects/`  
>send: full Post object except id (id automattically assign)  
>receive: { message: String }

Update Project
>request: PUT to `/projects/:project_id`  
>send: full Project object  
>receive: { message: String }

Get User profile by ID
>request: GET to `/users/:user_id`  
>send: nothing  
>receive: json document of User

Create new User
>request: POST to `/users/`  
>send: full User object except id (id automatically assign)  
>receive: { message: String }

Update User by ID
>request: PUT to `/users/:user_id`  
>send: full User object  
>receive: { message: String }

## Backend To-do

**MVP Version**

| User story | Server Tasks |
|---|---|
| view a list of help wanted posts on main page | 1, 2  |
| click on any of the listings to view the details page | 1, 2, 3 |
| view any user profiles (with limited access) | 4, 5, 6, 7, 8 |
| login with my email **(GitHub right?)** to access any of the help seeker/helper functionalities | 6, 7, 8 |
| as an authenticated user, I can create and view my profile with name, image, skillset and contact details | 6, 7, 8, 9 |
| as an authenticated user, I can create a post to describe my coding project and ask for help to complete it. I can include description, status, repository link and images of the project | 6, 7, 10, 11 |
| as an authenticated user, I contact help seeker through his/her contact details | 6, 7, 8, 11* |
*(Optional) If we want to keep track of who contacted about a project, we can include a list of users in Post documents. 


Tasks:  

1. Create a Schema for help wanted posts (Project)
    * id (string), description (string), status (string), repoLink (string), img (arr of strings)
2. Get list of all Projects
3. Get Project post by ID
4. Create a Schema for user profile (User)
    * id (string), username (string), displayName (string), avatar (img url in string), skillset (arr of strings), email (string)
5. Get User by ID
6. GitHub auth: Create new User
7. GitHub auth: Login existing user
8. Filter functionality access by a "isLoggedIn" fuction
9. Find and update User by ID
10. Create new Project
11. Find and update Post by ID

**Version 2**

| User story | Version |  
|---|---|
| I can login with my email: e.g. Google, Facebook | TBD |
| I can login with other methods: e.g. Google, Facebook | TBD |
| As an authenticated user, I can leave comments on posts | TBD |
| As a help seeker, I can reward helpers with points | TBD |
| As a helper, I can click on a button and commit to help | TBD |
| I get a notification when someone comments on one of my "help wanted" projects or commits to help | TBD |
| As an authenticated user, I can bookmark projects | TBD |
| All the projects where I helped are showed on my profile, along with my reward points | TBD |
