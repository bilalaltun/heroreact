import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';

const removeSwalClasses = () => {
  document.body.classList.remove('swal2-height-auto');
};

const Login = () => {
  const history = useHistory();
  const title = 'Kullanıcı Giriş Ekranı';
  const description = 'Hero HRM Kullancı Giriş Sayfası';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email zorunlu'),
    password: Yup.string().min(4, 'Minimum 4 karakter olmalı').required('Parola Girmek Zorunludur'),
  });

  const initialValues = { email: '', password: '' };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('https://api.herohrm.com/api/Auth/Login', values, {
        headers: {
          'Content-Type': 'application/json-patch+json',
          'accept': '*/*',
        },
      });

      const { token, fullName, isSucceeded } = response.data;

      if (isSucceeded) {
        Cookies.set('accessToken', token.accessToken);
        Cookies.set('refreshToken', token.refreshToken);
        Cookies.set('fullName', fullName);

        Swal.fire({
          icon: 'success',
          title: 'Giriş Başarılı',
          text: `Hoşgeldiniz, ${fullName}`,
          willOpen: () => {
            removeSwalClasses();
          },
        }).then(() => {
          history.push('/dashboards/analytic');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Giriş Başarısız',
          text: 'Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.',
          willOpen: () => {
            removeSwalClasses();
          },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        willOpen: () => {
          removeSwalClasses();
        },
      });
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-400 w-xxl-95">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Hero HRM</h1>
            <h1 className="display-3 text-white">Human Resources Management</h1>
          </div>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Detaylı Bilgi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Hoşgeldiniz</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Kullanıcı bilgileriniz ile giriş yapın</p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Parola" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Unuttum?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Giriş
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;