import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import ShareZoneFileUpload from './shareZoneFileUpload';
import { useNavigate } from 'react-router';

function CallButton() {
    const navigate = useNavigate();

    // Handle button click to initiate a Google Meet call
    const handleCall = () => {
        // Generate a Google Meet link
        const meetUrl = `https://meet.google.com/new`;
        // Open Google Meet link in a new tab
        window.open(meetUrl, '_blank');
    };

    return (
        <div className="wflexLayout">
            <div className='al-pad d-flex align-items-center pb-1'>
                <Col className='d-flex align-items-center'>
                    <button type="button" className="al_savebtn mb-0" onClick={handleCall} >
                        Start Google Meet Call
                    </button>
                </Col>
                <Col className='d-flex align-items-center'>
                    <button type="button" className="al_add_dashed_button mb-0" onClick={() => navigate("/sharezone")} >
                        Back
                    </button>
                </Col>
            </div>
            <ShareZoneFileUpload />
        </div>
    );
}

export default CallButton;
