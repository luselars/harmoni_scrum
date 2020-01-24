// @flow

import * as React from 'react';
import { Component } from 'react';
import './stylesheet.css';

/**Footer component */
export default class Footer extends Component<{}, {}> {
  render() {
    return (
      <footer id="footer" className="page-footer font-small mdb-color bg-dark pt-4 text-light mt-3">
        <div className="container text-center text-md-left">
          <div className="row d-flex align-items-center">
            <div className="col-md-8 col-lg-8">
              <h6 className="text-uppercase mb-4 font-weight-bold ">Kontakt</h6>
              <p>Telefon: +47 123 45 678</p>
              <p>E-post: harmoni.scrum@gmail.com</p>
            </div>
            <div className="col-md-3 col-lg-4 ml-lg-0">
              <div className="text-center text-md-right">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <button
                      className="btn btn-success bg-green"
                      onClick={() => (window.location.href = '/feedback')}
                    >
                      Gi feedback
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
}
