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

    user.save((errorSavingUser, user) => {
        if (err) {
            console.log(`Error saving user in DDBB: ${errorSavingUser}`)
        } else {
            console.log(`User added to DDBB: ${username}`)
        }
    })
}

exports.disableUser = (username) => {
    User.findOneAndUpdate({ username }, { active: false, updatedAt: Date.now() }, { new: true }, (errorUpdatingUser, updatedUser) => {
        if (errorUpdatingUser) {
            console.error(`Error updating user: ${errorUpdatingUser}`)
        } else {
            console.log(`User ${username} disabled in the DDBB succesfull`)
        }
    })
}
