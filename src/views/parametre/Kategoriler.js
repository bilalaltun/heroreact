import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Kategoriler = () => {
  const [categoryName, setCategoryName] = useState(''); // Kategori tanımlama için
  const [categories, setCategories] = useState([]);
  const [taxRates, setTaxRates] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [selectedTaxId, setSelectedTaxId] = useState('');
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  // Kategorileri ve KDV oranlarını Getir - GetCategories ve Tax API İsteği
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('https://api.herohrm.com/api/Category/GetCategories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.isSucceeded) {
          setCategories(data.model);
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
          text: 'Kategoriler alınırken bir hata oluştu.',
        });
      }
    };

    const getTaxRates = async () => {
      try {
        const response = await fetch('https://api.herohrm.com/api/Tax', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.isSucceeded) {
          setTaxRates(data.model);
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
          text: 'KDV oranları alınırken bir hata oluştu.',
        });
      }
    };

    getCategories();
    getTaxRates();
  }, [accessToken]);

  // Kategori Kaydet - CreateCategory API İsteği
  const handleAddCategory = async () => {
    if (!categoryName) {
      Swal.fire({
        icon: 'warning',
        title: 'Uyarı',
        text: 'Lütfen kategori adını giriniz!',
      });
      return;
    }

    try {
      const response = await fetch('https://api.herohrm.com/api/Category/CreateCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          categoryName, // Kategori adı
          comment: '', // Boş yorum
        }),
      });

      const result = await response.json();

      if (result.isSucceeded) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Kategori başarıyla eklendi.',
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
        text: 'Kategori eklenirken bir hata oluştu.',
      });
    }
  };

  // Alt Kategori Kaydet - CreateSubCategory API İsteği
  const handleAddSubCategory = async () => {
    if (!subCategoryName || !selectedCategoryId || !selectedTaxId) {
      Swal.fire({
        icon: 'warning',
        title: 'Uyarı',
        text: 'Lütfen tüm alanları doldurunuz!',
      });
      return;
    }

    try {
      const response = await fetch('https://api.herohrm.com/api/SubCategory/CreateSubCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          subCategoryName,
          categoryId: selectedCategoryId,
          comment: '', // Boş yorum
          taxId: selectedTaxId,
        }),
      });

      const result = await response.json();

      if (result.isSucceeded) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Alt kategori başarıyla eklendi.',
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
        text: 'Alt kategori eklenirken bir hata oluştu.',
      });
    }
  };

  return (
    <div className="container mt-4">
      {/* Kategori Tanımlama Alanı */}
      <Card>
        <Card.Body>
          <h4>Kategori Tanımlama</h4>
          <Row className="align-items-center">
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Kategori Adını Giriniz"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Button className="btn-primary w-100" onClick={handleAddCategory}>
                Kategori Kaydet
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Alt Kategori Tanımlama Alanı */}
      <Card className="mt-4">
        <Card.Body>
          <h4>Alt Kategori Tanımlama</h4>
          <Row className="align-items-center">
            <Col md={3}>
              <Form.Label>Kategori Seçiniz</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">Kategori Seçin</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Col>

            <Col md={3}>
              <Form.Label>Alt Kategori Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Alt Kategori Adını Giriniz"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Form.Label>KDV Oranı Seçiniz</Form.Label>
              <Form.Control
                as="select"
                value={selectedTaxId}
                onChange={(e) => setSelectedTaxId(e.target.value)}
              >
                <option value="">KDV Oranı Seçin</option>
                {taxRates.map((tax) => (
                  <option key={tax.id} value={tax.id}>
                    {tax.taxRate}%
                  </option>
                ))}
              </Form.Control>
            </Col>

            <Col md={3}>
              <Button className="btn-primary w-100 mt-4" onClick={handleAddSubCategory}>
                Alt Kategori Kaydet
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Kategoriler ve Alt Kategoriler Listeleme Tablosu */}
      <Card className="mt-4">
        <Card.Body>
          <h4>Kategoriler Listeleme</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Kategori Adı</th>
                <th>Alt Kategori Adı</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <React.Fragment key={category.id}>
                    <tr>
                      <td>{category.categoryName}</td>
                      <td>{category.getSubCategories.length === 0 ? 'Alt Kategori Yok' : ''}</td>
                    </tr>
                    {category.getSubCategories.length > 0 && 
                      category.getSubCategories.map((subCategory) => (
                        <tr key={subCategory.id}>
                          <td />
                          <td>{subCategory.subCategoryName}</td>
                        </tr>
                      ))
                    }
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    Kategori bulunamadı.
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

export default Kategoriler;
    