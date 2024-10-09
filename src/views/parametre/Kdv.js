import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Kdv = () => {
  const [taxRate, setTaxRate] = useState(''); // KDV oranı girişi için
  const [taxRates, setTaxRates] = useState([]); // KDV oranlarını tutmak için
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];

  // KDV oranlarını getir - Tax API İsteği
  useEffect(() => {
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

    getTaxRates();
  }, [accessToken]);

  // KDV Oranı Kaydet - CreateTax API İsteği
  const handleAddTaxRate = async () => {
    if (!taxRate) {
      Swal.fire({
        icon: 'warning',
        title: 'Uyarı',
        text: 'Lütfen KDV oranını giriniz!',
      });
      return;
    }

    try {
      const response = await fetch('https://api.herohrm.com/api/Tax/CreateTax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          taxRate: parseFloat(taxRate), // KDV oranını sayıya çevir
          comment: '', // Boş yorum
        }),
      });

      const result = await response.json();

      if (result.isSucceeded) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'KDV oranı başarıyla eklendi.',
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
        text: 'KDV oranı eklenirken bir hata oluştu.',
      });
    }
  };

  return (
    <div className="container mt-4">
      {/* KDV Oranı Tanımlama Alanı */}
      <Card>
        <Card.Body>
          <h4>KDV Oranı Tanımlama</h4>
          <Row className="align-items-center">
            <Col md={9}>
              <Form.Control
                type="number"
                placeholder="KDV Oranı Giriniz"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Button className="btn-primary w-100" onClick={handleAddTaxRate}>
                KDV Oranı Kaydet
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* KDV Oranları Listeleme Tablosu */}
      <Card className="mt-4">
        <Card.Body>
          <h4>KDV Oranları Listele</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>KDV ID</th>
                <th>KDV Oranı (%)</th>
              </tr>
            </thead>
            <tbody>
              {taxRates.length > 0 ? (
                taxRates.map((tax) => (
                  <tr key={tax.id}>
                    <td>{tax.id}</td>
                    <td>{tax.taxRate}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    KDV oranı bulunamadı.
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

export default Kdv;
