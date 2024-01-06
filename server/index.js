const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRegistrationModel = require("./models/UserRegistration");
const RouteDetailsModel = require("./models/RouteDetailsModel");
const PhotoModel = require("./models/PhotoModel");
// const multer = require("multer");
const StudentPersonalDetailsModel = require("./models/StudentPersonalDetails");
const StudentStudyDetailsModel = require("./models/StudentStudyDetails");
const InstitutionDetailsModel = require("./models/InstitutionDetails");
const ResidentialAddressDetailsModel = require("./models/ResidentialAddressDetails");
const UserPersonalDetailsModel = require("./models/UserPersonalDetails");
const UserResidentialDetailsModel = require("./models/UserResidentialDetails");
const ApplicationMailsModel = require("./models/ApplicationMails");
const path = require("path");

const app = express();
app.use(express.json());
const staticPath = path.join(__dirname, "./public/");
app.use(express.static(staticPath));
app.use(
  cors({
    origin: ["https://project-wmxw.onrender.com/"],
  })
);
const PORT = process.env.PORT || 8080;

const DB =
  "mongodb+srv://mahipalkeluth143:uK0niUwwZG9FOCHp@majordb.cb49png.mongodb.net/major_project_db?retryWrites=true&w=majority";

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.post("/user-signin", (req, res) => {
  const { email, password } = req.body;
  UserRegistrationModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({
          status: "Success",
          firstname: user.firstname,
          lastname: user.lastname,
          wallet: user.wallet,
        });
      } else {
        res.json("password incorrect");
      }
    } else {
      res.json("user does not exist");
    }
  });
});

app.get("/routeCost", (req, res) => {
  RouteDetailsModel.find()
    .then((userdetails) => res.json(userdetails))
    .catch((err) => res.json(err));
});

app.get("/getUserWallet", (req, res) => {
  UserRegistrationModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/register", (req, res) => {
  UserRegistrationModel.create(req.body)
    .then((registration) => res.json(registration))
    .catch((err) => res.json(err));
});

app.put("/wallet/:email", async (req, res) => {
  const { newWallet } = req.body;
  const email = req.params.email;
  try {
    const result = await UserRegistrationModel.updateOne(
      { email: email },
      {
        $inc: {
          wallet: `${newWallet}`,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "wallent updated success" });
    } else {
      res.json({ success: false, message: "wallet update failed" });
    }
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.put("/payment/:email", async (req, res) => {
  const { cost } = req.body;
  const email = req.params.email;
  try {
    const result = await UserRegistrationModel.updateOne(
      { email: email },
      {
        $inc: {
          wallet: -`${cost}`,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "wallent updated success" });
    } else {
      res.json({ success: false, message: "wallet update failed" });
    }
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Image Upload and Retrive********

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({dest: 'images/'})
// const upload = multer({
//   storage: storage,
// }).single("file");

// app.post("/uploadPhoto", upload, async (req, res) => {
//   console.log(req.file);
//   console.log(req.file.email);
//   // try {
//   //   const photo = new PhotoModel({
//   //     image: req.file.originalname,
//   //     filename: req.file.filename,
//   //   });

//   //   await photo.save();
//   //   res.status(201).send(req.file.originalname);
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).send('Internal Server Error');
//   // }
//   PhotoModel.create({ email: req.file.email, image: req.file.filename })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

app.get("/getImage", (req, res) => {
  PhotoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(res));
});

// STUDENT APPLICATION //

app.post("/student_personal_details", (req, res) => {
  console.log(req.body);
  StudentPersonalDetailsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/student_study_details", (req, res) => {
  StudentStudyDetailsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/institution_detail", (req, res) => {
  InstitutionDetailsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/residential_address_details", (req, res) => {
  ResidentialAddressDetailsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// OTHER USER APPLICATION //

app.post("/user_apply_personal_details", (req, res) => {
  UserPersonalDetailsModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/user_apply_residential_details", (req, res) => {
  UserResidentialDetailsModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/applicaiton_emails", (req, res) => {
  ApplicationMailsModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

//Image retrieve
// app.get("/image_retrieve/:filename", async (req, res) => {
//   try{
//     const image = await PhotoModel.findOne({file: req.params.filename});
//     const imagePath = path.json(__dirname, '../images/', image.filename);
//     res.sendFile(imagePath);
//   }
//   catch(err) {
//     res.status(500).send('Internal Server Error');
//   }
// })

/*  ------------ ADMIN API'S ------------- */

app.get("/application_mails", (req, res) => {
  ApplicationMailsModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  console.log("Hii");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
