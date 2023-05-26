const db = require('../database/db');

module.exports = class Symptom {

    constructor(id, symptomName, discription, imageUr, BodyType_id) {
        this.id = id;
        this.symptomName = symptomName;
        this.discription = discription;
        this.imageUr = imageUr;
        this.BodyType_id = BodyType_id;
    }

    static findAll() {
        return db.execute("SELECT * FROM symptom");
    }

    save() {
        if (this.id) {
            return db.execute(
                'update symptom set symptomName=?, discription=?, imageUr=?,  BodyType_id=? where id = ?',
                [this.symptomName, this.discription, this.imageUr, this.BodyType_id, this.id]
            );
        } else {
            return db.execute(
                'insert into symptom(symptomName, discription , imageUr, BodyType_id) values(?,?,?,?)',
                [this.symptomName, this.discription, this.imageUr, this.BodyType_id]
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

    static findByIdBodyType(BodyType_id) {
        return db.execute(
            // 'select * from symptom INNER join BodyType on symptom.BodyType_id = BodyType.id where BodyType_id = ?',
            'select symptom.id,symptom.symptomName,symptom.discription,symptom.imageUrl,symptom.BodyType_id,BodyType.typeTitle,BodyType.typeName from symptom Left join BodyType on symptom.BodyType_id = BodyType.id where BodyType_id = ?',
            [BodyType_id]
        )
    }

    static findByDisease(id) {
        return db.execute(
            'SELECT * FROM symptom as sym INNER JOIN symptomKeyword ON sym.id = symptomKeyword.symptom_id INNER JOIN disease as dis ON symptomKeyword.Disease_id = dis.id where sym.id = ?',
            [id]
        )
    }

    static findByIdBodyTypeNotImg(BodyType_id) {
        return db.execute(
            // 'select * from symptom INNER join BodyType on symptom.BodyType_id = BodyType.id where BodyType_id = ?',
            'select symptom.id,symptom.symptomName,symptom.discription,symptom.imageUrl,symptom.BodyType_id,BodyType.typeTitle,BodyType.typeName from symptom Left join BodyType on symptom.BodyType_id = BodyType.id where BodyType_id = ? and symptom.imageUrl is null',
            [BodyType_id]
        )
    }
    static findBySymptomImg() {
        return db.execute(
            // 'select * from symptom INNER join BodyType on symptom.BodyType_id = BodyType.id where BodyType_id = ?',
            'select symptom.id,symptom.symptomName,symptom.discription,symptom.imageUrl,symptom.BodyType_id,BodyType.typeTitle,BodyType.typeName from symptom Left join BodyType on symptom.BodyType_id = BodyType.id where symptom.imageUrl is not null',
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