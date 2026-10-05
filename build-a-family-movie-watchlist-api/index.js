import express from "express";
import helmet from "helmet";
import { signToken } from "./utils/signToken.js";

import watchlistRoutes from "./routes/watchlist.js";
import { findByUsername } from "./utils/db.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.post("/api/auth/login", (req, res)=>{
  const {username, password} = req.body;
  if (!username || !password){
    return res.status(400).json({message: "Bad request"})
  }

  //search username
  const user = findByUsername(username)
  if (!user){
    return res.status(401).json({message: "Invalid credentials"})
  }
  if (user._password !== password){
    return res.status(401).json({message: "Invalid credentials"})
  }

  const token = signToken({id: user.id, email: user.email, role: user.role});
  
  res.status(200).json({message: "Login successful", token})
})

app.use("/api/watchlist", watchlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
