const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  port: process.env.DB_PORT,
});

app.post("/confirmation", (req, res) => {
  const name1 = req.body.name1;
  const name2 = req.body.name2;
  const email = req.body.email;
  const numChildren = req.body.numChildren;
  const overNight = req.body.overNight;
  const accomondationType =
    overNight === "ano" ? req.body["accomodation-type"] : "zadne";
  const driver = req.body.driver;
  const additionalInfo = req.body.additionalInfo;

  con.query(
    "INSERT INTO hoste (jmeno, doprovod, email, pocet_deti, prespani, druh_prespani, ridic, dalsi_info) VALUES (?)",
    [
      [
        name1,
        name2,
        email,
        numChildren,
        overNight,
        accomondationType,
        driver,
        additionalInfo,
      ],
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.redirect("/success");
      }
    }
  );
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server starter on port 3000");
});
