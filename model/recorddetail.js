const db = require('../database/db');

module.exports = class RecordDetail {

    constructor(Symptom_id, DailyRecord_id) {
        this.Symptom_id = Symptom_id;
        this.DailyRecord_id = DailyRecord_id;
    }

    static findAll() {
        return db.execute("SELECT * FROM recorddetail");
    }

    save() {
        return db.execute(
            'insert into recorddetail(Symptom_id, DailyRecord_id) values(?,?)',
            [this.Symptom_id, this.DailyRecord_id]
        );
    }

    static findById(id) {
        return db.execute(
            'select * from recorddetail where DailyRecord_id = ?',
            [id]
        );
    }

    static delById(id) {
        return db.execute(
            'delete from recorddetail where DailyRecord_id = ?',
            [id]
        );
    }
}