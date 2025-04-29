import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '@/_services/';
import { Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const flag = useRef(false);
  const [message, setMessage] = useState(sessionStorage.getItem("successMessage"));
  const [errorDel, setErrorDel] = useState(sessionStorage.getItem("errorDel"));
  const [successDel, setSuccessDel] = useState(sessionStorage.getItem("successDel"));


  useEffect(() => {
    if (message) {
      sessionStorage.removeItem("successMessage");
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [message]);

  useEffect(() => {
    if (successDel) {
      sessionStorage.removeItem("successDel")
      const timer = setTimeout(() => {
        setSuccessDel(null)
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [successDel]);

  useEffect(() => {
    if (errorDel) {
      sessionStorage.removeItem("errorDel")
      const timer = setTimeout(() => {
        setErrorDel(null)
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [errorDel])

  useEffect(() => {
    if (flag.current === false) {
      userService.getAllUsers()
        .then(res => {
          setUsers(res.data);
        })
        .catch(err => console.log(err));
    }
    return () => flag.current = true;
  }, []);

  
  // Filtrage des utilisateurs selon la recherche
  

  // Fonction pour gérer la pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcul des utilisateurs à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const deleteUser = (userId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      userService.deleteUser(userId)
        .then((res) => {
          console.log(res.data.message);
          setErrorDel(null);
          sessionStorage.setItem("successDel", "Utilisateur supprimer avec succès");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response.data.message)
          sessionStorage.setItem("errorDel", "Erreur lors de la suppression de l'utilisateur: " + err.response.data.message);
          window.location.reload()
        });
    }
  };

  

  return (
    <div className="" style={{ color: '#1f5733' }}>
      <h5 className='m-4'><strong>LISTE DES UTILISATEURS</strong></h5>
      {message && <div className='alert alert-success'>{message}</div>}
      {successDel && <div className='alert alert-success'>{successDel}</div>}
      {errorDel && <div className='alert alert-danger'>{errorDel}</div>}

      {/* Conditionally render if no users available */}
      {users.length === 0 ? (
        <><p className="text-center">Aucun utilisateur disponible.</p>
          <div className='row'>
            <div className="col d-flex justify-content-end mb-2 mb-md-0">
              <Link to='/admin/user/add' className="btn btn-sm btn-outline-primary d-inline-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg me-2" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <strong>Ajouter un utilisateur</strong>
              </Link>
            </div>
            <div className='col-1'></div>
          </div>
        </>

      ) : (
        <>
          {/* Tableau d'utilisateurs */}
          <Table className="table table-hover">
            <thead>
              <tr>
                <th className='col-1' style={{ color: 'rgb(78,78,80)' }}>N°</th>
                <th className='col-2' style={{ color: 'rgb(78,78,80)' }}>NOM</th>
                <th className='col-2' style={{ color: 'rgb(78,78,80)' }}>EMAIL</th>
                <th className='col-2' style={{ color: 'rgb(78,78,80)' }}>PROFIL</th>
                <th className='col-2' style={{ color: 'rgb(78,78,80)' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => (
                  <tr key={index}>
                    <td className='col' style={{ color: 'rgb(78,78,80)' }}>{indexOfFirstItem + index + 1}</td>
                    <td className='col' style={{ color: 'rgb(78,78,80)' }}>{user.fullname}</td>
                    <td className='col' style={{ color: 'rgb(78,78,80)' }}>{user.email}</td>
                    <td className='col' style={{ color: 'rgb(78,78,80)' }}>{user.role}</td>
                    <td className='col' style={{ color: 'rgb(78,78,80)' }}>
                      <DropdownButton
                        id={`dropdown-button-${user.userId}`}
                        title="Actions"
                        variant="secondary"
                        size="sm"
                      >
                        {/* Option pour modifier */}
                        <Dropdown.Item as={Link} to={`/admin/user/edit/${user.userId}`}>
                          <FaEdit className="me-2" /> Modifier
                        </Dropdown.Item>

                        {/* Option pour supprimer */}
                        <Dropdown.Item onClick={() => deleteUser(user.userId)}>
                          <FaTrash className="me-2" /> Supprimer
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {
                Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, idx) => (
                  <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePagination(idx + 1)}>
                      {idx + 1}
                    </button>
                  </li>
                ))
              }
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};



export default UsersList;
