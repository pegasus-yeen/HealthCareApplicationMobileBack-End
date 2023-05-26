const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const bodyTypeRoutes = require('./routes/bodytype');
const symptomRoutes = require('./routes/symptom');
const diseaseRoutes = require('./routes/disease');
const recorddetailRoutes = require('./routes/recorddetail');
const dailyrecordRoutes = require('./routes/dailyrecord');
const profileRoutes = require('./routes/profile');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use("/api/body",bodyTypeRoutes);
app.use("/api/symptom",symptomRoutes);
app.use("/api/disease",diseaseRoutes);
app.use("/api/record",recorddetailRoutes);
app.use("/api/daily",dailyrecordRoutes);
app.use("/api/profile",profileRoutes);
app.listen(process.env.PORT || 3000);