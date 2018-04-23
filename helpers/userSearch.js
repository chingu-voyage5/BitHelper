const UserModel = require('../model/users.js');

// register request
function checkUsernames (username, cb) {

    UserModel.find()
        .or([{ username}, { displayName: username }])
        .exec((err, docs) => {
            console.log(docs, 'this is docs');
            if (docs) cb(docs);

            return cb(null);
        });

}

// put request
function checkDisplayOrUsername (userId, username, displayName, cb) {

    UserModel.find({username})
        .where('_id').ne(userId)
        .exec((err, user) => {
            if (err) return cb(err);
            // User exists
            if (user) return cb(true);

            UserModel.find({displayName})
                .where('_id').ne(userId)
                .exec((displayErr, name) => {
                    if (displayErr) return cb(displayErr);

                    // displayName exists
                    if (name) return cb(name);

                    // neither username or displayName exists

                    return cb(null);
                })
        })
}

module.exports = { checkUsernames };

/*
// Goal Identify duplicate usernames & displayNames

WHEN? 
  1) A user wants to register with Bithelper
  2) A user wants to update their profile on Bithelper

User Stories - A user wants to register with Bithelper

1) A user posts a register request to the server
2) Take the users username and server UserModel and check the username against
  the displayName and username on the server.
    2.1) If a either a username or displayName is returned. Send Error
    2.2) If no results are returned register user

User Story - A user wants to update username / displayName with Bithelper

1) User sends a put request to update their details.
2) Perform a search for username does not exist on server excluding the 
  users_id they wish to change from (so not to search against same account)

    User.find()
      .where('_id').ne(userID)

  2.1) If username does not exist, repeat search with displayName, excluding the original account
3) if both do not return answers then update user

*/