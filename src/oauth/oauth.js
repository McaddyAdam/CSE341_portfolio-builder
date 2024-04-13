const express = require("express");
const axios = require("axios");
const cookie = require("cookie");

const oauth = express.Router();

const redirect = (req, res) => {
  const cookies = cookie.parse(req.headers?.cookie || "");
  const githubToken = cookies.git_token || false;
  if (githubToken) {
    res.redirect("/account");
  } else {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  }
};

const callback = async (req, res, next) => {
  const { code } = req.query;

  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: "application/json" } };

  try {
    // Make the POST request to GitHub for the access token
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      opts,
    );
    const token = response.data.access_token;

    if (token == undefined) {
      res.redirect("/denied");
      return;
    } else {
      const tokenCookie = cookie.serialize("git_token", token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000, // 5min
        sameSite: "lax",
      });

      res.setHeader("Set-Cookie", tokenCookie);
      res.redirect("/account");
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

const logout = (req, res) => {
  res.clearCookie("git_token");
  res.redirect("/");
};

oauth.get("/oauth", redirect);
oauth.get("/oauth-callback", callback);
oauth.get("/git-logout", logout);

module.exports = oauth;
