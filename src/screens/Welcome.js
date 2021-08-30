import React from "react";
import "./Welcome.css";
import Footbt from '../components/Footerbtn';

function Welcome() {
  return (
    <div>
      <title>Attendance System</title>

      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Ubuntu&display=swap"
        rel="stylesheet"
        />
      <div className="poster">
        <div className="about">
          <h2>Touchless Face recognition based Employee Attendance</h2>
        </div>
        <br/>
        <br/>
        <Footbt/>
      </div>
    </div>
  );
}

export default Welcome;
