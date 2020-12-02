const User = require('../models/user')

exports.addUser = (username, profileURL, name, age, location, role, sex) => {

    var user = new User({
        username,
        profileURL,
        name,
        age,
        location,
        role,
        sex
    })

    user.save((err, data) => {
        if (err) console.log(`Error saving user in DDBB: ${err}`);
        console.log(`User added to DDBB: ${username}`)
    })
}
