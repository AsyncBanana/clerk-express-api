var express = require("express");
var router = express.Router();
var clerk = require("@clerk/clerk-sdk-node");
/* GET protected API */
router.get("/", async function (req, res, next) {
  if (!req.auth.userId) {
    res.status(401).send("Please log in")
    return;
  }
  res.send(
    `Hey ${
      (await clerk.users.getUser(req.auth.userId)).emailAddresses[0]
        .emailAddress
    }!`
  );
});

module.exports = router;
