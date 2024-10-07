import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const MasrafEkle = () => {
  const [rows, setRows] = useState([
    { id: 1, urunAdi: '', toplamTutar: '', kdvOrani: '', kdvTutar: '', matrah: '', selected: false }
  ]);
  const [projects, setProjects] = useState([]); // Projeleri saklayacak state
  const [selectedImage, setSelectedImage] = useState(null);
  const [date, setDate] = useState('-');
  const [time, setTime] = useState('-');

  const token = Cookies.get('accessToken'); // Cookie'den accessToken alınır

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
            'Authorization': `Bearer ${token}`, // Token'ı Authorization başlığına ekle
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Proje verisi:', data);
          setProjects(Array.isArray(data.data) ? data.data : []); // API'den gelen veriyi doğru alan ile işleyin
        } else {
          console.error('Projeleri listeleme başarısız:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('API isteği başarısız:', error);
      }
    };

    fetchProjects(); // API isteğini tetikle
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
      setSelectedImage(URL.createObjectURL(file));
      const currentDate = new Date();
      setDate(currentDate.toLocaleDateString());
      setTime(currentDate.toLocaleTimeString());
    }
  };

  const handleSave = () => {
    Swal.fire({
      title: 'Kaydetmek istediğinizden emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet, kaydet',
      cancelButtonText: 'Hayır, iptal et',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Kaydedildi!', 'Masraf kaydedildi.', 'success');
      }
    });
  };

  const fullName = Cookies.get('fullName') || 'Kullanıcı'; // Eğer fullName yoksa varsayılan değer 'Kullanıcı'

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
                      <td><Form.Control type="text" placeholder="Fiş No" /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Fiş Tarihi</Form.Label></th>
                      <td><Form.Control type="date" /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Proje</Form.Label></th>
                      <td>
                        <Form.Select>
                          <option>Proje Seçiniz</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>
                              {project.projectName} {/* Proje adı olarak projectName kullanılıyor */}
                            </option>
                          ))}
                        </Form.Select>

                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>Kategori</Form.Label></th>
                      <td>
                        <Form.Select>
                          <option>Kategori Seçiniz</option>
                          <option>Gıda</option>
                          <option>Ulaşım</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>Alt Kategori</Form.Label></th>
                      <td>
                        <Form.Select>
                          <option>Seçiniz</option>
                          <option>Kategori 1</option>
                          <option>Kategori 2</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>Satıcı Firma</Form.Label></th>
                      <td><Form.Control type="text" placeholder="Satıcı Firma Giriniz" /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Vergi Dairesi</Form.Label></th>
                      <td><Form.Control type="text" placeholder="Vergi Dairesi Giriniz" /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Vergi Numarası</Form.Label></th>
                      <td><Form.Control type="number" placeholder="Vergi Numarası Giriniz" /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Toplam Tutar</Form.Label></th>
                      <td><Form.Control type="number" placeholder="Tutar" readOnly /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>KDV Oranı</Form.Label></th>
                      <td>
                        <Form.Select>
                          <option>Seçiniz</option>
                          <option>1</option>
                          <option>10</option>
                          <option>20</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th><Form.Label>KDV Tutarı</Form.Label></th>
                      <td><Form.Control type="text" placeholder="KDV Tutarı" readOnly /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Matrah</Form.Label></th>
                      <td><Form.Control type="text" placeholder="Matrah" readOnly /></td>
                    </tr>
                    <tr>
                      <th><Form.Label>Açıklama</Form.Label></th>
                      <td><Form.Control as="textarea" rows={3} placeholder="Açıklama Giriniz" /></td>
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
                  src={selectedImage || '/assets/images/fisekleyiniz.jpeg'} // Resim yolunun doğru olduğundan emin olun
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
                      <td><Form.Control type="text" value={row.urunAdi} /></td>
                      <td><Form.Control type="text" value={row.toplamTutar} /></td>
                      <td>
                        <Form.Select value={row.kdvOrani}>
                          <option>Lütfen KDV oranını seçin</option>
                          <option>1</option>
                          <option>10</option>
                          <option>20</option>
                        </Form.Select>
                      </td>
                      <td><Form.Control type="text" value={row.kdvTutar} readOnly /></td>
                      <td><Form.Control type="text" value={row.matrah} readOnly /></td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={row.selected}
                          onChange={(e) => {
                            const updatedRows = rows.map(r => {
                              if (r.id === row.id) r.selected = e.target.checked;
                              return r;
                            });
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
