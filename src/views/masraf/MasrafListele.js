import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Table, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { NavLink } from 'react-router-dom';

const MasrafListele = () => {
  const title = 'Masraf Listele';
  const description = 'Masraf listeleme ve detay görüntüleme ekranı.';
  const breadcrumbs = [{ to: '', text: 'Home' }];

  const [filterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Row>
        <Col>
          <section className="scroll-section" id="title">
            <div className="page-title-container">
              <h1 className="mb-0 pb-0 display-4">{title}</h1>
              <BreadcrumbList items={breadcrumbs} />
            </div>
            <Card className="mb-5" body>
              <Card.Text>{description}</Card.Text>
            </Card>
          </section>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formUser">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    <option>User 1</option>
                    <option>User 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formCategory">
                  <Form.Label>Masraf Kategori</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    <option>Sağlık</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formSubCategory">
                  <Form.Label>Alt Masraf Kategori</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    <option>Gıda</option>
                    <option>Ulaşım</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formDate">
                  <Form.Label>Masraf Tarihi</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    <option>12/7/22</option>
                    <option>12/6/22</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Onay Durum</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    <option>Beklemede</option>
                    <option>Onaylandı</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formProject">
                  <Form.Label>Proje</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    <option>Proje 1</option>
                    <option>Proje 2</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3" onClick={toggleFilter}>
              {filterVisible ? 'Filtreyi Gizle' : 'Detaylı Filtre'}
            </Button>
            {filterVisible && (
              <div className="mt-3">
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formMasrafNo">
                      <Form.Label>Masraf No</Form.Label>
                      <Form.Control as="select">
                        <option>Seçiniz</option>
                        <option>1</option>
                        <option>2</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMinDate">
                      <Form.Label>Min. Tarih</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMaxDate">
                      <Form.Label>Maks. Tarih</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMinTotal">
                      <Form.Label>Min. Toplam Tutar</Form.Label>
                      <Form.Control type="number" placeholder="Min. Toplam Tutar" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMaxTotal">
                      <Form.Label>Maks. Toplam Tutar</Form.Label>
                      <Form.Control type="number" placeholder="Maks. Toplam Tutar" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMinKdv">
                      <Form.Label>Min. KDV Tutarı</Form.Label>
                      <Form.Control type="number" placeholder="Min. KDV Tutarı" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMaxKdv">
                      <Form.Label>Maks. KDV Tutarı</Form.Label>
                      <Form.Control type="number" placeholder="Maks. KDV Tutarı" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formKdvOrani">
                      <Form.Label>KDV Oranı</Form.Label>
                      <Form.Control as="select">
                        <option>Seçiniz</option>
                        <option>1</option>
                        <option>10</option>
                        <option>20</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h4 className="card-title">MASRAF TABLOSU</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Kullanıcı Adı</th>
                <th>Durum</th>
                <th>Fiş No</th>
                <th>Fiş Tarihi</th>
                <th>Proje</th>
                <th>Kategori</th>
                <th>Alt Kategori</th>
                <th>Satıcı Firma</th>
                <th>Vergi Numarası</th>
                <th>Matrah</th>
                <th>KDV Tutarı</th>
                <th>KDV Oranı</th>
                <th>Toplam Tutar</th>
                <th>Detay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>User 1</td>
                <td>
                  <Badge bg="warning">Beklemede</Badge>
                </td>
                <td>1</td>
                <td>12/7/22</td>
                <td>Proje A</td>
                <td>Kategori A</td>
                <td>Alt Kategori A</td>
                <td>Firma A</td>
                <td>8594859</td>
                <td>50 TL</td>
                <td>10</td>
                <td>%5</td>
                <td>60 TL</td>
                <td>
                  <NavLink to="/masraf-detaylar" className="btn btn-outline-secondary">
                    Detay Görüntüle
                  </NavLink>
                </td>
              </tr>
              {/* Additional rows can go here */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default MasrafListele;
