const db = require('../database/db');

module.exports = class Disease {

    constructor(id, diseaseName, symptom, cause, treatment, selfCare) {
        this.id = id;
        this.diseaseName = diseaseName;
        this.symptom = symptom;
        this.cause = cause;
        this.treatment = treatment;
        this.selfCare = selfCare;
    }

    static findAll() {
        return db.execute("SELECT * FROM disease");
    }

    save() {
        if (this.id) {
            return db.execute(
                'update disease set diseaseName=?, symptom=?,  cause=?, treatment=?, selfCare=? where id = ?',
                [this.diseaseName, this.symptom, this.cause, this.treatment, this.selfCare, this.id]
            );
        } else {
            return db.execute(
                'insert into disease(diseaseName, symptom,  cause, treatment, selfCare) values(?,?,?,?,?)',
                [this.diseaseName, this.symptom, this.cause, this.treatment, this.selfCare]
            );
        }
    }
    //'select * from products where p_id = ?',
    static findById(id) {
        return db.execute(
            'select * from disease where id = ?',
            [id]
        );
    }

    static delById(id) {
        return db.execute(
            'delete from disease where id = ?',
            [id]
        );
    }
}