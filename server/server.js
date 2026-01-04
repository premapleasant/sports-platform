require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://sports-platform-backend-42q1.onrender.com",
  credentials: true
}));

const PORT = process.env.PORT || 5000;

/*  AUTH MIDDLEWARE  */
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

/*  REGISTER  */
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
    (err) => {
      if (err) return res.status(400).json({ message: "Email already exists" });
      res.json({ message: "User registered" });
    }
  );
});

/*  LOGIN  */
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (result.length === 0)
        return res.status(400).json({ message: "User not found" });

      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign(
        { id: result[0].id },
        process.env.JWT_SECRET
      );

      res.json({ token });
    }
  );
});

/*  GET GAMES  */
app.get("/games", auth, (req, res) => {
  const { sport } = req.query;
  let sql = "SELECT * FROM games";
  let params = [];

  if (sport) {
    sql += " WHERE sport=?";
    params.push(sport);
  }

  db.query(sql, params, (err, results) => {
    res.json(results);
  });
});

/*  FAVORITES  */
app.post("/favorites/:gameId", auth, (req, res) => {
  db.query(
    "INSERT INTO favorites (userId, gameId) VALUES (?, ?)",
    [req.user.id, req.params.gameId],
    () => res.json({ message: "Added to favorites" })
  );
});

app.delete("/favorites/:gameId", auth, (req, res) => {
  db.query(
    "DELETE FROM favorites WHERE userId=? AND gameId=?",
    [req.user.id, req.params.gameId],
    () => res.json({ message: "Removed from favorites" })
  );
});

app.get("/favorites", auth, (req, res) => {
  db.query(
    `SELECT g.* FROM games g
     JOIN favorites f ON g.id=f.gameId
     WHERE f.userId=?`,
    [req.user.id],
    (err, results) => res.json(results)
  );
});


app.listen(PORT, () =>
  console.log("Server running on port", PORT)
);
