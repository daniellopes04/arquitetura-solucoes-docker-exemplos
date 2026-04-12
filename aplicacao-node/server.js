const express = require("express");
const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  try {
    let num = parseInt(req.body.num);
    const divisores = [];

    for (let i = 2; i <= num; i++) {
      while (num % i === 0) {
        divisores.push(i);
        num /= i;
      }
    }
    res.json({ mdc: divisores });
  } catch (err) {
    res.status(400).json({ error: err.toString() });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));
