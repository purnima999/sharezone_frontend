import React from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Loading from './Loading';

export default function NonAuthLayout() {
    return (
        <Row className='h-100 mx-0'>
            <Col lg="12" id='al_main_landing' className='px-0'>
                <Outlet />
            </Col>
            <Loading />
        </Row>
    );
}
