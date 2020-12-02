const User = require('../models/user')

exports.addUser = (name, age, location, role) => {

    var user = new User({
        name,
        age,
        location,
        role
    })

    user.save((err, data) => {
        if (err) console.log(`Error saviing user in DDBB: ${err}`);
        console.log(`User `)
    })
}
