import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const Masraf = () => {
  const title = 'Masraflar';
  const description =
    'Masraf ile ilgili sayfalara buradan rahatlıkla ulaşım sağlayabilirsiniz.';

  const breadcrumbs = [{ to: 'dashboards/analytic', text: 'Anasayfa' }];

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          {/* Title Start */}
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>
            <Card className="mb-5" body>
              <Card.Text>{description}</Card.Text>
            </Card>
          </section>
          {/* Title End */}
        </Col>
      </Row>
      {/* List Items Start */}
      <Row xs="1" sm="2" xl="3" className="g-2">
        <Col>
          <Card className="h-100">
            <Card.Body className="row gx-4">
              <Col xs="auto">
                <CsLineIcons icon="calendar" className="text-primary" />
              </Col>
              <Col>
                <NavLink to="/masraf/masrafekle" className="heading stretched-link d-block">
                  Masraf Ekle
                </NavLink>
                <div className="text-muted">Masraf girişi sayfası.</div>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body className="row gx-4">
              <Col xs="auto">
                <CsLineIcons icon="message" className="text-primary" />
              </Col>
              <Col>
                <NavLink to="/masraf/masraflistele" className="heading stretched-link d-block">
                  Masraf Listele
                </NavLink>
                <div className="text-muted">Masraf listeleme sayfası.</div>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* List Items End */}
    </>
  );
};

export default Masraf;
