import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./About.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();
  }, []);
  return (
    <section className="about-wrapper">
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <div className="about-left">
              <img
                src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/2/10/kqxs-formal-16760153917442018849280.png"
                className="card-img"
                alt="logo"
              />
            </div>
          </Col>
          <Col md={12} lg={6}>
            <div className="about-right mt-5 mt-lg-0">
              <div className="about-content text-start" data-aos="zoom-in">
                <h1>Welcome to our Service</h1>
                <p>
                  The Northern Lottery is drawn alternately by 6 provinces and
                  cities with prizes opened by the State with the goal of
                  "Benefiting the country, benefiting the people", building
                  infrastructure, and serving people's lives.
                </p>
              </div>
              <div className="fun-fact-sec" data-aos="fade-right">
                <div className="single-fun">
                  <span>500</span>
                  <span>+</span>
                  <p>Lucky Number</p>
                </div>
                <div className="single-fun sp-fun" data-aos="fade-right">
                  <span>88</span>
                  <span>+</span>
                  <p>Prize</p>
                </div>
                <div className="single-fun" data-aos="fade-left">
                  <span>10</span>
                  <span>+</span>
                  <p>Years Experience</p>
                </div>
                <div className="single-fun sp-fun" data-aos="fade-left">
                  <span>50</span>
                  <span>+</span>
                  <p>Awards</p>
                </div>
                <span className="line"></span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
