const RecordDetail = require('../model/recorddetail');
const DailyRecord = require('../model/dailyrecord');

exports.addRecordDetail = (req, res, next) => {
    const Symptom_id = req.body.Symptom_id;
    async function getLatestId() {
        try {
            const [getDailyRecord] = await DailyRecord.getIdRecord();
            const daily = getDailyRecord;
            return daily[0].id;

        } catch (error) {
            console.error(error);
        }
    }
    getLatestId().then((latestId) => {
        console.log(latestId);
        console.log(Symptom_id);

        Symptom_id.forEach(id => {
            console.log(id);
            const recorddetail = new RecordDetail(id, latestId);
            recorddetail.save().catch((error) => {
                res.status(200).json({
                    "message": error,
                    "result": false
                });
            });
        });
    });
    res.send({ success: 'Values inserted successfully' });
}


const recordDelete = async (DailyRecord_id) => {
    try {
      await RecordDetail.delById(DailyRecord_id);
      console.log("delete success");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  exports.editRecordDetail = async (req, res, next) => {
    try {
      const Symptom_id = req.body.Symptom_id;
      const DailyRecord_id = req.body.DailyRecord_id;
      const del = await recordDelete(DailyRecord_id);
      if (del) {
        for (const id of Symptom_id) {
          console.log(id);
          console.log(DailyRecord_id);
          const recorddetail = new RecordDetail(id, DailyRecord_id);
          await recorddetail.save();
        }
        console.log("edit success");
        res.status(200).json({
          message: "success",
          result: true,
        });
        // res.send("Values inserted successfully")
      } else {
        console.log("error");
      }
    } catch (error) {
      res.status(500).json({
        message: error,
        result: false,
      });
    }
  }

