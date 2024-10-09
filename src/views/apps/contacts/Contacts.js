import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Contacts = () => {
  const [userData, setUserData] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const [users, setUsers] = useState([]);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  // Kullanıcı listesini getir - GetUsers API İsteği
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('https://api.herohrm.com/api/Admin/GetUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.users) {
          setUsers(data.users);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Kullanıcılar alınırken bir hata oluştu.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Hata',
          text: 'Kullanıcılar alınırken bir hata oluştu.',
        });
      }
    };

    getUsers();
  }, [accessToken]);

  // Kullanıcı Kaydet - CreateUser API İsteği
  const handleAddUser = async () => {
    const bodyData = {
      userName: userData.userName,
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm
    };

    try {
      const response = await fetch('https://api.herohrm.com/api/Admin/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bodyData)
      });

      const result = await response.json();

      if (result.isSucceeded) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Kullanıcı başarıyla eklendi.',
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
        text: 'Kullanıcı eklenirken bir hata oluştu.',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      {/* Kullanıcı Ekleme Formu */}
      <Card>
        <Card.Body>
          <h4>Kullanıcı Ekleme Formu</h4>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kullanıcı Adı Giriniz"
                name="userName"
                value={userData.userName}
                onChange={handleInputChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Ad Soyad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ad Soyad Giriniz"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="align-items-center mt-3">
            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Giriniz"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre Giriniz"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Row className="align-items-center mt-3">
            <Col md={6}>
              <Form.Label>Şifre Tekrar</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre Tekrar Giriniz"
                name="passwordConfirm"
                value={userData.passwordConfirm}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <Button className="btn-primary w-100 mt-4" onClick={handleAddUser}>
            Kullanıcı Kaydet
          </Button>
        </Card.Body>
      </Card>

      {/* Kullanıcılar Listesi Tablosu */}
      <Card className="mt-4">
        <Card.Body>
          <h4>Kullanıcılar Listesi</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Kullanıcı ID</th>
                <th>Ad Soyad</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    Kullanıcı bulunamadı.
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

export default Contacts;
