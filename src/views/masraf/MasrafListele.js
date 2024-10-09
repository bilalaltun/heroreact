import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table, Badge, Spinner, Pagination } from 'react-bootstrap';
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
  const [expenses, setExpenses] = useState([]); // Masraf verilerini tutmak için state
  const [loading, setLoading] = useState(false); // Loader durumu
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa numarası
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  // Kullanıcıları, kategorileri, projeleri ve masraf verilerini API'den çekmek için useEffect
  useEffect(() => {
    const fetchData = async () => {
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
        setUsers(userResponse.data.users || []);

        // Kategorileri çek
        const categoryResponse = await axios.get('https://api.herohrm.com/api/Category/GetCategories', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCategories(categoryResponse.data.model || []); // 'model' içindeki veriyi aldık.

        // Projeleri çek
        const projectResponse = await axios.get('https://api.herohrm.com/api/Project/GetProjects', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProjects(projectResponse.data.model.data || []); // 'model.data' içindeki veriyi aldık.
      } catch (error) {
        console.error('API istekleri sırasında hata oluştu:', error);
      }
    };

    fetchData();
  }, []); // Sayfa yüklendiğinde sadece bir kere çalışacak

  // Kategori değiştirildiğinde alt kategorileri ayarlamak
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);

    // Seçilen kategoriye ait alt kategorileri bul
    const selectedCategoryObj = categories.find((category) => category.id === selectedCategoryId);
    if (selectedCategoryObj) {
      setSubCategories(selectedCategoryObj.getSubCategories || []);
    } else {
      setSubCategories([]);
    }
  };

  // Filtreleme işlemi yapıldığında
  const handleFilter = async (page = 1) => {
    setLoading(true); // Loader başlat
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      // Formdan seçilen değerleri alalım
      const selectedUserId = document.getElementById('formUser').value;
      const selectedProjectId = document.getElementById('formProject').value;
      const approvalStatus = document.getElementById('formStatus').value;
      const minExpenseDate = document.getElementById('formMinExpenseDate').value;
      const maxExpenseDate = document.getElementById('formMaxExpenseDate').value;

      // Dinamik olarak doldurulmuş parametreleri oluşturuyoruz
      const params = {};

      if (selectedUserId) {
        params.UserId = selectedUserId;
      }

      if (selectedCategory) {
        params.CategoryId = selectedCategory;
      }

      if (selectedProjectId) {
        params.ProjectId = selectedProjectId;
      }

      if (approvalStatus) {
        params.ApprovalStatus = approvalStatus === "true"; // Onaylandı true olarak gönderilecek
      }

      if (minExpenseDate) {
        params.MinExpenseDate = minExpenseDate;
      }

      if (maxExpenseDate) {
        params.MaxExpenseDate = maxExpenseDate;
      }

      // Sayfa numarası ve boyut gibi sabit parametreleri ekleyelim
      params.CurrentPage = page;
      params.PageSize = 5;

      // API isteğini yapalım
      const response = await axios.get('https://api.herohrm.com/api/Expense/GetExpenses', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      setExpenses(response.data.expenses || []); // Gelen masraf verilerini state'e kaydet
      setTotalPages(response.data.paging.totolPageCount || 1); // Toplam sayfa sayısını ayarla
      setCurrentPage(page); // Mevcut sayfa numarasını güncelle
    } catch (error) {
      console.error('Filtreleme sırasında hata oluştu:', error);
    }
    setLoading(false); // Loader durdur
  };

  // Sayfalama işlevi
  const handlePageChange = (pageNumber) => {
    handleFilter(pageNumber); // Filtreleme fonksiyonuna sayfa numarasını geçir
  };

  // Durumu anlamlı bir şekilde gösterme fonksiyonu
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
              {/* Proje */}
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
            <Row>
              {/* Alt Kategori */}
              <Col md={3}>
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
              {/* Başlangıç Tarihi */}
              <Col md={3}>
                <Form.Group controlId="formMinExpenseDate">
                  <Form.Label>Başlangıç Tarihi</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              {/* Bitiş Tarihi */}
              <Col md={3}>
                <Form.Group controlId="formMaxExpenseDate">
                  <Form.Label>Bitiş Tarihi</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              {/* Onay Durum */}
              <Col md={3}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Onay Durum</Form.Label>
                  <Form.Control as="select">
                    <option value="">Seçiniz</option>
                    <option value="true">Onaylandı</option>
                    <option value="false">Beklemede/Reddedildi</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3" onClick={toggleFilter}>
              {filterVisible ? 'Filtreyi Gizle' : 'Detaylı Filtre'}
            </Button>
            {!filterVisible && (
              <Button className="mt-3 ms-2" variant="success" onClick={() => handleFilter(1)}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Filtrele'}
              </Button>
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
                      <NavLink to={`/masraf-detaylar/${expense.id}`} className="btn btn-outline-secondary">
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

          {/* Sayfalama */}
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </Card.Body>
      </Card>
    </>
  );
};

export default MasrafListele;
