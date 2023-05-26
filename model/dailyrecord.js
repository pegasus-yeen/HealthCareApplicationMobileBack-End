const db = require('../database/db');

module.exports = class DailyRecord {

    constructor(id, dateRecord, dailyDescription, User_id) {
        this.id = id;
        this.dateRecord = dateRecord;
        this.dailyDescription = dailyDescription;
        this.User_id = User_id;
    }

    static findAll() {
        return db.execute("SELECT * FROM dailyrecord");
    }

    save() {
        if (this.id) {
            return db.execute(
                'update dailyrecord set dateRecord=? , dailyDescription=? , User_id=? where id = ?',
                [this.dateRecord, this.dailyDescription, this.User_id, this.id]
            );
        } else {
            return db.execute(
                'insert into dailyrecord(dateRecord, dailyDescription,User_id) values(?,?,?)',
                [this.dateRecord, this.dailyDescription, this.User_id]
            );
        }
    }
    //'select * from products where p_id = ?',
    static findById(id) {
        return db.execute(
            'select * from dailyrecord where id = ?',
            [id]
        );
    }

    static delById(id) {
        return db.execute(
            'delete from dailyrecord where id = ?',
            [id]
        );
    }

    static getIdRecord() {
        return db.execute('SELECT id FROM dailyrecord ORDER BY id DESC LIMIT 1');
    }

    static getDailyRecordByDate(date, user_id) {
        return db.execute('SELECT * FROM `dailyrecord` dl INNER JOIN recorddetail rd ON dl.id = rd.DailyRecord_id INNER JOIN symptom s ON rd.Symptom_id = s.id WHERE dateRecord = ? and User_id = ? ',
            [date, user_id]);
    }
}