/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Form, Button } from "react-bootstrap";
import "./Welcome.css";
import { useStateValue } from "../StateProvider";

function Signup() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(false);

  const [institutesOnce] = useState([]);
  const [{ institutes }, dispatch] = useStateValue();

  useEffect(() => {
    return () => {};
  }, [institutesOnce, dispatch, institutes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (authUser) => {
          if (authUser) {
            const uid = authUser?.user?.uid;

            db.collection("users").doc(uid).set({
              name: name,
              finishedSetup: false,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="poster-signup">
        <div
          className="container mt-4"
          style={{ width: "70%", padding: "10%" }}
        >
          <h2>Welcome to The AgileCRM!</h2>
          <h3
            style={{
              color: "#ff3300",
              textAlign: "center",
              textDecoration: "bold",
            }}
          >
            You need to fill the following details to register!
          </h3>
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "45%", background: "#ff3300" }}
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Signup;
