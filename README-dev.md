
## Setup

Please create a `.env` in the root directory. It should contain:
```
PORT=<database server port number (optional)>
MONGODB_URI=<MongoDB URI>
REACT_APP_APIURL=<Heroku deployed api URL (optional)>
GITHUB_CLIENT_ID=<GitHub App ID>
GITHUB_CLIENT_SECRET=<GitHub App Secret>
```

## How to run the database server for development work

*Run the React development server, for frontend development*

Run `npm start` from the root directory. This will start the React development server, and should automatically open the live app in the browser. This method requires `REACT_APP_APIURL` variable in `.env`.

NOTE: this will connect the app to the database server on Heroku. It will live update any changes to the frontend (`/src` and `/public`), but changes to the server-side files will not be reflected until the Heroku deployment is updated.

*Run the database server locally, for backend development*

In the root directory, run `npm run start-server`. This loads up the *server.js* and runs the server at the port specified in *.env* file. (Should be 3001)

NOTE: the client side will be served from the `/build` directory. Changes to files in `/src` or `/public` directories will not update until you run `npm run build`.

## Backend Function

This server handles authentication of the user as well as all database related tasks.

Example requests:

1. Get all the stored data documents (for the client side to render)
2. Add a new document to database
3. Replace an existing document with a new one
4. Delete an existing document

## Code Structure

**Backend**
*`server.js`* -  Main backend script which initializes the server. It also takes care of connecting to database, loading api routes, etc.

*`/config`* - This folder contains the api routes script as well as authentication-related scripts.

*`/model`* - This folder contains scripts, each containing a mongoose Schema which defines the template of database documents. 

**Frontend**
*`/build`* - The production build files, once you run `npm run build`, goes here. 

*`/public`* - The development version of static files are here.

*`/src`* - The javascript files for development version. `index.js` gets loaded first.

Also, please create a *.env* file in the root directory, for each local copy of the repository. This file will contain the environment variables. They are the "secret" variables like keys, passwords, etc that should not be visible to the users, so it should not be uploaded to GitHub.

Currently, *.env* needs to contain the following:
```
PORT = <API Port Number>
MONGODB_URI = <MongoDB URI>
REACT_APP_APIURL = <Optional. Add the API URL for Heroku Deployment here, to bypass the local backend and use Heroku backend instead>
GITHUB_CLIENT_ID = <GitHub OAuth App ID>
GITHUB_CLIENT_SECRET = <GitHub OAuth App Secret>
```

## Server Communication Scheme

**API URL**  
Heroku:  https://bithelper.herokuapp.com/api
Local: http://localhost:3001/api (Port # depends on what you put in `.env`)

If `REACT_APP_APIURL` exists, that URL will be used for all api calls instead of the local server. This is useful for when working on frontend. This allows you to use the create-react-app development environment with live-update.

**Schema**
```
Project
{
    id: String,
    title: String,        //title of the project
    owner: String,        //username of the creator 
    category: String,     //category of the project
    description: String,  //project description
    stack: [String],      //array of technologies used in the project
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
    email: String         //email address,
    projects: [String]    //array of project IDs that this user has created
}
```

**Routes**  
Get list of all Projects
>request: GET to `/projects/`  
>send: nothing  
>receive: array of json documents

Create new Project
>request: POST to `/projects/`  
>send: full Post object except id (id automattically assign)  
>receive: { message: String }

Get Project by ID
>request: GET to `/projects/:project_id`  
>send: nothing  
>receive: json document of Project

Update Project
>request: PUT to `/projects/:project_id`  
>send: updated Project object  
>receive: { message: String }

Delete Project
>request: DELETE to `/projects/:project_id`  
>send: nothing
>receive: { message: String }

Retrieve all user data
>request: GET to `/users/`  
>send: nothing
>receive: Array of all user objects

Create new User
>request: POST to `/users/`  
>send: full User object except id (id automatically assign)  
>receive: { message: String }

Get User profile by ID
>request: GET to `/users/:user_id`  
>send: nothing  
>receive: User object (if found)

Update User by ID
>request: PUT to `/users/:user_id`  
>send: full User object  
>receive: { message: String }

Delete User by ID
>request: Delete to `/users/:user_id`  
>send: nothing
>receive: { message: String }