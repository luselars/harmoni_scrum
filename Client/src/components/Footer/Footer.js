// @flow

import * as React from 'react';
import './stylesheet.css';

function Footer() {
  return (
    <footer id="footer" class="page-footer font-small mdb-color bg-dark pt-4 text-light">
      <div class="container text-center text-md-left">
        <div class="row d-flex align-items-center">
          <div class="col-md-8 col-lg-8">
            <h6 class="text-uppercase mb-4 font-weight-bold ">Kontakt</h6>
            <p>Telefon: +47 123 45 678</p>
            <p>E-mail: kontakt@harmoni.no</p>
          </div>
          <div class="col-md-3 col-lg-4 ml-lg-0">
            <div class="text-center text-md-right">
              <ul class="list-unstyled list-inline">
                <li class="list-inline-item">
                  <button
                    class="btn btn-success bg-green"
                    onClick={() => (window.location.href = '/feedback')}
                  >
                    Klageknapp
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
