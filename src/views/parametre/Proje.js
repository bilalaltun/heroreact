import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Proje = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  // Proje Tanımları - GetProjects API İsteği
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch('https://api.herohrm.com/api/Project/GetProjects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.isSucceeded) {
          setProjects(data.model.data);
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
          text: 'Proje listesi alınırken bir hata oluştu.',
        });
      }
    };

    getProjects();
  }, [accessToken]);

  // Proje Ekleme - CreateProject API İsteği
  const handleAddProject = async () => {
    if (!projectName) {
      Swal.fire({
        icon: 'warning',
        title: 'Uyarı',
        text: 'Lütfen Proje Adını giriniz!',
      });
      return;
    }
  
    try {
      const response = await fetch('https://api.herohrm.com/api/Project/CreateProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          projectName,  // object shorthand
          comment: '',  // Eğer yorum alanı kullanılmıyorsa boş bırakabilirsiniz.
        }),
      });
  
      const result = await response.json();
  
      if (result.isSucceeded) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Proje başarıyla eklendi.',
        }).then(() => {
          // Sayfa yenileme
          window.location.reload();
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
        text: 'Proje eklenirken bir hata oluştu.',
      });
    }
  };
  

  return (
    <div className="container mt-4">
      {/* Proje Adı Ekleme Alanı */}
      <Card>
        <Card.Body>
          <h4>Proje Tanımlama</h4>
          <Row className="align-items-center">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Proje Adını Giriniz"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Button className="btn-primary w-100" onClick={handleAddProject}>
                Yeni Proje Ekle
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Proje Tanımları Tablosu */}
      <Card className="mt-4">
        <Card.Body>
          <h4>Proje Tanımları</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Proje ID</th>
                <th>Proje Adı</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.projectName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    Proje bulunamadı.
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

export default Proje;
