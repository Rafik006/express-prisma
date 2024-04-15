const express = require("express");
const port = 3000;
const cors = require("cors");
import routes from "./routes/routes";
var multer = require("multer");
var upload = multer();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//npm install prisma typescript ts-node @types/node --save-dev

app.set("view engine", "pug");
app.set("views", "./views");
interface User {
  id: string;
  password: string;
}

app.use(upload.array());
app.use(cookieParser());
app.use(session({ secret: "Your secret key" }));

var Users: User[] = [];
app.use("/api",routes)
app.get("/signup", function (req: any, res: any) {
  res.render("signup");
});

app.post("/signup", function (req: any, res: any) {
  console.log(req.body);
  if (!req.body.id || !req.body.password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    Users.filter(function (user) {
      if (user.id === req.body.id) {
        res.render("signup", {
          message: "User Already Exists! Login or choose another user id",
        });
      }
    });
    var newUser = { id: req.body.id, password: req.body.password };
    Users.push(newUser);
    console.log(Users);
    req.session.user = newUser;
    res.redirect("/protected_page");
  }
});
function checkSignIn(req: any, res: any, next: any) {
  if (req.session.user) {
    next(); //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err); //Error, trying to access unauthorized page!
  }
}
app.get("/protected_page", checkSignIn, function (req: any, res: any) {
  res.render("protected_page", { id: req.session.user.id });
});

app.get("/login", function (req: any, res: any) {
  res.render("login");
});

app.post("/login", function (req: any, res: any) {
  console.log(Users);
  if (!req.body.id || !req.body.password) {
    res.render("login", { message: "Please enter both id and password" });
  } else {
    res.redirect("/protected_page");
    //res.render('login', {message: "Invalid credentials!"});
  }
});

app.use("/protected_page", function (err: any, req: any, res: any, next: any) {
  console.log(err);
  //User should be authenticated! Redirect him to log in.
  res.redirect("/login");
});

app.listen(3000);
