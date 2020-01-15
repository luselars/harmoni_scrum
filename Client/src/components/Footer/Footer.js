// @flow
import * as React from 'react';

function Footer() {
  return (
    <footer className="page-footer bg-dark pt-4">
      <div className="container">
        <ul className="list-unstyled list-inline text-center">
          <li className="list-inline-item">
            <a className="btn-floating btn-fb mx-1">
              <i className="fa fa-facebook"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-tw mx-1">
              <i className="fa fa-twitter"> </i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn-floating btn-gplus mx-1">
              <i className="fa fa-envelope-o"> </i>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
      </div>
    </footer>
  );
}

export default Footer;
