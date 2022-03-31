import { useState } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("You are not logged in");
  const [secret, setSecret] = useState<string>("No secret found");

  const submitHandler = async (e) => {
    e.preventDefault();

    //login
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((data) => data.json());

    const token = res.token;

    if (token) {
      const json = jwt.decode(token) as { [key: string]: string };
      setMessage(`
        Welcome ${json.username} and you are ${
        json.admin ? "admin" : "not an admin"
      }
      `);

      //secret
      const res = await fetch("/api/secret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then((data) => data.json());

      if (res.secretAdminCode) {
        setSecret(res.secretAdminCode);
      } else {
        setSecret("nothing available");
      }
    } else {
      setMessage("Something went wrong");
    }

    e.target.reset();
  };

  return (
    <div>
      <h1>{message}</h1>
      <h2>secret: {secret}</h2>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          defaultValue="admin"
        />
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          defaultValue="admin"
        />
        <br />
        <input type="submit" value="LogIn" />
      </form>
    </div>
  );
}
