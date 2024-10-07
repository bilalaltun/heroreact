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
  const [users, setUsers] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [subCategories, setSubCategories] = useState([]); 
  const [projects, setProjects] = useState([]); 
  const [expenses, setExpenses] = useState([]); 

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='))
          ?.split('=')[1];

        const userResponse = await axios.get('https://api.herohrm.com/api/Admin/GetUsers', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(userResponse.data.users);

        const categoryResponse = await axios.get('https://api.herohrm.com/api/Category/GetCategories', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCategories(categoryResponse.data.data);

        const projectResponse = await axios.get('https://api.herohrm.com/api/Project/GetProjects', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProjects(projectResponse.data.data);

        // Masraf verilerini çek
        const expenseResponse = await axios.get('https://api.herohrm.com/api/Expense/GetExpenses', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setExpenses(expenseResponse.data.expenses || []); // expenses array'ini doğru şekilde kaydet
      } catch (error) {
        console.error('API istekleri sırasında hata oluştu:', error);
      }
    };

    fetchData();
  }, []); 

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);

    const selectedCategoryObj = categories.find((category) => category.id === selectedCategoryId);
    if (selectedCategoryObj) {
      setSubCategories(selectedCategoryObj.getSubCategories);
    } else {
      setSubCategories([]);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return <Badge bg="warning">Beklemede</Badge>;
      case 1:
        return <Badge bg="success">Onaylandı</Badge>;
      case 2:
        return <Badge bg="danger">Reddedildi</Badge>;
      default:
        return <Badge bg="secondary">Bilinmiyor</Badge>;
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
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.projectName}
                        </option>
                      ))
                    ) : (
                      <option>Yükleniyor...</option>
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3" onClick={toggleFilter}>
              {filterVisible ? 'Filtreyi Gizle' : 'Detaylı Filtre'}
            </Button>
            {!filterVisible && (
              <Button className="mt-3 ms-2" variant="success">
                Filtrele
              </Button>
            )}
            {filterVisible && (
              <div className="mt-3">
                {/* Detaylı filtreleme alanı */}
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
                <th>Personel Adı</th>
                <th>Durum</th>
                <th>Masraf ID</th>
                <th>Masraf Tarihi</th>
                <th>Proje Adı</th>
                <th>Kategori</th>
                <th>Toplam Tutar</th>
                <th>KDV Tutarı</th>
                <th>Detay</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.fullName}</td>
                    <td>{getStatusText(expense.status)}</td>
                    <td>{expense.id}</td>
                    <td>{new Date(expense.receiptDate).toLocaleDateString()}</td>
                    <td>{expense.projecName}</td>
                    <td>{expense.categoryName}</td>
                    <td>{expense.totalAmount} TL</td>
                    <td>{expense.taxTotal} TL</td>
                    <td>
                      <NavLink to="/masraf-detaylar" className="btn btn-outline-secondary">
                        Detay Görüntüle
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Veri bulunamadı</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default MasrafListele;
