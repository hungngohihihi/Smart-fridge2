
// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");


/*********************
 ***LOCATION ROUTES***
 *********************/

//Add a stock

//Add a stock
router.post("/", async (req, res) => {
    const { title,content } = req.body;
    const currentTimeUTC = new Date().toUTCString();
    res.send(
      await pool.query(
        "INSERT INTO post (email, title, content, time ) values ($1, $2, $3, $4) RETURNING *",
        [req.session.email, title, content, currentTimeUTC]
      ).rows
    );
  });
  

module.exports = router;