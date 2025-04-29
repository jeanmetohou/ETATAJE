import React, { useState } from 'react';
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';

const Header = ({ isSidebarCollapsed, onSearch }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const profil = () => {
    navigate('/admin/user/details/');
  };

  const signOut = () => {
    accountService.logout();
    navigate('/auth/login');
  };

  const handleSearch = (text) => {
    onSearch(text)
    console.log('Recherche :', text);
  };

  const userProfil = JSON.parse(sessionStorage.getItem('user'));

  return (
    <header
      className="bg-light shadow-sm p-3 d-flex justify-content-between align-items-center"
      style={{
        width: `calc(99% - ${isSidebarCollapsed ? '10%' : '15%'})`,
        transition: 'width 0.3s',
        position: 'fixed',
        top: 0,
        left: isSidebarCollapsed ? '11%' : '16%',
        zIndex: 1000,
      }}
    >
      {/* Barre de Recherche */}
      <InputGroup className="w-25">
        <FormControl
          placeholder="Recherche..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchText);
            }
          }}
        />
        <Button variant="outline-secondary" onClick={() => handleSearch(searchText)}>
          <FaSearch />
        </Button>
      </InputGroup>

      {/* Icônes et Profil */}
      <div className="d-flex align-items-center">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            id="dropdown-user"
            className="d-flex align-items-center text-decoration-none"
            style={{ border: 'none' }}
          >
            <FaUserCircle className="fs-2 me-2" />
            {!isSidebarCollapsed && <span className="text-decoration-none">{userProfil?.role}</span>}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={profil}>{userProfil?.fullName}</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={signOut}>
              <FaSignOutAlt className="me-2" /> Se déconnecter
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
