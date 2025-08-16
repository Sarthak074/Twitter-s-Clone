import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

const app = express();
const port = 3000;
const saltRounds = 20;
env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.render("authentication.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/authentication", (req, res) => {
  res.render("authentication.ejs");
});

let tweets = [];
app.get("/twitter", async (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());

  try {
    const result = await db.query("select * from tweets");
    tweets = result.rows;
    if (req.isAuthenticated()) {
      res.render("twitter.ejs", {
        username: req.user.name,
        tweetItems: tweets,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/twitter",
  passport.authenticate("google", {
    successRedirect: "/twitter",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/twitter",
    failureRedirect: "/login",
  })
);

app.post("/tweet", async (req, res) => {
  const email = req.user.email;
  const tweet = req.body.tweets;
  await db.query("insert into tweets(email,tweet,username) values($1,$2,$3)", [
    email,
    tweet,
    req.user.name,
  ]);
  res.redirect("/twitter");
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const birthday = req.body.birthday;
  try {
    const checkResult = await db.query("select * from users  where email=$1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "insert into users(name,email,password,birthday) values($1,$2,$3,$4) returning *",
            [name, email, hash, birthday]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/twitter");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  "local",
  new Strategy(async function verify(email, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/twitter",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const result = await db.query("select * from users where email=$1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "insert into users(name, email, password) values($1,$2,$3)",
            [
              profile.given_name + " " + profile.family_name,
              profile.email,
              "google",
            ]
          );
          cb(null, newUser.rows[0]);
        } else {
          cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
