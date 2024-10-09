import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, CloseButton, Modal } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Swal from 'sweetalert2';

const AddEditModal = ({ tableInstance, addItem, editItem }) => {
  const { selectedFlatRows, data, setIsOpenAddEditModal, isOpenAddEditModal, setIsOpenDeleteConfirmModal } = tableInstance;
  const emptyItem = { userName: '', fullName: '', email: '', password: '', passwordConfirm: '' };
  const [selectedItem, setSelectedItem] = useState(emptyItem);

  useEffect(() => {
    if (isOpenAddEditModal && selectedFlatRows.length === 1) {
      setSelectedItem(selectedFlatRows[0].original);
    } else {
      setSelectedItem(emptyItem);
    }
    return () => {};
  }, [isOpenAddEditModal, selectedFlatRows]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setSelectedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const saveItem = async () => {
    try {
      const response = await fetch('https://api.herohrm.com/api/Admin/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${document.cookie.split('=')[1]}`,
        },
        body: JSON.stringify(selectedItem),
      });
      const result = await response.json();

      if (result.isSucceeded) {
        Swal.fire({
          icon: 'success',
          title: 'Başarılı',
          text: 'Kullanıcı başarıyla eklendi.',
        }).then(() => {
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
        text: 'Kullanıcı eklenirken bir hata oluştu.',
      });
    }
  };

  return (
    <Modal className="modal-right" show={isOpenAddEditModal} onHide={() => setIsOpenAddEditModal(false)}>
      <CloseButton className="position-absolute e-2 t-2 z-index-1" onClick={() => setIsOpenAddEditModal(false)} />
      <Modal.Body className="d-flex flex-column">
        <div className="mb-3 filled w-100">
          <CsLineIcons icon="user" />
          <Form.Control
            type="text"
            placeholder="Kullanıcı Adı"
            name="userName"
            value={selectedItem.userName}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3 filled w-100">
          <CsLineIcons icon="user" />
          <Form.Control
            type="text"
            placeholder="Ad Soyad"
            name="fullName"
            value={selectedItem.fullName}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3 filled w-100">
          <CsLineIcons icon="email" />
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={selectedItem.email}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3 filled w-100">
          <CsLineIcons icon="lock" />
          <Form.Control
            type="password"
            placeholder="Şifre"
            name="password"
            value={selectedItem.password}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3 filled w-100">
          <CsLineIcons icon="lock" />
          <Form.Control
            type="password"
            placeholder="Şifre Tekrar"
            name="passwordConfirm"
            value={selectedItem.passwordConfirm}
            onChange={changeHandler}
          />
        </div>
        <Modal.Footer className="border-0">
          <Button className="btn-icon btn-icon-end" onClick={saveItem}>
            <span>Kaydet</span> <CsLineIcons icon="check" />
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditModal;
