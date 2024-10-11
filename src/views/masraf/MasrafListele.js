import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table, Badge, Pagination } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import axios from 'axios';
import { useHistory, Route } from 'react-router-dom';
import MasrafDetay from 'views/masraf/MasrafDetay';

const MasrafListele = () => {
  const title = 'Masraf Listele';
  const description = 'Masraf listeleme ve detay görüntüleme ekranı.';
  const breadcrumbs = [{ to: '', text: 'Home' }];

  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const history = useHistory();
  const [role, setRole] = useState(''); // Yeni eklenen state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='))
          ?.split('=')[1];

        const roleFromCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('role='))
          ?.split('=')[1];

        const fullName = document.cookie
          .split('; ')
          .find((row) => row.startsWith('fullName='))
          ?.split('=')[1];

        const userId = document.cookie
          .split('; ')
          .find((row) => row.startsWith('userId='))
          ?.split('=')[1];

        setRole(roleFromCookie); // role değişkenini güncelliyoruz

        if (!accessToken) {
          console.error('Access Token bulunamadı!');
          return;
        }

        // role bilgisi SuperAdmin veya Admin ise GetUsers çağrısı yap
        if (roleFromCookie === 'SuperAdmin' || roleFromCookie === 'Admin') {
          const userResponse = await axios.get('https://api.herohrm.com/api/Admin/GetUsers', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUser(userResponse.data.users || []);
        } else {
          // role User ise sadece cookie'deki bilgiyi kullan
          setUser({ fullName, id: userId });
        }

        const categoryResponse = await axios.get('https://api.herohrm.com/api/Category/GetCategories', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCategories(categoryResponse.data.model || []);

        const projectResponse = await axios.get('https://api.herohrm.com/api/Project/GetProjects', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProjects(projectResponse.data.model.data || []);
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
      setSubCategories(selectedCategoryObj.getSubCategories || []);
    } else {
      setSubCategories([]);
    }
  };

  const handleFilter = async (page = 1) => {
    setLoading(true);
    try {
      const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      const approvalStatus = document.getElementById('formStatus').value;
      const minExpenseDate = document.getElementById('formMinExpenseDate').value;
      const maxExpenseDate = document.getElementById('formMaxExpenseDate').value;

      const params = {};
      if (user?.id) params.UserId = user.id;
      if (selectedCategory) params.CategoryId = selectedCategory;
      if (approvalStatus) params.ApprovalStatus = approvalStatus === 'true';
      if (minExpenseDate) params.MinExpenseDate = minExpenseDate;
      if (maxExpenseDate) params.MaxExpenseDate = maxExpenseDate;

      params.CurrentPage = page;
      params.PageSize = 5;

      const response = await axios.get('https://api.herohrm.com/api/Expense/GetExpenses', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      });

      setExpenses(response.data.expenses || []);
      setTotalPages(response.data.paging.totolPageCount || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error('Filtreleme sırasında hata oluştu:', error);
    }
    setLoading(false);
  };

  const handleViewDetails = (expenseId) => {
    history.push(`/masraf/masrafdetay/${expenseId}`);
  };

  const handlePageChange = (pageNumber) => {
    handleFilter(pageNumber);
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

      {/* Filtreleme Alanı */}
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formUser">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control as="select" disabled={user?.id}>
                    {role === 'SuperAdmin' || role === 'Admin' ? (
                      <>
                        <option>Seçiniz</option>
                        {user && user.length > 0 // user null veya undefined olup olmadığını kontrol ediyoruz
                          ? user.map((userItem) => (  // 'userItem' olarak değiştirildi
                            <option key={userItem.id} value={userItem.id}>
                              {userItem.fullName}
                            </option>
                          ))
                          : <option>Kullanıcı bulunamadı</option>}
                      </>
                    ) : (
                      <option value={user?.id}>{user?.fullName}</option>
                    )}
                  </Form.Control>

                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formCategory">
                  <Form.Label>Masraf Kategori</Form.Label>
                  <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                    <option>Seçiniz</option>
                    {categories.length > 0
                      ? categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))
                      : <option>Yükleniyor...</option>}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="formProject">
                  <Form.Label>Proje</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    {projects.length > 0
                      ? projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.projectName}
                        </option>
                      ))
                      : <option>Yükleniyor...</option>}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Group controlId="formSubCategory">
                  <Form.Label>Alt Masraf Kategori</Form.Label>
                  <Form.Control as="select">
                    <option>Seçiniz</option>
                    {subCategories.length > 0
                      ? subCategories.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.subCategoryName}
                        </option>
                      ))
                      : <option>Alt kategori bulunamadı</option>}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="formMinExpenseDate">
                  <Form.Label>Başlangıç Tarihi</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="formMaxExpenseDate">
                  <Form.Label>Bitiş Tarihi</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Onay Durumu</Form.Label>
                  <Form.Control as="select">
                    <option value="">Seçiniz</option>
                    <option value="true">Onaylandı</option>
                    <option value="false">Beklemede/Reddedildi</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button className="mt-3" variant="primary" onClick={() => handleFilter(1)}>
              Filtrele
            </Button>
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
                  expense.id ? (
                    <tr key={expense.id}>
                      <td>{expense.fullName}</td>
                      <td>{getStatusText(expense.status)}</td>
                      <td>{expense.id}</td>
                      <td>{new Date(expense.receiptDate).toLocaleDateString()}</td>
                      <td>{expense.projectName}</td>
                      <td>{expense.categoryName}</td>
                      <td>{expense.totalAmount} TL</td>
                      <td>{expense.taxTotal} TL</td>
                      <td>
                        <Button
                          onClick={() => handleViewDetails(expense.id)}
                          className="btn btn-outline-secondary text-white"
                        >
                          Detay Görüntüle
                        </Button>
                      </td>
                    </tr>
                  ) : null
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

<Route path="/masraf/masrafdetay/:expenseId" component={MasrafDetay} />

export default MasrafListele;
