import React from "react";

export default () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div>
              <h6>About</h6>
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget nibh ex. In venenatis ante ut turpis molestie, eget tempus augue convallis. Cras eget lobortis sem. Mauris lectus
                leo, fringilla eget porta non, semper ut orci. Etiam iaculis arcu vitae facilisis accumsan. Nullam vel nisl a metus auctor tempor vel eu lorem. Aliquam erat velit, rutrum nec malesuada
                convallis, interdum in nibh. Donec quis maximus mi, ut dapibus arcu. Nulla facilisi. Curabitur imperdiet sollicitudin fermentum.
              </p>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by Akbar Akma</p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="https://www.instagram.com/akbarakma/">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a className="twitter" href="mailto:akbarajo1234@gmail.com">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li>
                  <a className="dribbble" href="https://www.linkedin.com/in/akbar-akma-519526189/">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
