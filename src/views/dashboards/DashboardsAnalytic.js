import React from 'react';
import { Button, Row, Col, Card, Dropdown, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import ChartCustomHorizontalTooltip from 'views/interface/plugins/chart/ChartCustomHorizontalTooltip';
import ChartLargeLineStock from 'views/interface/plugins/chart/ChartLargeLineStock';
import ChartLargeLineSales from 'views/interface/plugins/chart/ChartLargeLineSales';
import Glide from 'components/carousel/Glide';



const DashboardsAnalytic = () => {
  const title = 'Analitik Dashboard';
  const description = 'Analytic Dashboard';

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'dashboards', text: 'Dashboards' },
  ];

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <h3>Anlık Bilgiler</h3>
      {/* Title and Top Buttons End */}

      <Row>
        <Col lg="6">
          {/* Stats Start */}

          <div className="mb-5">
            <Row className="g-2">
              <Col sm="6">
                <Card className="sh-11 hover-scale-up cursor-pointer">
                  <Card.Body className="h-100 py-3 align-items-center">
                    <Row className="g-0 h-100 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                          <CsLineIcons icon="check-square" className="text-white" />
                        </div>
                      </Col>
                      <Col>
                        <Row className="gx-2 d-flex align-content-center">
                          <Col xs="12" className="col-12 d-flex">
                            <div className="d-flex align-items-center lh-1-25">Onay Bekleyen</div>
                          </Col>
                          <Col xl="auto" className="col-12">
                            <div className="cta-2 text-primary">22</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="sh-11 hover-scale-up cursor-pointer">
                  <Card.Body className="h-100 py-3 align-items-center">
                    <Row className="g-0 h-100 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                          <CsLineIcons icon="slash" className="text-white" />
                        </div>
                      </Col>
                      <Col>
                        <Row className="gx-2 d-flex align-content-center">
                          <Col xs="12" className="col-12 d-flex">
                            <div className="d-flex align-items-center lh-1-25">Red Edilen</div>
                          </Col>
                          <Col xl="auto" className="col-12">
                            <div className="cta-2 text-primary">35</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="sh-11 hover-scale-up cursor-pointer">
                  <Card.Body className="h-100 py-3 align-items-center">
                    <Row className="g-0 h-100 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                          <CsLineIcons icon="check" className="text-white" />
                        </div>
                      </Col>
                      <Col>
                        <Row className="gx-2 d-flex align-content-center">
                          <Col xs="12" className="col-12 d-flex">
                            <div className="d-flex align-items-center lh-1-25">Onaylanan</div>
                          </Col>
                          <Col xl="auto" className="col-12">
                            <div className="cta-2 text-primary">22</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Card className="sh-11 hover-scale-up cursor-pointer">
                  <Card.Body className="h-100 py-3 align-items-center">
                    <Row className="g-0 h-100 align-items-center">
                      <Col xs="auto" className="pe-3">
                        <div className="bg-gradient-light sh-5 sw-5 rounded-xl d-flex justify-content-center align-items-center">
                          <CsLineIcons icon="user" className="text-white" />
                        </div>
                      </Col>
                      <Col>
                        <Row className="gx-2 d-flex align-content-center">
                          <Col xs="12" className="col-12 d-flex">
                            <div className="d-flex align-items-center lh-1-25">Kullanıcı Sayısı</div>
                          </Col>
                          <Col xl="auto" className="col-12">
                            <div className="cta-2 text-primary">3</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl="6">
          {/* Sales & Stocks Charts Start */}



          {/* Stats End */}
        </Col>
            </Row>
          </div>
          {/* Stats End */}

          {/* Sales Start */}
          <h2 className="small-title">Kategorilere Göre Masraflar</h2>
          <Card className="mb-5 sh-40">
            <Card.Body>
              <ChartCustomHorizontalTooltip />
            </Card.Body>
          </Card>
          {/* Sales End */}
        </Col>

        <Col lg="6" className="mb-5">
          <h2 className="small-title">Yıllık Masraf İstatistikleri</h2>
          <Row className="g-2">
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up" id="introThird">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="board-1" className="text-primary" />
                    <p className="heading mt-3 text-body">Yıllık Masraf Tutarı</p>
                    <div className="fw-medium text-muted">35.000 TL</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="board-2" className="text-primary" />
                    <p className="heading mt-3 text-body">Yıllık Masraf Sayısı</p>
                    <div className="fw-medium text-muted">300</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="board-3" className="text-primary" />
                    <p className="heading mt-3 text-body">Yıllık Masraf Ortalaması</p>
                    <div className="fw-medium text-muted">10.200 TL</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <h2 className="small-title">Aylık Masraf İstatistikleri</h2>

            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="board-1" className="text-primary" />
                    <p className="heading mt-3 text-body">Aylık Masraf Tutarı                    </p>
                    <div className="fw-medium text-muted">"1000 TL</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="board-2" className="text-primary" />
                    <p className="heading mt-3 text-body">Aylık Masraf Sayısı
                    </p>
                    <div className="fw-medium text-muted">6</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <Col xs="6" xl="4" className="sh-19">
              <Card className="h-100 hover-scale-up">
                <Card.Body className="text-center">
                  <NavLink to="#">
                    <CsLineIcons icon="board-3" className="text-primary" />
                    <p className="heading mt-3 text-body">Aylık Masraf Ortalaması</p>
                    <div className="fw-medium text-muted">500 TL</div>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
            <h2 className="small-title">Masraf Giriş Özeti</h2>
          <Card className="mb-2 h-auto sh-xl-24" id="introFirst">
            <Card.Body>
              <Row className="g-0 h-100">
                <ChartLargeLineSales />
              </Row>
            </Card.Body>
          </Card>
          </Row>
        </Col>

      </Row>

    </>
  );
};

export default DashboardsAnalytic;