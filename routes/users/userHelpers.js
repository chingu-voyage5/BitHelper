const UserModel = require('../../model/users.js');

function checkUsernames (username, cb) {

    UserModel.find()
        .or([{ username }, { displayName: username }])
        .exec((err, docs) => {
            if (docs.length === 0) return cb(null, docs);

            return cb(null, false);
        });

}

// put request
function checkDisplayOrUsername (body, cb) {
    const { _id: userId, username, displayName } = body;

    UserModel.find({username})
        .where('_id').ne(userId)
        .exec((err, user) => {
            if (err) return cb(err, false);
            // User exists
            if (user.length !== 0) return cb(null, {message: 'Username currently exists.'});

            UserModel.find({displayName})
                .where('_id').ne(userId)
                .exec((displayErr, name) => {
                    if (displayErr) return cb(displayErr);

                    // displayName exists
                    if (name.length !== 0) return cb(null, { message: 'displayName currently exists' });

                    // neither username or displayName exists
                    return cb(null);
                })
        })
}

// Function for setting properties of a User schema object
const setUserObj = (input, user) => {
    user.username = input.username;
    user.displayName = input.displayName;
    user.avatar = input.avatar || '';
    user.skillset = input.skillset;
    user.email = input.email;

    return user;
};


module.exports = { setUserObj, checkUsernames, checkDisplayOrUsername };
  

