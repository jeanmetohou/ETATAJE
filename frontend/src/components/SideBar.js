import React from 'react';
import { Nav } from 'react-bootstrap';
import { /*FaHome,*/ FaBook, FaUser, FaQuestionCircle, FaCog } from 'react-icons/fa'; // Import des icônes nécessaires   FaBars,

const SideBar = ({ isCollapsed, onToggle }) => {
  // const connectedUser = JSON.parse(sessionStorage.getItem('user'));

  return (
    <div className="vh-100 d-flex flex-column p-3" style={{ width: isCollapsed ? '5%' : '15%', transition: 'width 0.3s', position: 'fixed', top: 0, left: 0, zIndex: 1050, backgroundColor:'rgb(33, 58, 63)'}}>
      <div className="d-flex justify-content-center mb-4 table-responsive-sm table-responsive-md ">
        <img src="/logoAje.png" alt="Logo" style={{ width: isCollapsed ? '10%' : '90%', transition: 'width 0.3s' }} />
      </div>
      <Nav className="flex-column" style={{ marginLeft:"5px" }}>

        <Nav.Link href="/admin/etat/list" className="d-flex align-items-center" style={{ color:'rgb(196, 196, 206)' }}> <FaBook className="me-2" /> {!isCollapsed && 'LES DOSSIERS'}</Nav.Link>

        <Nav.Link href="/admin/etat/add" className="d-flex align-items-center" style={{ color:'rgb(196, 196, 206)' }}> <FaBook className="me-2" /> {!isCollapsed && 'NOUVEAU DOSSIER'}</Nav.Link>

       <Nav.Link href="/admin/user/list" className="d-flex align-items-center" style={{ color:'rgb(196, 196, 206)' }}> <FaUser className="me-2" /> {!isCollapsed && 'UTILISATEURS'} </Nav.Link>

       <Nav.Link href="/admin/user/add" className="d-flex align-items-center" style={{ color:'rgb(196, 196, 206)' }}> <FaUser className="me-2" /> {!isCollapsed && 'NOUVEL UTILISATEUR'} </Nav.Link>
        
        <Nav.Link href="#" className="d-flex align-items-center" style={{ color:'rgb(196, 196, 206)' }}> <FaCog className="me-2" /> {!isCollapsed && 'PARAMETRES'} </Nav.Link>

        <Nav.Link href="#" className="d-flex align-items-center" style={{ color:'rgb(196, 196, 206)' }}> <FaQuestionCircle className="me-2" /> {!isCollapsed && 'AIDE'} </Nav.Link>

      </Nav>
    </div>
  );
};

export default SideBar;
