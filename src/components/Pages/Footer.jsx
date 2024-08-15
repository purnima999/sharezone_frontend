import React from 'react';

export default function Footer() {
    return (
        <footer className="cs_footer cs_style_2 cs_white_color">
            <div className="cs_footer_bottom">
                <div className="container">
                    Copyright © {new Date().getFullYear()} (#nocopyRights).
                </div>
            </div>
        </footer>
    );
}
