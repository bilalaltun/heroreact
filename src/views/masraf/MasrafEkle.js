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
  const [subCategories, setSubCategories] = useState([]);
  const [taxRates, setTaxRates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [date, setDate] = useState('-');
  const [time, setTime] = useState('-');

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
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

  useEffect(() => {
    const currentDate = new Date();
    setDate(currentDate.toLocaleDateString());
    setTime(currentDate.toLocaleTimeString());
  }, []);

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
        setProjects(data ? data.model.data : []);
      } else {
        console.error('Projeleri listeleme başarısız:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('API isteği başarısız:', error);
    }
  };

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
        setCategories(data ? data.model : []);
      } else {
        console.error('Kategorileri listeleme başarısız:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('API isteği başarısız:', error);
    }
  };

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
        setTaxRates(data ? data.model : []);
      } else {
        console.error('KDV oranlarını listeleme başarısız:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('API isteği başarısız:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
    fetchTaxRates();
  }, [token]);

  const handleCategoryChange = (e) => {
    const newSelectedCategoryId = e.target.value;
    setSelectedCategoryId(newSelectedCategoryId);

    const selectedCategory = categories.find(category => category.id === newSelectedCategoryId);
    setSubCategories(selectedCategory ? selectedCategory.getSubCategories : []);
  };

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
      setSelectedImage(file);
    }
  };

  const handleSave = async () => {
    if (!selectedCategoryId || !selectedProjectId || !vendorName || !receiptNumber || !receiptDate || !taxOffice || !vendorTaxNumber) {
      Swal.fire('Hata', 'Lütfen tüm zorunlu alanları doldurun.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', selectedCategoryId);
    formData.append('subCategoryId', selectedSubCategoryId);
    formData.append('projectId', selectedProjectId);
    formData.append('vendorCamp', vendorName);
    formData.append('receiptNum', receiptNumber);
    formData.append('receiptDate', receiptDate);
    formData.append('taxOffice', taxOffice);
    formData.append('vendorTaxNum', vendorTaxNumber);

    formData.append('totalAmount', parseInt(totalAmount, 10));
    formData.append('taxTotal', parseInt(taxTotal, 10));
    formData.append('baseTotal', parseInt(baseTotal, 10));
    formData.append('comment', commentText);

    rows.forEach((row, index) => {
      formData.append(`ExpenseDetail[${index}].ProductName`, row.urunAdi);
      formData.append(`ExpenseDetail[${index}].TotalAmount`, parseInt(row.toplamTutar, 10));
      formData.append(`ExpenseDetail[${index}].TaxAmount`, parseInt(row.kdvTutar, 10));
      formData.append(`ExpenseDetail[${index}].BaseTotal`, parseInt(row.matrah, 10));
      formData.append(`ExpenseDetail[${index}].TaxId`, row.taxId);
    });

    if (selectedImage) {
      formData.append('ExpenseImage', selectedImage, selectedImage.name);
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
        Swal.fire('Başarılı!', 'Masraf başarıyla kaydedildi.', 'success').then(() => {
          window.location.reload(); 
        });
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

  const handleNumberInput = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    setReceiptNumber(value);
  };

  const handleTaxNumberInput = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10); 
    setVendorTaxNumber(value);
  };

  const handleTextInput = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZğüşöçİĞÜŞÖÇ\s]/g, '');
    setTaxOffice(value);
  };

  const calculateTotals = () => {
    let totalKdv = 0;
    let totalMatrah = 0;

    rows.forEach((row) => {
      const kdvOrani = parseFloat(row.kdvOrani) || 0;
      const toplamTutar = parseFloat(row.toplamTutar) || 0;
      const kdvTutar = (toplamTutar * kdvOrani) / (100 + kdvOrani);
      const matrah = toplamTutar - kdvTutar;

      row.kdvTutar = kdvTutar.toFixed(2);
      row.matrah = matrah.toFixed(2);

      totalKdv += kdvTutar;
      totalMatrah += matrah;
    });

    setTaxTotal(totalKdv.toFixed(2));
    setBaseTotal(totalMatrah.toFixed(2));
  };

  const calculateTotalAmount = () => {
    const total = rows.reduce((acc, row) => {
      const toplamTutar = parseFloat(row.toplamTutar) || 0;
      return acc + toplamTutar;
    }, 0);
    setTotalAmount(total.toFixed(2)); 
  };

  useEffect(() => {
    calculateTotalAmount(); 
  }, [rows]);

  useEffect(() => {
    calculateTotals(); 
  }, [rows]);

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
                      <th><Form.Label>Fiş No</Form.Label></th>
                      <td><Form.Control type="text" value={receiptNumber} onChange={handleNumberInput} /></td>
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
                        <Form.Select value={selectedCategoryId} onChange={handleCategoryChange}>
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
                      <th><Form.Label>Alt Kategori</Form.Label></th>
                      <td>
                        <Form.Select value={selectedSubCategoryId} onChange={(e) => setSelectedSubCategoryId(e.target.value)}>
                          <option>Alt Kategori Seçiniz</option>
                          {subCategories.map(subCategory => (
                            <option key={subCategory.id} value={subCategory.id}>
                              {subCategory.subCategoryName}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>Satıcı Firma</Form.Label></th>
                      <td><Form.Control type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Vergi Dairesi</Form.Label></th>
                      <td><Form.Control type="text" value={taxOffice} onChange={handleTextInput} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Vergi Numarası</Form.Label></th>
                      <td><Form.Control type="text" value={vendorTaxNumber} onChange={handleTaxNumberInput} /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Toplam Tutar</Form.Label></th>
                      <td><Form.Control type="number" value={totalAmount} readOnly /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>KDV Tutarı</Form.Label></th>
                      <td><Form.Control type="text" value={taxTotal} readOnly /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Matrah</Form.Label></th>
                      <td><Form.Control type="text" value={baseTotal} readOnly /></td>
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
                            const selectedTax = taxRates.find(rate => rate.taxRate === parseFloat(e.target.value));
                            const updatedRows = rows.map((r) =>
                              r.id === row.id
                                ? { ...r, kdvOrani: e.target.value, taxId: selectedTax ? selectedTax.id : null }
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
                          readOnly
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={row.matrah}
                          readOnly
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
