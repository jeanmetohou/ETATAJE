import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services';

const Login = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [credentials, setCredentials] = useState({
    email: '@presidence.bj',
    password: ''
  });

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    accountService.login(credentials)
      .then(res => {
        console.log('Response:', res);
        if (res && res.data && res.data.user) {
          sessionStorage.setItem('user', JSON.stringify(res.data.user));
          accountService.saveToken(res.data.token);
          navigate('/etat/list');
        } else {
          console.error('La réponse ne contient pas les données attendues.');
        }
      })
      .catch(error => {
        let errors = error.response.data.message;
        if (errors.length > 0) {
          setError(errors);
        }
      });

  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: "url('/svg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'gray'
      }}
    >
      <Container fluid className="d-flex align-items-center justify-content-center h-100 w-75">
        <Row className="justify-content-center w-100">
          <Col xs={10} sm={8} md={6} lg={4}>
            <div className="bg-white shadow rounded border-light p-3 p-lg-5 ">
              <div className="mx-auto mb-2 ">
                <img
                  src="/logoAje.png"
                  alt="Logo Seau Benin"
                  className="img-fluid mb-3"
                  style={{ maxWidth: '60%' }}
                />
              </div>

              <Form onSubmit={onSubmit} className="mt-4">
                <input type="hidden" name="_token" value="3le1yNdsxP1nDXB7gI6Z5flIGLXWtqv20ctwZNm3" />

                {/* Champ login */}
                <Form.Group className="mb-4" controlId="login">
                  <Form.Label className="text-muted">Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      className='authenticationField'
                      type="text"
                      name='email'
                      placeholder='identifiant@presidence.bj'
                      value={credentials.email}
                      onChange={onChange}
                      autoComplete='off'
                      style={{ maxWidth: '100%' }}
                      autoFocus
                    />
                  </InputGroup>
                </Form.Group>
                {/* Champ Password */}
                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="text-muted">Mot de passe</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon2">
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      className='authenticationField'
                      name='password'
                      placeholder="Mot de passe"
                      onChange={onChange}
                      autoComplete='off'
                      style={{ maxWidth: '100%' }}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {error && <p style={{ whiteSpace: "pre-line", color: "red" }}> {error} </p>}

                <Button type="submit" className="w-100 btn btn-primary">Se connecter</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;