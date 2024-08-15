import React, { useState } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

export default function Dashboard1() {

    const [tab, setTab] = useState("1");

    return (
        <>
            <div className="wflexLayout">
                <div className='wflexScroll al-pad'>
                    <h3 className='bc_main_text mb-3'>Dashboard</h3>
                    {/* <div className='my-2'>
                        <button type="button" className='al_grey_borderbtn me-2'>Schedules</button>
                        <button type="button" className='al_grey_borderbtn me-2'>Doctors</button>
                        <button type="button" className='al_grey_borderbtn'>BMI Calculator</button>
                    </div> */}
                    <Nav tabs className="al_tabs mb-3">
                        <NavItem>
                            <NavLink className={tab === "1" ? "active" : ""}
                                onClick={() => {
                                    setTab("1");

                                }}>
                                <span className="d-none d-sm-block">Your Share Zone</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "2" ? "active" : ""}
                                onClick={() => {
                                    setTab("2");
                                }}>
                                <span className="d-none d-sm-block">Your Files</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={tab === "2" ? "active" : ""}
                                onClick={() => {
                                    setTab("2");
                                }}>
                                <span className="d-none d-sm-block">Friends Share Zone</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tab}>
                        <TabPane tabId="1" className="al_card_diff">
                            <Row>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Room1</div>
                                            <img src={""} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'>Description:Software Engineer</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Room2</div>
                                            <img src={""} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'>Description:Software Engineer</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2" className="al_card_diff">
                            <Row>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Room1</div>
                                            <img src={""} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'>Description:Software Engineer</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Room2</div>
                                            <img src={""} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'>Description:Software Engineer</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3" className="al_card_diff">
                            <Row>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Room1</div>
                                            <img src={""} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'>Description:Software Engineer</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="2" sm="3">
                                    <Card>
                                        <CardBody>
                                            <div className='mb-3'>Room2</div>
                                            <img src={""} alt="" />
                                            <div className='d-flex align-items-baseline mt-3'>Description:Software Engineer</div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                    <div className='mt-3'>
                        <h6 className='mb-0'>Knowledge Bank</h6>
                        <Row className='mt-3 al_knowldgebank'>
                            {/* <Col lg="2" sm="3">
                                <iframe width="100%" height="105" src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                <div className='mt-2'>Text of the printing and typesetting industry.</div>
                            </Col> */}
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}