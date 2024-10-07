import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table, Badge } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const MasrafListele = () => {
  const title = 'Masraf Listele';
  const description = 'Masraf listeleme ve detay görüntüleme ekranı.';
  const breadcrumbs = [{ to: '', text: 'Home' }];

  const [filterVisible, setFilterVisible] = useState(false);
  const [users, setUsers] = useState([]); // Kullanıcıları tutmak için state
  const [categories, setCategories] = useState([]); // Kategorileri tutmak için state
  const [selectedCategory, setSelectedCategory] = useState(''); // Seçilen kategori
  const [subCategories, setSubCategories] = useState([]); // Seçilen kategorinin alt kategorileri
  const [projects, setProjects] = useState([]); // Projeleri tutmak için state

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  // Kullanıcıları, kategorileri ve projeleri API'den çekmek için useEffect
  useEffect(() => {
    const fetchUsersCategoriesAndProjects = async () => {
      try {
        const accessToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='))
          ?.split('=')[1];

        // Kullanıcıları çek
        const userResponse = await axios.get('https://api.herohrm.com/api/Admin/GetUsers', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(userResponse.data.users); // Gelen kullanıcıları kaydet

        // Kategorileri çek
        const categoryResponse = await axios.get('https://api.herohrm.com/api/Category/GetCategories', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCategories(categoryResponse.data.data); // Gelen kategorileri kaydet

        // Projeleri çek
        const projectResponse = await axios.get('https://api.herohrm.com/api/Project/GetProjects', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProjects(projectResponse.data.data); // Gelen projeleri kaydet
      } catch (error) {
        console.error('API istekleri sırasında hata oluştu:', error);
      }
    };

    fetchUsersCategoriesAndProjects();
  }, []); // Sayfa yüklendiğinde sadece bir kere çalışacak

  // Kategori değiştirildiğinde alt kategorileri ayarlamak
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);

    // Seçilen kategoriye ait alt kategorileri bul
    const selectedCategoryObj = categories.find((category) => category.id === selectedCategoryId);
    if (selectedCategoryObj) {
      setSubCategories(selectedCategoryObj.getSubCategories);
    } else {
      setSubCategories([]);
    }
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
              {/* Kullanıcı Adı */}
              <Col md={4}>
                <Form.Group controlId="formUser">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.fullName}
                        </option>
                      ))
                    ) : (
                      <option>Yükleniyor...</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* Kategori */}
              <Col md={4}>
                <Form.Group controlId="formCategory">
                  <Form.Label>Masraf Kategori</Form.Label>
                  <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option>Seçiniz</option>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))
                    ) : (
                      <option>Yükleniyor...</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* Alt Kategori */}
              <Col md={4}>
                <Form.Group controlId="formSubCategory">
                  <Form.Label>Alt Masraf Kategori</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    {subCategories.length > 0 ? (
                      subCategories.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.subCategoryName}
                        </option>
                      ))
                    ) : (
                      <option>Alt kategori bulunamadı</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* Masraf Tarihi */}
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
              {/* Onay Durum */}
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
              {/* Proje */}
              <Col md={4}>
                <Form.Group controlId="formProject">
                  <Form.Label>Proje</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.projectName} {/* Proje adını burada basıyoruz */}
                        </option>
                      ))
                    ) : (
                      <option>Yükleniyor...</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {/* Filtreleme Butonları */}
            <Button className="mt-3" onClick={toggleFilter}>
              {filterVisible ? 'Filtreyi Gizle' : 'Detaylı Filtre'}
            </Button>
            {!filterVisible && (
              <Button className="mt-3 ms-2" variant="success">Filtrele</Button>
            )}
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
                <Button className="mt-3 ms-2" variant="success">Filtrele</Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Masraf Tablosu */}
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
