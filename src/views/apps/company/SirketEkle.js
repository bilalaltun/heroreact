import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const SirketEkle = () => {
  const [companyData, setCompanyData] = useState({
    CompanyName: '',
    Image: null,
    Email: '',
    City: '',
    District: '',
    Address: '',
    State: true,
    CompanyAdmin: {
      UserName: '',
      FullName: '',
      Email: '',
      Password: '',
      PasswordConfirm: ''
    }
  });

  const [companies, setCompanies] = useState([]);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  // Şirketler listesini getir - GetAllCompany API İsteği
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await fetch('https://api.herohrm.com/api/SuperAdmin/GetAllCompany', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.isSucceeded) {
          setCompanies(data.model.data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: data.message,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: 'Şirketler alınırken bir hata oluştu.',
        });
      }
    };

    getCompanies();
  }, [accessToken]);

  // Şirket Kaydet - AddCompany API İsteği
  const handleAddCompany = async () => {
    const formData = new FormData();
    formData.append('CompanyName', companyData.CompanyName);
    formData.append('Image', companyData.Image);
    formData.append('Email', companyData.Email);
    formData.append('City', companyData.City);
    formData.append('District', companyData.District);
    formData.append('Address', companyData.Address);
    formData.append('State', companyData.State);
    formData.append('CompanyAdmin.UserName', companyData.CompanyAdmin.UserName);
    formData.append('CompanyAdmin.FullName', companyData.CompanyAdmin.FullName);
    formData.append('CompanyAdmin.Email', companyData.CompanyAdmin.Email);
    formData.append('CompanyAdmin.Password', companyData.CompanyAdmin.Password);
    formData.append('CompanyAdmin.PasswordConfirm', companyData.CompanyAdmin.PasswordConfirm);

    try {
      const response = await fetch('https://api.herohrm.com/api/SuperAdmin/AddCompany', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData
      });

      const result = await response.json();

      if (result.isSucceeded) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Şirket başarıyla eklendi.',
        }).then(() => {
          window.location.reload(); // Sayfa yenileme
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: result.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Şirket eklenirken bir hata oluştu.',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setCompanyData((prevData) => ({
      ...prevData,
      Image: e.target.files[0]
    }));
  };

  return (
    <div className="container mt-4">
      {/* Şirket Ekleme Formu */}
      <Card>
        <Card.Body>
          <h4>Şirket Ekleme Formu</h4>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Label>Şirket Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Şirket Adı Giriniz"
                name="CompanyName"
                value={companyData.CompanyName}
                onChange={handleInputChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Şirket Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Şirket Email Giriniz"
                name="Email"
                value={companyData.Email}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="align-items-center mt-3">
            <Col md={6}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Şehir Giriniz"
                name="City"
                value={companyData.City}
                onChange={handleInputChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                placeholder="İlçe Giriniz"
                name="District"
                value={companyData.District}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="align-items-center mt-3">
            <Col md={6}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adres Giriniz"
                name="Address"
                value={companyData.Address}
                onChange={handleInputChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Resim</Form.Label>
              <Form.Control
                type="file"
                name="Image"
                onChange={handleFileChange}
              />
            </Col>
          </Row>

          <h5 className="mt-4">Şirket Admin Bilgileri</h5>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kullanıcı Adı Giriniz"
                name="UserName"
                value={companyData.CompanyAdmin.UserName}
                onChange={(e) =>
                  setCompanyData((prevData) => ({
                    ...prevData,
                    CompanyAdmin: {
                      ...prevData.CompanyAdmin,
                      UserName: e.target.value,
                    },
                  }))
                }
              />
            </Col>

            <Col md={6}>
              <Form.Label>Ad Soyad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ad Soyad Giriniz"
                name="FullName"
                value={companyData.CompanyAdmin.FullName}
                onChange={(e) =>
                  setCompanyData((prevData) => ({
                    ...prevData,
                    CompanyAdmin: {
                      ...prevData.CompanyAdmin,
                      FullName: e.target.value,
                    },
                  }))
                }
              />
            </Col>
          </Row>

          <Row className="align-items-center mt-3">
            <Col md={6}>
              <Form.Label>Şirket Admin Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Giriniz"
                name="AdminEmail"
                value={companyData.CompanyAdmin.Email}
                onChange={(e) =>
                  setCompanyData((prevData) => ({
                    ...prevData,
                    CompanyAdmin: {
                      ...prevData.CompanyAdmin,
                      Email: e.target.value,
                    },
                  }))
                }
              />
            </Col>

            <Col md={6}>
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre Giriniz"
                name="Password"
                value={companyData.CompanyAdmin.Password}
                onChange={(e) =>
                  setCompanyData((prevData) => ({
                    ...prevData,
                    CompanyAdmin: {
                      ...prevData.CompanyAdmin,
                      Password: e.target.value,
                    },
                  }))
                }
              />
            </Col>
          </Row>

          <Row className="align-items-center mt-3">
            <Col md={6}>
              <Form.Label>Şifre Tekrar</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre Tekrar Giriniz"
                name="PasswordConfirm"
                value={companyData.CompanyAdmin.PasswordConfirm}
                onChange={(e) =>
                  setCompanyData((prevData) => ({
                    ...prevData,
                    CompanyAdmin: {
                      ...prevData.CompanyAdmin,
                      PasswordConfirm: e.target.value,
                    },
                  }))
                }
              />
            </Col>
          </Row>

          <Button className="btn-primary w-100 mt-4" onClick={handleAddCompany}>
            Şirket Kaydet
          </Button>
        </Card.Body>
      </Card>

      {/* Şirketler Listesi Tablosu */}
      <Card className="mt-4">
        <Card.Body>
          <h4>Şirketler Listesi</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Şirket Adı</th>
                <th>Resim</th>
                <th>Email</th>
                <th>Şehir</th>
                <th>İlçe</th>
                <th>Adres</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company) => (
                  <tr key={company.companyName}>
                    <td>{company.companyName}</td>
                    <td>
                      <img
                        src={`https://api.herohrm.com/${company.imageUrl}`}
                        alt={company.companyName}
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>{company.email}</td>
                    <td>{company.city}</td>
                    <td>{company.district}</td>
                    <td>{company.address}</td>
                    <td>{company.state ? 'Aktif' : 'Pasif'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Şirket bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SirketEkle;
