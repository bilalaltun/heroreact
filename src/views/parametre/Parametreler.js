import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const Parametreler = () => {
    const title = 'Parametreler';
    const description =
        'Parametre modüllerine buradan erişebilirsiniz';

    const breadcrumbs = [{ to: 'parametre/parametreler', text: 'Anasayfa' }];

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
                                <NavLink to="/parametre/proje" className="heading stretched-link d-block">
                                    Proje Tanımları
                                </NavLink>
                                <div className="text-muted">Proje tanımlarını yönetin.</div>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="h-100">
                        <Card.Body className="row gx-4">
                            <Col xs="auto">
                                <CsLineIcons icon="phone" className="text-primary" />
                            </Col>
                            <Col>
                                <NavLink to="/parametre/kategoriler" className="heading stretched-link d-block">
                                    Kategoriler                </NavLink>
                                <div className="text-muted">Kategorileri yönetin</div>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="h-100">
                        <Card.Body className="row gx-4">
                            <Col xs="auto">
                                <CsLineIcons icon="phone" className="text-primary" />
                            </Col>
                            <Col>
                                <NavLink to="/parametre/kdv" className="heading stretched-link d-block">
                                    KDV Oranları                </NavLink>
                                <div className="text-muted">KDV oranlarını yönetin</div>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* List Items End */}
        </>
    );
};

export default Parametreler;
