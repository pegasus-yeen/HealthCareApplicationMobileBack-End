const Profile = require('../model/profile');

exports.addProfile = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const birthDate = req.body.birthDate;
    const profileImage = req.body.profileImage;
    const conDisease = req.body.conDisease;
    const contact = req.body.contact;
    const weight = req.body.weight;
    const height = req.body.height;
    const User_id = req.body.User_id;

    const profile = new Profile(null, firstName, lastName, age, birthDate, profileImage, conDisease, contact, weight, height, User_id);
    profile.save().then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}


exports.updateProfile = (req, res, next) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const birthDate = req.body.birthDate;
    const profileImage = req.body.profileImage;
    const conDisease = req.body.conDisease;
    const contact = req.body.contact;
    const weight = req.body.weight;
    const height = req.body.height;
    const User_id = req.body.User_id;

    const profile = new Profile(id, firstName, lastName, age, birthDate, profileImage, conDisease, contact, weight, height, User_id);
    profile.save().then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}


exports.getProfileById = (req, res, next) => {
    const id = req.params.id;
    Profile.findById(id).then((profile) => {
        res.status(200).json({
            "message": "success",
            "data": profile[0]
        });
    }).catch((error) => {
        res.status(500).json({
            "message": error
        });
    });
}