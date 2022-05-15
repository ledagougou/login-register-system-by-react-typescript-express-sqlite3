const sqlite3 = require("sqlite3").verbose();
class DB {
  private db: any = null;
  constructor() {}
  public init() {
    return new Promise((reslove, reject) => {
      this.db = new sqlite3.Database("./database.db", (err: any) => {
        if (err) reject(err);
        reslove(true);
      });
    });
  }
  public query(sql: string) {
    return new Promise((reslove, reject) => {
      this.db.all(sql, (err: any, row: any) => {
        if (err) {
          reject(err);
        } else {
          reslove(row);
        }
      });
    });
  }
  public queryCurrentUser(username: string, role: number) {
    return this.query(
      `select password from userTable where username = '${username}' and role = ${role}`
    );
  }
  public addUser(
    username: string,
    email: string,
    password: string,
    role: number
  ) {
    return this.db.prepare(
      "INSERT OR REPLACE INTO userTable (username, email, password,role) VALUES (?,?,?,?)"
    );
  }
}
const db = new DB();
db.init();
export default db;
