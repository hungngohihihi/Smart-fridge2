// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");

/******************
 ***USER ROUTES***
 ******************/

//Get all users
router.get("/", async (req, res) => {
  res.send(
    (
      await pool.query("SELECT email FROM users;", [
        // req.session.email,
      ])
    ).rows
  );
});

//Search a user (email)
// router.get("/search/", async (req, res) => {
//   const { name, location } = req.query;
//   let params;
//   switch (`${location == "all-locations"} ${name.length == 0}`) {
//     case "true true":
//       params = ["SELECT email FROM users WHERE", [req.session.email]];
//       break;
//     case "false true":
//       params = [
//         "SELECT * FROM users WHERE location ILIKE $1 AND email = $2",
//         ["%" + location + "%", req.session.email],
//       ];
//       break;
//     case "true false":
//       params = [
//         "SELECT * FROM users WHERE name ILIKE $1 AND email = $2",
//         ["%" + name + "%", req.session.email],
//       ];
//       break;
//     default:
//       params = [
//         "SELECT * FROM users WHERE name ILIKE $1 AND location ILIKE $2 AND email = $3",
//         ["%" + name + "%", "%" + location + "%", req.session.email],
//       ];
//       break;
//   }
//   res.send((await pool.query(...params)).rows);
// });

//Get user with a certain ID
// router.get("/getid/:id", async (req, res) => {
//   const { id } = req.params;
//   res.send(
//     (await pool.query("SELECT * FROM users WHERE user_id = $1", [id])).rows
//   );
// });

//Update a user with a certain id
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, location, quantity, expiration } = req.body;
//   res.send(
//     await pool.query(
//       "UPDATE users SET name = $1, location = $2, quantity = $3, expiration = $4 WHERE user_id = $5",
//       [name, location, quantity, expiration, id]
//     )
//   );
// });

//Delete a certain user with an id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    await pool.query("DELETE FROM users WHERE stock_id = $1 RETURNING *", [id])
  );
});

module.exports = router;
