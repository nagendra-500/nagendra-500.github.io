import React from "react";
import {MDBFooter } from "mdbreact";
import "./styler.css";


const FooterPage = () => {

  return (
    <div className="main-footer">
      <MDBFooter color="blue" className="font-small pt-4 mt-4">
        <div
          className="footer-copyright text-center py-3"
          style={{ background: "rgb(10, 43, 70)" }}
        >
        </div>
      </MDBFooter>
    </div>
  );
};

export default FooterPage;
