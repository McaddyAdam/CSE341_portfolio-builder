const router = require("express").Router();
const path = require("path");
const swagger = require("./swagger");
const storesRoute = require("./stores");
const employee = require("./employees");
const vehicle = require("./vehicle");
const oauth = require("../oauth/oauth");
const vehicleMaintenance = require("./vehicleMaintenance");
const user = require("./users");
const cookie = require("cookie");

router.use("/stores", storesRoute);
router.use("/employee", employee);
router.use("/vehicle", vehicle);
router.use("/maintenance", vehicleMaintenance);
router.use("/api-docs", swagger);
router.use("/user", user);
router.use("/", oauth);

//------defining views---------
router.get("/", (req, res) => {
  const cookies = cookie.parse(req.headers?.cookie || "");
  const githubToken = cookies.git_token || false;
  if (githubToken) {
    res.sendFile(path.join(__dirname, "../public/logged-git.html"));
  }
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../public/logged-google.html"));
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get("/account", (req, res) => {
  const cookies = cookie.parse(req.headers?.cookie || "");
  const githubToken = cookies.git_token || false;
  if (githubToken) {
    res.sendFile(path.join(__dirname, "../public/logged-git.html"));
  } else {
    res.status(401).json({ message: "You have no access to this page." });
  }
});
router.get("/account-google", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "../public/logged-google.html"));
  } else {
    res.status(401).json({ message: "You have no access to this page." });
  }
});

module.exports = router;
