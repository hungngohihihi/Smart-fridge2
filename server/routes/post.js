
// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");


/*********************
 ***LOCATION ROUTES***
 *********************/

//Add a post
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const currentTimeUTC = new Date().toUTCString();
  res.send(
    await pool.query(
      "INSERT INTO post (email, title, content, time ) values ($1, $2, $3, $4) RETURNING *",
      [req.session.email, title, content, currentTimeUTC]
    ).rows
  );
});


router.get("/", async (req, res) => {
  res.send(
    (
      await pool.query("SELECT * FROM post;", [
        // req.session.email,
      ])
    ).rows
  );
});

// Tìm kiếm bài đăng (email, title)
router.get("/search/", async (req, res) => {
  const { email, title } = req.query;
  let params;
  switch (`${email.length == 0} ${title.length == 0}`) {
    case "false false":
      params = [
        "SELECT * FROM post WHERE email ILIKE $1 AND title = $2",
        ["%" + email + "%", "%" + title + "%"]
      ];
      break;
    case "false true":
      params = [
        "SELECT * FROM post WHERE email ILIKE $1 ",
        ["%" + email + "%"]
      ];
      break;
    case "true false":
      params = [
        "SELECT * FROM post WHERE title ILIKE $1 ",
        ["%" + title + "%"]
      ];
      break;
    default:
      params = [
        "SELECT * FROM post",
      ];
      break;
  }

  try {
    const result = await pool.query(...params);
    res.send(result.rows);
  } catch (error) {
    console.error("Lỗi thực thi truy vấn:", error);
    res.status(500).send("Lỗi Nội bộ của Server");
  }
});


module.exports = router;