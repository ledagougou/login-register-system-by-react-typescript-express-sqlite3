import express from "express";
import db from "./models";

const app: express.Express = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: express.Request, res: express.Response) => {
  console.log("Here");
  res.send("Hello,This is express server");
});

app.post("/create", (req: express.Request, res: express.Response) => {
  const { username, email, password, role } = req.body.data;
  db.queryCurrentUser(username, role)
    .then((row: any) => {
      if (row.length === 0) {
        db.addUser(username, email, password, role);
        return res.send(
          JSON.stringify({
            code: 0,
            msg: "register success",
          })
        );
      } else {
        return res.send(
          JSON.stringify({
            code: 0,
            msg: "username already exits",
          })
        );
      }
    })
    .catch((err) => {
      return res.send(
        JSON.stringify({
          code: -1,
          msg: err,
        })
      );
    });
});

app.post("/login", (req: express.Request, res: express.Response) => {
  const { username, password, role } = req.body.data;
  db.queryCurrentUser(username, role)
    .then((row: any) => {
      if (row.length === 0) {
        return res.send(
          JSON.stringify({
            code: -1,
            msg: "username or password error",
          })
        );
      } else {
        const realPassword = row[0].password;
        if (realPassword === password) {
          return res.send(
            JSON.stringify({
              code: 0,
              msg: "login success",
            })
          );
        } else {
          return res.send(
            JSON.stringify({
              code: -1,
              msg: "username or password error",
            })
          );
        }
      }
    })
    .catch((err) => {
      return res.send(
        JSON.stringify({
          code: -1,
          msg: err,
        })
      );
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
