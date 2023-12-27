// Dependencies

const express = require("express");
const router = express.Router();
const pool = require("../db");
const { transferableAbortController } = require("util");

/******************
 ***Recipe ROUTES***
 ******************/

//Add a recipe
router.post("/", async (req, res) => {
  const { name, description, ingredient } = req.body;
  res.send(
    await pool.query(
      "INSERT INTO recipe (name, description, ingredient, email) values ($1, $2, $3, $4) RETURNING *",
      [name, description, ingredient, req.session.email]
    ).rows
  );
});

//Get all recipes
router.get("/", async (req, res) => {
  res.send(
    (
      await pool.query("SELECT * FROM recipe WHERE email = $1", [
        req.session.email,
      ])
    ).rows
  );
});

//Search a recipe (name, location)
// router.get("/search/", async (req, res) => {
//   const { name, location } = req.query;
//   let params;
//   switch (`${location == "all-locations"} ${name.length == 0}`) {
//     case "true true":
//       params = ["SELECT * FROM recipe WHERE email = $1", [req.session.email]];
//       break;
//     case "false true":
//       params = [
//         "SELECT * FROM recipe WHERE location ILIKE $1 AND email = $2",
//         ["%" + location + "%", req.session.email],
//       ];
//       break;
//     case "true false":
//       params = [
//         "SELECT * FROM recipe WHERE name ILIKE $1 AND email = $2",
//         ["%" + name + "%", req.session.email],
//       ];
//       break;
//     default:
//       params = [
//         "SELECT * FROM recipe WHERE name ILIKE $1 AND location ILIKE $2 AND email = $3",
//         ["%" + name + "%", "%" + location + "%", req.session.email],
//       ];
//       break;
//   }
//   res.send((await pool.query(...params)).rows);
// });

//Get recipe with a certain ID
router.get("/getid/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    (await pool.query("SELECT * FROM recipe WHERE recipe_id = $1", [id])).rows
  );
});

//Update a recipe with a certain id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, ingredient } = req.body;
  res.send(
    await pool.query(
      "UPDATE recipe SET name = $1, description = $2, ingredient = $3 WHERE recipe_id = $5",
      [name, description, ingredient, id]
    )
  );
});

//Delete a certain recipe with an id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.send(
    await pool.query("DELETE FROM recipe WHERE recipe_id = $1 RETURNING *", [id])
  );
});

module.exports = router;
