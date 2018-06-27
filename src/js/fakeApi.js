const fakeData = {
    user: {
        _id: "12345",
        username: "fakeUser",
        skillset: ["One", "Two", "Three"],
        avatar: "https://picsum.photos/50"
    }, 
    projects: [{"_id":"5a65fd8a3d77f50004decf51","repoUrl":"http://www.ideaswatch.com/startup-idea/fake-at-party-app","status":"I have the idea, but I haven't started coding it yet.","description":"This app creates background noises (e.g. traffic, loud music, people in a party chatting) when you are calling. This is useful when you're ex is calling, so you can pretend you're busy having fun!","owner":"5a6247110173f1000448b79d","title":"Noisr","__v":8,"users":[{"_id":"5a6247110173f1000448b79d","status":"owner"},{"_id":"5a9bfa90b2631921458268d7","status":"following"}],"img":["NA"],"stack":["Java","Swift"],"categories":["Mobile App"]},{"_id":"5a66116211a5c72408a19281","repoUrl":"NA","status":"It's just an idea","description":"Find coworkers in your area to commute with.","owner":"5a6247110173f1000448b79d","title":"CommuteWithMe","__v":12,"users":[{"_id":"5a6247110173f1000448b79d","status":"owner"},{"_id":"5a9bfa90b2631921458268d7","status":"following"},{"_id":"5a7b8c2b128e880004cb2dbf","status":"following"}],"img":[],"stack":["React Native"],"categories":["Mobile App"]},{"_id":"5a7b8d82128e880004cb2dc0","repoUrl":"https://github.com/chingu-coders/Voyage2-Turtles-02","status":"Currently complete but we are currently working on V2 which would include a faster DevTab and more features. (Created by Dan Nguyen, Jeff Bothe, Tyler Del Rosario)\nDevTab is a Chingu Project","description":"An awesome new-tab extension designed for Developers","owner":"","title":"DevTab","__v":10,"users":[{"_id":"5a7b8c2b128e880004cb2dbf","status":"owner"}],"img":[],"stack":["HTML","CSS","JS","jQuery","jQuery UI"],"categories":["New-Tab Extension"]},{"_id":"5a7b8eb9128e880004cb2dc1","repoUrl":"https://github.com/chingu-voyage3/bears-06","status":"BearBnB is a completed Chingu Project :D(Created by Vannya, Stephan, Lee)\n ","description":"An open-source clone of AirBnB.","title":"BearBnB","__v":11,"users":[{"_id":"5a6247110173f1000448b79d","status":"owner"},{"_id":"5a6055120f25ffaa290471fd","status":"following"}],"img":[],"stack":["MERN Stack","Mongo","Express","ReactJS","Node"],"categories":["App Clone"]},{"_id":"5ad5b3a8cdc05a3a50119f28","repoUrl":"http://","status":"Stuck","description":"The most generic project ever","title":"Yet another project","__v":1,"users":[{"_id":"5a9a9139ab060929303bded4","status":"owner"},{"_id":"5af4874738973100045687d3","status":"following"}],"img":[],"stack":["Mern"],"categories":["Web app"]},{"_id":"5af4879838973100045687d4","repoUrl":"http","status":"begin","description":"ever project best","title":"bookface","__v":0,"users":[{"_id":"5af4874738973100045687d3","status":"owner"}],"img":[],"stack":[],"categories":["Web app"]},{"_id":"5a660fbb11a5c72408a1927f","repoUrl":"http://www.ideaswatch.com/startup-idea/rifflord","status":"Idea found on IdeasWatch - never started","description":"Find and connect with musicians around you and form your band. On RiffLord you can upload a sample of your music and browse through musicians living around your area.","title":"RiffLord","__v":2,"users":[{"_id":"5a6247110173f1000448b79d","status":"owner"},{"_id":"5a9bfa90b2631921458268d7","status":"following"},{"_id":"5b074a9f2a1ccc0004510e38","status":"following"}],"img":[],"stack":["TBD"],"categories":["Social Network"]},{"_id":"5a663627d1a0785a64e8b6e3","repoUrl":"http://github.com","status":"Just an idea. Looking for devs to build it!","description":"This is a social network for unsociable people. It will text you when someone you DON'T want to meet is nearby.","title":"UnSocial Network","__v":1,"users":[{"_id":"5a6247110173f1000448b79d","status":"owner"},{"_id":"5a9bfa90b2631921458268d7","status":"following"}],"img":["https://cdn.images.express.co.uk/img/dynamic/80/590x/Grumpy-Cat-on-bed-544409.jpg"],"stack":["HTML","CSS","JavaScript"],"categories":["Web App"]},{"_id":"5a660f1f11a5c72408a1927e","repoUrl":"https://bitbucket.org/AlexGherardelli/evergreen","status":"I got stuck because I could not figure out how to post things on behalf of users with Flask and the Twitter API. I would love to have a more expert developer helping me with this project!","description":"Evergreen is a social media management app that allows you to reschedule your best and most effective posts over and over again, to maximize engagement and exposure. For example, you can schedule a \"Happy New Year\" post and never worry ever again to post it again. Or you can resend the invitation to an event multiple times at different times, so that people in different time zones can see your post.","title":"Evergreen","__v":4,"users":[{"_id":"5a6247110173f1000448b79d","status":"owner"},{"_id":"5a9bfa90b2631921458268d7","status":"following"},{"_id":"5a6055120f25ffaa290471fd","status":"following"}],"img":[],"stack":["Flask (Python)","HTML","SCSS/SASS","JavaScript"],"categories":["Social media management"]},{"_id":"5a66109911a5c72408a19280","repoUrl":"https://bitbucket.org/AlexGherardelli/dickens","status":"I have the boilerplate, but I would like a team mate to develop it.","description":"I have read online that with the time people spend on social media, they could read 200 books a year. With this scary stat in mind, I thought it would be nice to build a browser extension that every time you connect to a social media like Facebook, it redirects you toward a short story that can be read in a few minutes. A more productive break indeed!","owner":"5a6247110173f1000448b79d","title":"Dickens","__v":14,"users":[{"_id":"5a6247110173f1000448b79d","status":"owner"},{"_id":"5a9bfa90b2631921458268d7","status":"following"},{"_id":"5acadeeffcadd708d6d029d6","status":"following"}],"img":["https://i2-prod.mirror.co.uk/incoming/article5418983.ece/ALTERNATES/s615/Charles-Dickens.jpg"],"stack":[],"categories":["Browser Extension"]}]
};

const fakeApi = {
  // Retrieve all projects from server
  getAllProjects(next) {
    // get projects from api
    console.log('FAKE get all projects url');
    next({data: fakeData.projects});
  },
  // Retrieve one project by ID
  getProjectById(projects, projectId, next) {
    console.log('FAKE get project by ID');
    next({data: fakeData.projects[0]});
  },
  // Get logged in user data from api and assign it to state
  getCurrentUser(next) {
    console.log('FAKE get currentUser');
    next({data: fakeData.user});
  },
  // get user data from api
  getUserById(id, next) {
    console.log('FAKE get user by ID');
    next({data: fakeData.user});
  },

  // Updates user data 
  postUser(data, next) {
    console.log('FAKE postUser');
    next({data: "FAKE postUser"});
  },

  // creates new project or updates a project
  postProject(data, next) {
    console.log('FAKE postProject');
    next({data: "FAKE postProject"});
  },
  // delete project
  deleteProject(data, next) {
    console.log('FAKE deleteProject');
    next({data: "FAKE deleteProject"});
  },
  // delete user
  deleteUser(id, next) {
    console.log('FAKE deleteUser');
    next({data: "FAKE deleteUser Success"});
  }
};

export default fakeApi;