const db = require('../database/db');

module.exports = class Symptom {

    constructor(id, symptomName, discription, imageUr, bodytype_id) {
        this.id = id;
        this.symptomName = symptomName;
        this.discription = discription;
        this.imageUr = imageUr;
        this.bodytype_id = bodytype_id;
    }

    static findAll() {
        return db.execute("SELECT * FROM symptom");
    }

    save() {
        if (this.id) {
            return db.execute(
                'update symptom set symptomName=?, discription=?, imageUr=?,  bodytype_id=? where id = ?',
                [this.symptomName, this.discription, this.imageUr, this.bodytype_id, this.id]
            );
        } else {
            return db.execute(
                'insert into symptom(symptomName, discription , imageUr, bodytype_id) values(?,?,?,?)',
                [this.symptomName, this.discription, this.imageUr, this.bodytype_id]
            );
        }
    }
    //'select * from products where p_id = ?',
    static findById(id) {
        return db.execute(
            'select * from symptom where id = ?',
            [id]
        );
    }

    static findByIdBodyType(bodytype_id) {
        return db.execute(
            // 'select * from symptom INNER join bodytype on symptom.bodytype_id = bodytype.id where bodytype_id = ?',
            'select symptom.id,symptom.symptomName,symptom.discription,symptom.imageUrl,symptom.bodytype_id,bodytype.typeTitle,bodytype.typeName from symptom Left join bodytype on symptom.bodytype_id = bodytype.id where bodytype_id = ?',
            [bodytype_id]
        )
    }

    static findByDisease(id) {
        return db.execute(
            'SELECT * FROM symptom as sym INNER JOIN symptomkeyword ON sym.id = symptomkeyword.Symptom_id INNER JOIN disease as dis ON symptomkeyword.Disease_id = dis.id where sym.id = ?',
            [id]
        )
    }

    static findByIdBodyTypeNotImg(bodytype_id) {
        return db.execute(
            // 'select * from symptom INNER join bodytype on symptom.bodytype_id = bodytype.id where bodytype_id = ?',
            'select symptom.id,symptom.symptomName,symptom.discription,symptom.imageUrl,symptom.bodytype_id,bodytype.typeTitle,bodytype.typeName from symptom Left join bodytype on symptom.bodytype_id = bodytype.id where bodytype_id = ? and symptom.imageUrl is null',
            [bodytype_id]
        )
    }
    static findBySymptomImg() {
        return db.execute(
            // 'select * from symptom INNER join bodytype on symptom.bodytype_id = bodytype.id where bodytype_id = ?',
            'select symptom.id,symptom.symptomName,symptom.discription,symptom.imageUrl,symptom.bodytype_id,bodytype.typeTitle,bodytype.typeName from symptom Left join bodytype on symptom.bodytype_id = bodytype.id where symptom.imageUrl is not null',
        )
    }

    static delById(id) {
        return db.execute(
            'delete from symptom where id = ?',
            [id]
        );
    }

    static searchSymptom(query) {
        return db.execute(
            'select * from symptom where symptomName LIKE ?',
            ['%' + query + '%']
        );
    }
}
