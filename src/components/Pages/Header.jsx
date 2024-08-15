import React from 'react';
import { Link } from 'react-router-dom';


export default function Header() {

  return (
    <>
      <header
        className={`cs_site_header cs_style1 cs_sticky_header cs_active_sticky `}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" to="/">
                  ShareZone
                </Link>
              </div>
              <div className="cs_main_header_right">
                <div className="cs_toolbox">
                  <Link to="">View Source Code</Link>
                  <Link to="/signin">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
