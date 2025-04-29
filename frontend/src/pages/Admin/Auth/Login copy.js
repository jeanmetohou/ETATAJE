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
        navigate('/course/list');
      } else {
        console.error('La réponse ne contient pas les données attendues.');
      }
    })
      .catch(error => {
        let errors = error.response.data.message;
        if (errors.length > 0 ) {
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
      }}
    >
      <Container fluid className="d-flex align-items-center justify-content-center h-100 w-75">
        <Row className="justify-content-center w-100">
          <Col xs={10} sm={8} md={6} lg={4}>
            <div className="bg-white shadow rounded border-light p-3 p-lg-5 ">
              <div className="mx-auto mb-2 ">
                <img
                  src="/logo_gparcauto.png"
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
                  {error && <p style={{ whiteSpace: "pre-line", color: "red" }}> {error} </p> }
                
                <Button type="submit" className="w-100 btn btn-primary">Se connecter</Button>
              </Form>
              
              <div className="mt-4 text-center">
                <span className="fw-normal text-muted">Contacts</span>
              </div>
              <hr />
              <div className="d-flex justify-content-center my-4"></div>
              <div className="d-flex justify-content-center align-items-center mb-2">
                <span className="fw-normal">
                  Chef Parc: <span className="badge bg-secondary ms-1 text-white">1184</span>
                </span>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <span className="fw-normal">
                  Support: <span className="badge bg-secondary ms-1 text-white">3030</span>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;




// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
// import {  FaEye, FaEyeSlash, /*FaUser,*/ FaLock, FaEnvelope } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { accountService } from '@/_services';

// const Login = () => {
//   let navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const [credentials, setCredentials] = useState({
//     email: 'admin@presidence.bj',
//     password: '123456'
//   });

//   const onChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     accountService.login(credentials)
//       .then(res => {
//         console.log('Response:', res); // Inspecter la réponse complète
//         if (res && res.data && res.data.user) {
//           sessionStorage.setItem('user', JSON.stringify(res.data.user));
//           accountService.saveToken(res.data.token);
//           navigate('/admin/course/list');
//         } else {
//           console.error('La réponse ne contient pas les données attendues.');
//         }
//       })
//       .catch(error => console.log(error.response.data));
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center vh-100"
//       style={{
//         backgroundImage: "url('/svg.svg')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <Container fluid className="d-flex align-items-center justify-content-center h-100">
//         <Row className="justify-content-center w-100">
//           <Col xs={10} sm={8} md={6} lg={4}>
//             <div className="bg-white shadow rounded border-light p-3 p-lg-5">
//               {/* Logo insertion */}
//               <div className="text-center mb-4">
//                 <img
//                   src="/logo_gparcauto.png"
//                   alt="Logo Seau Benin"
//                   className="img-fluid mb-3"
//                   style={{ maxWidth: '150px' }}
//                 />
//               </div>
//               <Form onSubmit={onSubmit} className="mt-4">
//                 <input type="hidden" name="_token" value="3le1yNdsxP1nDXB7gI6Z5flIGLXWtqv20ctwZNm3" />

//                 {/* Champ Email */}
//                 <Form.Group className="mb-4" controlId="email">
//                   <Form.Label className="text-muted">Email</Form.Label>
//                   <InputGroup>
//                     <InputGroup.Text id="basic-addon1">
//                       <FaEnvelope />
//                     </InputGroup.Text>
//                     <Form.Control
//                       as="select"
//                       name="email"
//                       value={credentials.email}
//                       onChange={onChange}
//                       autoComplete="off"
//                     >
//                       <option value="admin@presidence.bj">admin@presidence.bj</option>
//                       <option value="chefparc@presidence.bj">chefparc@presidence.bj</option>
//                       <option value="chefdivision@presidence.bj">chefdivision@presidence.bj</option>
//                       <option value="chefservice@presidence.bj">chefservice@presidence.bj</option>
//                       <option value="demandeur@presidence.bj">demandeur@presidence.bj</option>
//                       <option value="conducteur@presidence.bj">conducteur@presidence.bj</option>
//                       <option value="sarah.chevalier@presidence.bj">sarah.chevalier@presidence.bj</option>
//                     </Form.Control>
//                   </InputGroup>
//                 </Form.Group>

//                 {/* Champ Password */}
//                 <Form.Group className="mb-4" controlId="password">
//                   <Form.Label className="text-muted">Mot de passe</Form.Label>
//                   <InputGroup>
//                     <InputGroup.Text id="basic-addon2">
//                       <FaLock />
//                     </InputGroup.Text>
//                     <Form.Control
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       placeholder="Password"
//                       value={credentials.password}
//                       onChange={onChange}
//                       autoComplete="off"
//                     />
//                     <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </InputGroup.Text>
//                   </InputGroup>
//                 </Form.Group>

//                 <Button type="submit" className="w-100 btn btn-primary">Se connecter</Button>
//               </Form>

//               <div className="mt-4 text-center">
//                 <span className="fw-normal text-muted">Contacts</span>
//               </div>
//               <hr />
//               <div className="d-flex justify-content-center my-4">
//               </div>
//               <div className="d-flex justify-content-center align-items-center mb-2">
//                 <span className="fw-normal">
//                   Chef Parc: <span className="badge bg-secondary ms-1 text-white">1184</span>
//                 </span>
//               </div>
//               <div className="d-flex justify-content-center align-items-center">
//                 <span className="fw-normal">
//                   Support: <span className="badge bg-secondary ms-1 text-white">3030</span>
//                 </span>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;

