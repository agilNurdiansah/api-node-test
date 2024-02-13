const express = require('express')
const cors = require('cors')
const app = express();
const db = require("./app/models");
const api_key = "1234567890";
const corsOption = {
    origin: "*"
};
app.get('/', (req, res) => {
    res.send('Express API Test v.1')
  })

app.use((req, res, next) => {
    const apikey = req.header('apikey');
    if(typeof apikey=="undefined"){
        res.status(400).send({message: "Missing Apikey"});
    }
    if (apikey!=api_key) {
      res.status(400).send({message: "Invalid Apikey"});
    } else {
      req.apikey = apikey;
      next();
    }
  });

app.use(cors(corsOption));
app.use(express.json());

const mongoseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}
//connect db
db.mongoose.connect(db.url, mongoseConfig)
    .then( ()=> console.log("database connected."))
    .catch(err => {
        console.log("Error connecting to database.")
    });



// call route mahasiswa

require("./app/routes/mahasiswa.route")(app);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));






