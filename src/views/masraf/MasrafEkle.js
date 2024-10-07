import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const MasrafEkle = () => {
  const [rows, setRows] = useState([
    { id: 1, urunAdi: '', toplamTutar: '', kdvOrani: '', kdvTutar: '', matrah: '', selected: false }
  ]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [taxRates, setTaxRates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [date, setDate] = useState('-');
  const [time, setTime] = useState('-');

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(''); // Yeni SubCategoryId
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [taxOffice, setTaxOffice] = useState('');
  const [vendorTaxNumber, setVendorTaxNumber] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [taxTotal, setTaxTotal] = useState('');
  const [baseTotal, setBaseTotal] = useState('');
  const [commentText, setCommentText] = useState('');

  const token = Cookies.get('accessToken');

  // Proje listesini API'den al
  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        console.error("Token bulunamadı");
        return;
      }

      try {
        const response = await fetch('https://api.herohrm.com/api/Project/GetProjects', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(Array.isArray(data.data) ? data.data : []);
        } else {
          console.error('Projeleri listeleme başarısız:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('API isteği başarısız:', error);
      }
    };

    fetchProjects();
  }, [token]);

  // Kategori listesini API'den al
  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) {
        console.error("Token bulunamadı");
        return;
      }

      try {
        const response = await fetch('https://api.herohrm.com/api/Category/GetCategories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(Array.isArray(data.data) ? data.data : []);
        } else {
          console.error('Kategorileri listeleme başarısız:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('API isteği başarısız:', error);
      }
    };

    fetchCategories();
  }, [token]);

  // KDV oranlarını API'den al
  useEffect(() => {
    const fetchTaxRates = async () => {
      if (!token) {
        console.error("Token bulunamadı");
        return;
      }

      try {
        const response = await fetch('https://api.herohrm.com/api/Tax', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTaxRates(Array.isArray(data.data) ? data.data : []);
        } else {
          console.error('KDV oranlarını listeleme başarısız:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('API isteği başarısız:', error);
      }
    };

    fetchTaxRates();
  }, [token]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      urunAdi: '',
      toplamTutar: '',
      kdvOrani: '',
      kdvTutar: '',
      matrah: '',
      selected: false
    };
    setRows([...rows, newRow]);
  };

  const removeSelectedRow = () => {
    setRows(rows.filter(row => !row.selected));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Resim dosyasını kaydediyoruz
      const currentDate = new Date();
      setDate(currentDate.toLocaleDateString());
      setTime(currentDate.toLocaleTimeString());
    }
  };

  const handleSave = async () => {
    // Zorunlu alanların boş olup olmadığını kontrol et
    if (!selectedCategoryId || !selectedProjectId || !vendorName || !receiptNumber || !receiptDate || !taxOffice || !vendorTaxNumber) {
      Swal.fire('Hata', 'Lütfen tüm zorunlu alanları doldurun.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', selectedCategoryId);
    formData.append('subCategoryId', selectedSubCategoryId); // SubCategoryId eklendi
    formData.append('projectId', selectedProjectId);
    formData.append('vendorCamp', vendorName);
    formData.append('receiptNum', receiptNumber);
    formData.append('receiptDate', new Date(receiptDate).toISOString()); // ISO formatında tarih
    formData.append('taxOffice', taxOffice);
    formData.append('vendorTaxNum', vendorTaxNumber);
    formData.append('totalAmount', totalAmount);
    formData.append('taxTotal', taxTotal);
    formData.append('baseTotal', baseTotal);
    formData.append('comment', commentText);

    rows.forEach((row, index) => {
      formData.append(`ExpenseDetail[${index}].ProductName`, row.urunAdi);
      formData.append(`ExpenseDetail[${index}].TotalAmount`, row.toplamTutar);
      formData.append(`ExpenseDetail[${index}].TaxAmount`, row.kdvTutar);
      formData.append(`ExpenseDetail[${index}].BaseTotal`, row.matrah);
      formData.append(`ExpenseDetail[${index}].TaxId`, row.taxId); // Burada TaxId'yi ekledik
    });

    if (selectedImage) {
      formData.append('ExpenseImage', selectedImage);
    } else {
      Swal.fire('Hata', 'Lütfen bir resim ekleyin.', 'error');
      return;
    }

    try {
      const response = await fetch('https://api.herohrm.com/api/Expense/AddExpense', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        Swal.fire('Başarılı!', 'Masraf başarıyla kaydedildi.', 'success');
      } else {
        const errorData = await response.json();
        Swal.fire('Hata', `Masraf kaydedilemedi: ${errorData.message}`, 'error');
      }
    } catch (error) {
      console.error('API isteği başarısız:', error);
      Swal.fire('Hata', 'Masraf kaydedilemedi', 'error');
    }
  };

  const fullName = Cookies.get('fullName') || 'Kullanıcı';

  return (
    <div className="container-fluid">
      <h1>Masraf Ekle</h1>
      <div className="row">
        <div className="col-lg-8">
          <Card>
            <Card.Body>
              <Form>
                <Table hover className="masraf-table">
                  <tbody>
                    <tr>
                      <th><Form.Label>Kullanıcı</Form.Label></th>
                      <td><Form.Control type="text" value={fullName} readOnly /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Masraf No</Form.Label></th>
                      <td><Form.Control type="text" value="2024/1" readOnly /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Fiş No</Form.Label></th>
                      <td><Form.Control type="text" value={receiptNumber} onChange={(e) => setReceiptNumber(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Fiş Tarihi</Form.Label></th>
                      <td><Form.Control type="date" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Proje</Form.Label></th>
                      <td>
                        <Form.Select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
                          <option>Proje Seçiniz</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>
                              {project.projectName}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>Kategori</Form.Label></th>
                      <td>
                        <Form.Select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                          <option>Kategori Seçiniz</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>Alt Kategori</Form.Label></th> {/* SubCategoryId */}
                      <td>
                        <Form.Control type="text" value={selectedSubCategoryId} onChange={(e) => setSelectedSubCategoryId(e.target.value)} />
                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>Satıcı Firma</Form.Label></th>
                      <td><Form.Control type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Vergi Dairesi</Form.Label></th>
                      <td><Form.Control type="text" value={taxOffice} onChange={(e) => setTaxOffice(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Vergi Numarası</Form.Label></th>
                      <td><Form.Control type="text" value={vendorTaxNumber} onChange={(e) => setVendorTaxNumber(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Toplam Tutar</Form.Label></th>
                      <td><Form.Control type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>KDV Tutarı</Form.Label></th>
                      <td><Form.Control type="text" value={taxTotal} onChange={(e) => setTaxTotal(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Matrah</Form.Label></th>
                      <td><Form.Control type="text" value={baseTotal} onChange={(e) => setBaseTotal(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Açıklama</Form.Label></th>
                      <td><Form.Control as="textarea" rows={3} value={commentText} onChange={(e) => setCommentText(e.target.value)} /></td>
                    </tr>
                  </tbody>
                </Table>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-4">
          <Card>
            <Card.Body className="d-flex align-items-center flex-column">
              <div className="mb-3">
                <img
                  id="preview-image"
                  className="img-fluid"
                  alt=""
                  src={selectedImage ? URL.createObjectURL(selectedImage) : '/assets/images/fisekleyiniz.jpeg'}
                  style={{ height: '100%', maxHeight: '90px' }}
                />
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <Button variant="secondary" onClick={() => document.getElementById('image-upload').click()}>
                  Resim Yükle
                </Button>
              </div>
              <div>
                <span id="upload-date">Kayıt Tarihi: {date}</span><br />
                <span id="upload-time">Saat: {time}</span>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 d-flex gap-2">
            <Button variant="success" className="w-100" onClick={handleSave}>Kaydet</Button>
            <Button variant="danger" className="w-100">İptal</Button>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="mb-2 d-flex gap-2 p-2">
            <div className="w-50">
              <h3>Masraf Detay Ekle</h3>
            </div>
            <div className="w-50 d-flex gap-2 justify-content-end">
              <Button variant="success" onClick={addRow}>Masraf Ekle</Button>
              <Button variant="danger" onClick={removeSelectedRow}>Masraf Çıkar</Button>
            </div>
          </div>

          <Card>
            <Card.Body>
              <Table bordered className="masraf-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ürün Adı</th>
                    <th>Toplam Tutar</th>
                    <th>KDV Oranı</th>
                    <th>KDV Tutarı</th>
                    <th>Matrah</th>
                    <th>Seç</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={row.urunAdi}
                          onChange={(e) => {
                            const updatedRows = rows.map((r) =>
                              r.id === row.id ? { ...r, urunAdi: e.target.value } : r
                            );
                            setRows(updatedRows);
                          }}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={row.toplamTutar}
                          onChange={(e) => {
                            const updatedRows = rows.map((r) =>
                              r.id === row.id ? { ...r, toplamTutar: e.target.value } : r
                            );
                            setRows(updatedRows);
                          }}
                        />
                      </td>
                      <td>
                        <Form.Select
                          value={row.kdvOrani}
                          onChange={(e) => {
                            const selectedTax = taxRates.find(rate => rate.taxRate === e.target.value);
                            const updatedRows = rows.map((r) =>
                              r.id === row.id
                                ? { ...r, kdvOrani: e.target.value, taxId: selectedTax?.id } // taxId'yi de burada ekledik
                                : r
                            );
                            setRows(updatedRows);
                          }}
                        >
                          <option>Lütfen KDV oranını seçin</option>
                          {taxRates.map((rate) => (
                            <option key={rate.id} value={rate.taxRate}>
                              {rate.taxRate}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={row.kdvTutar}
                          onChange={(e) => {
                            const updatedRows = rows.map((r) =>
                              r.id === row.id ? { ...r, kdvTutar: e.target.value } : r
                            );
                            setRows(updatedRows);
                          }}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={row.matrah}
                          onChange={(e) => {
                            const updatedRows = rows.map((r) =>
                              r.id === row.id ? { ...r, matrah: e.target.value } : r
                            );
                            setRows(updatedRows);
                          }}
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={row.selected}
                          onChange={(e) => {
                            const updatedRows = rows.map((r) =>
                              r.id === row.id ? { ...r, selected: e.target.checked } : r
                            );
                            setRows(updatedRows);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MasrafEkle;
