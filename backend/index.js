import app from "./app.js";

const PROT = process.env.PROT || 8000

app.use((req, res, next) => {
  res.send("Not Found!");
});

app.use((err, req, res, next) => {
  res.send("Server is not  Found!");
});

app.listen(PROT, () => {
  console.log(`Server is running at http://localhost:${PROT}`);
});
