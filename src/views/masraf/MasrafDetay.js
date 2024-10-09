import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Image, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';  // SweetAlert2 için

const MasrafDetay = () => {
    const { expenseId } = useParams();
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Modal durumu için state
    const [userRole, setUserRole] = useState(null); // Kullanıcının rolü

    // Cookie'den rol bilgisini al
    useEffect(() => {
        const role = document.cookie
          .split('; ')
          .find((row) => row.startsWith('role='))
          ?.split('=')[1];
        setUserRole(role);
      }, []);

    // Masraf detaylarını getiren istek
    useEffect(() => {
        const fetchExpenseDetails = async () => {
            if (!expenseId) {
                console.error("Expense ID bulunamadı!");
                return;
            }

            try {
                const accessToken = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('accessToken='))
                    ?.split('=')[1];

                const response = await axios.get(`https://api.herohrm.com/api/Expense/GetExpenseDetails?ExpenseId=${expenseId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setExpense(response.data.expenseDetailGetDto[0] || {});
                setLoading(false);
            } catch (error) {
                console.error("Masraf detayları alınırken hata oluştu:", error);
                setLoading(false);
            }
        };

        fetchExpenseDetails();
    }, [expenseId]);

    if (!expense) {
        return <p>Masraf </p>;
    }

    const imageUrl = expense.expenseImageUrl
        ? `https://api.herohrm.com/${expense.expenseImageUrl}`
        : null;

    // Durum kontrolü
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return { text: 'Beklemede', variant: 'warning' };
            case 1:
                return { text: 'Onaylandı', variant: 'success' };
            case 2:
                return { text: 'Reddedildi', variant: 'danger' };
            default:
                return { text: 'Bilinmiyor', variant: 'secondary' };
        }
    };

    const statusInfo = getStatusText(expense.status);

    // Onay veya Reddet işlemi için istek atan fonksiyon
    const handleStatusChange = async (newStatus) => {
        const accessToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('accessToken='))
            ?.split('=')[1];

        try {
            const response = await axios.post(
                'https://api.herohrm.com/api/Admin/ChangeExpenseStatus',
                {
                    expenseId,
                    status: newStatus === 1 ? "Approved" : "Rejected", // Onay için Approved, reddetme için Rejected
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Başarılı!',
                    text: `Masraf durumu başarıyla ${newStatus === 1 ? 'onaylandı' : 'reddedildi'}.`,
                }).then(() => {
                    window.location.reload(); // Sayfayı yenile
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Hata!',
                text: 'Bir hata oluştu, lütfen tekrar deneyin.',
            });
        }
    };

    return (
        <Card>
            <Card.Body>
                <h4 className="card-title">Masraf Detayları</h4>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Personel Adı</Form.Label>
                                <Form.Control type="text" readOnly value={expense.fullName || ''} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Masraf ID</Form.Label>
                                <Form.Control type="text" readOnly value={expense.receiptNum || ''} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Proje Adı</Form.Label>
                                <Form.Control type="text" readOnly value={expense.projectName || ''} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Kategori</Form.Label>
                                <Form.Control type="text" readOnly value={expense.categoryName || ''} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Toplam Tutar</Form.Label>
                                <Form.Control type="text" readOnly value={`${expense.totalAmount || ''} TL`} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>KDV Tutarı</Form.Label>
                                <Form.Control type="text" readOnly value={`${expense.taxTotal || ''} TL`} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Masraf Tarihi</Form.Label>
                                <Form.Control type="text" readOnly value={new Date(expense.receiptDate).toLocaleDateString()} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Açıklama</Form.Label>
                                <Form.Control as="textarea" readOnly value={expense.comment || ''} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Fatura Numarası</Form.Label>
                                <Form.Control type="text" readOnly value={expense.receiptNum || ''} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Masraf Görseli ve Onay Durumu */}
                    <Row className="text-center justify-content-center">
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Masraf Görseli</Form.Label>
                                {imageUrl ? (
                                    <>
                                        <Image
                                            src={imageUrl}
                                            alt="Masraf Görseli"
                                            fluid
                                            style={{ maxWidth: '150px', cursor: 'pointer', margin: '0 auto' }} // Küçük resim, tıklanabilir ve ortalanmış
                                            onClick={() => setShowModal(true)} // Resme tıklandığında modal açılır
                                        />
                                        {/* Modal */}
                                        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                                            <Modal.Body className="text-center">
                                                <Image src={imageUrl} alt="Masraf Görseli Büyütülmüş" fluid />
                                            </Modal.Body>
                                        </Modal>
                                    </>
                                ) : (
                                    <p>Görsel bulunamadı</p>
                                )}
                            </Form.Group>
                        </Col>

                        {/* Masraf Onay Durumu Butonu */}
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Masraf Onay Durumu</Form.Label>
                                <Button variant={statusInfo.variant} disabled>
                                    {statusInfo.text}
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Onayla ve Reddet Butonları (Sadece admin ve superadmin için) */}
                    {userRole === 'Admin' || userRole === 'SuperAdmin' ? (
                        <Row className="mt-4">
                            <Col md={12} className="text-center">
                                <Button
                                    variant="success"
                                    className="me-2"
                                    onClick={() => handleStatusChange(1)}
                                    disabled={expense.status === 1} // Eğer masraf onaylanmışsa buton devre dışı olacak
                                >
                                    Onayla
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleStatusChange(2)}
                                    disabled={expense.status === 1 || expense.status === 2} // Onaylanmışsa devre dışı, reddedilmişse zaten pasif
                                >
                                    Reddet
                                </Button>
                            </Col>
                        </Row>
                    ) : null}
                </Form>
            </Card.Body>
        </Card>
    );
};

export default MasrafDetay;
