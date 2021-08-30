import { useStateValue } from "../StateProvider";
import React from "react";
import Homie from "./Home1";
import { Button } from "react-bootstrap";

import * as routes from "../globals/routes";
import { Link } from "react-router-dom";


function Home() {
  const [{ features }] = useStateValue();

  return (
    <div>
      <Homie />
      <br />
      {features ? (
        <> <h2>Welcome to The AgileCRM!</h2></>
      ) : (
        <>
          <br />
          <div className="footer">
            <Link to={routes.ENROLL}>
              <Button
                variant="primary"
                style={{
                  color: "white",
                  width: "40%",
                  height: "200%",
                  position: "relative",
                  "box-shadow": "inset 0 0.2 0.2 0.8 grey",
                }}
              >
                Enroll Yourself
              </Button>
            </Link>
          </div>
          <br />
        </>
      )}
    </div>
  );
}

export default Home;
