import "./Home.css";
function Home() {
  return (
    <div className="Home">
      <>
        <title>Home Page</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <div className="bg-img">
          
        </div>
        <div className="row">
          
          <div className="col-sm-8" id="card2">
            <div className="card">

              <div className="card-body">
                <p className="card-text"></p>
                <ul>
                  <li>Enter your email and password</li>
                  <li>Allow the webcam to scan your face</li>
                  <li>
                    your morning/evening attendance is marked with timestamp
                  </li>
                  <li>Happy Working!!</li>
                </ul>
                <p />
              </div>

            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Home;
