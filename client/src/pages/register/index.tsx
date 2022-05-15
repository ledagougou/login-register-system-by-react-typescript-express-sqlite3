import { useState } from "react";
import axios from "axios";
// import { getQueryStringByName } from "../../utils";
const RegisForm: React.FC = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    axios
      .post("/create", {
        data: { ...data, role: Number(localStorage.getItem("role")) },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  return (
    <>
      <form>
        <p>username</p>
        <input
          type="text"
          id="username"
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />
        <p>email</p>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <p>password</p>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </form>
      <div>
        <button onClick={handleClick}>Register</button>
      </div>
    </>
  );
};

export default RegisForm;
