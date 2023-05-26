const db = require('../database/db');

module.exports = class Profile {

    constructor(id, firstName, lastName, age, birthDate, profileImage, conDisease, contact, weight, height, User_id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.birthDate = birthDate;
        this.profileImage = profileImage;
        this.conDisease = conDisease;
        this.contact = contact;
        this.weight = weight;
        this.height = height;
        this.User_id = User_id;
    }

    static findAll() {
        return db.execute("SELECT * FROM profile");
    }

    save() {
        if (this.id) {
            return db.execute(
                'update profile set firstName=?, lastName=?, age=?, birthDate=?, profileImage=?, conDisease=?, contact=?, weight=?, height=?, User_id=? where id = ?',
                [this.firstName, this.lastName, this.age, this.birthDate, this.profileImage, this.conDisease, this.contact, this.weight, this.height, this.User_id, this.id]
            );
        } else {
            return db.execute(
                'insert into profile(firstName, lastName, age, birthDate, profileImage, conDisease, contact, weight, height, User_id) values(?,?,?,?,?,?,?,?,?,?)',
                [this.firstName, this.lastName, this.age, this.birthDate, this.profileImage, this.conDisease, this.contact, this.weight, this.height, this.User_id]
            );
        }
    }
    //'select * from products where p_id = ?',
    static findById(id) {
        return db.execute(
            'select * from profile where User_id = ?',
            [id]
        );
    }

    static delById(id) {
        return db.execute(
            'delete from profile where id = ?',
            [id]
        );
    }
}