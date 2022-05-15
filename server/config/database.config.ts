// import { Sequelize } from "sequelize";

// const db = new Sequelize("app", "", "", {
//   storage: "./database.sqlite",
//   dialect: "sqlite",
// });

const sqlite3 = require("sqlite3").verbose();

// sqlites数据库地址
const path = require("path");
let rootPath = path.resolve(__dirname, "./");
let sqliteDbPath = `${rootPath}database.sqlite`;

// 打开sqlites数据库
var db;
db = new sqlite3.Database(sqliteDbPath, function (err: any) {
  if (err) throw err;
});

// all查询所有数据  from后边跟表名
db.all(`select * from userTable`, function (err: any, row: any) {
  if (err) throw err;
  else {
    console.log("all查询结果 ", row);
    console.log("转换JSON", JSON.stringify(row)); //all所有的内容转成 JSON内容
  }
});
export default db;
