import React from 'react';
import Lottie from 'react-lottie';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import animationData from '../../images/home_page_animation.json';
import Footer from './Footer';
import Header from './Header';
import Section from './Section';

export default function About() {
  pageTitle('About');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
      <Row className='h-100 mx-0'>
        <Col lg="12" id='al_main_landing' className='px-0'>
          <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />

          <Section topMd={0} topLg={0} topXl={0}>
            <div className='w-80 mx-auto abouttop'>
              <Row className='my-5'>
                <Col className='pe-5' style={{ paddingTop: "80px" }}>
                  <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
                    Welcome to ShareZone
                  </h3>
                  <h6 className='fw-medium'>Hi, I am introducing new collaboration platform for Students, Let's dig out the summarized features of it</h6>
                  <p>It's the platform where you can collaborate with your friends, without worring about distance, this application will let you collaborate with your friends
                    globally without any restrictions.
                  </p>
                  <p>you can invite your friends, create your own study space, can store your files and also <b>take an teacher's Help wchich is an <em><b>AI assitant</b></em></b></p>
                </Col>
                <Col>
                  <div className='px-3 w-auto'>
                    <Lottie
                      options={defaultOptions}
                      height={500}
                      width={600}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='w-80 mx-auto'>
              <div className='alfaq_footer'>
                References -- google classroom, openAi, google applications, oAuth
              </div>
            </div>
          </Section>
          <Footer />
        </Col>
      </Row>
    </>
  );
}
