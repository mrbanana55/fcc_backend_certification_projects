import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get('/api{/:date}', (req, res)=>{
  const inputDate = req.params.date
  let date;

  if (!inputDate){
    date = new Date();
  }
  else{
    // check if input date is unix or date
    const isUnix = /^\d+$/.test(inputDate);
    date = new Date(isUnix ? Number(inputDate) : inputDate);
  }
  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });

})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
