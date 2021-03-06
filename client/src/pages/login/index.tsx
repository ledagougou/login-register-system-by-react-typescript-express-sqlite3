import { useState } from "react";
import axios from "axios";
const LoginForm: React.FC = () => {
  const [data, setData] = useState({
    username: "",
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
      .post("/login", {
        data: {
          ...data,
          role: Number(localStorage.getItem("role")),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // login success
            alert("success");
          } else {
            // login fail
            alert(res.data.msg);
          }
        }
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
        <button onClick={handleClick}>summit</button>
      </div>
    </>
  );
};

export default LoginForm;
