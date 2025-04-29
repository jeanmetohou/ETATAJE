import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { etatService } from '@/_services/';
import { Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

const EtatList = () => {
  const [etats, setEtats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [, /*sortConfig, setSortConfig*/] = useState(null);
  const { filterText } = useOutletContext();

  const [message, setMessage] = useState(sessionStorage.getItem("successMessage"));
  const [errorDel, setErrorDel] = useState(sessionStorage.getItem("errorDel"));
  const [successDel, setSuccessDel] = useState(sessionStorage.getItem("successDel"));

  const printRef = useRef();

  const filteredEtats = etats.filter((etat) =>
    Object.values(etat)
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  useEffect(() => {
    if (message) {
      sessionStorage.removeItem("successMessage");
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (errorDel) {
      sessionStorage.removeItem('errorDel');
      const timer = setTimeout(() => setErrorDel(''), 5000);
      return () => clearTimeout(timer)
    }
  }, [errorDel]);

  useEffect(() => {
    if (successDel) {
      sessionStorage.removeItem('successDel');
      const timer = setTimeout(() => setSuccessDel(''), 5000);
      return () => clearTimeout(timer)
    }
  }, [successDel]);

  const fetchData = useCallback(async () => {
    try {
      const res = await etatService.getAllEtats();
      const allEtats = [...res.data].reverse();
      setEtats(allEtats);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const deleteEtat = (etatId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce Dossier ?')) {
      etatService.deleteEtat(etatId)
        .then((res) => {
          setErrorDel(null);
          sessionStorage.setItem("successDel", "Dossier supprimé avec succès");
          window.location.reload();
        })
        .catch((err) => {
          sessionStorage.setItem("errorDel", "Erreur lors de la suppression du dossier: " + err.response.data.message);
        });
    }
  };

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Impression - Liste des dossiers</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #999;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #e2f0d9;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="vh-100" style={{ color: '#1f5733' }}>
      <h5 className='m-4'><strong>TABLEAU DES DOSSIERS DU CONTENTIEUX</strong></h5>

      <div className="d-flex justify-content-end mb-3 me-4">
        <button onClick={handlePrint} className="btn btn-outline-success">🖨️ Imprimer la liste</button>
      </div>

      {message && <div className='alert alert-success'>{message}</div>}
      {errorDel && <div className='alert alert-danger'>{errorDel}</div>}
      {successDel && <div className='alert alert-success'>{successDel}</div>}

      <div ref={printRef}>
        <Table className="table- table-hover">
          <thead>
            <tr className='table-success'>
              <th className='col'>ID</th>
              <th className='col-2'>Tribunal / Chambre</th>
              <th className='col-2'>Numéro du dossier</th>
              <th className='col-2'>Nom et qualités des <br />parties / Conseil</th>
              <th className='col-2'>Objet</th>
              <th className='col-2'>Faits et procédures</th>
              <th className='col-2'>Moyens des parties</th>
              <th className='col-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEtats
              .slice(indexOfFirstItem, indexOfLastItem)
              .map((etats, index) => (
                <tr key={index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{etats.tribunalChambres}</td>
                  <td>{etats.numeroDossier}</td>
                  <td>{etats.nomEtQualiteDesPartiesConseil}</td>
                  <td>{etats.objet}</td>
                  <td>{etats.faitsEtProcedure}</td>
                  <td>{etats.moyensDesParties}</td>
                  <td>
                    <DropdownButton id={`dropdown-button-${etats.etatId}`} title="Actions" variant="warning" size="sm">
                      <Dropdown.Item as={Link} to={`/admin/etat/details/${etats.etatId}`}>
                        <FaEye className="me-2" />
                        <button className="btn btn-primary">Détails</button>
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to={`/admin/etat/edit/${etats.etatId}`}>
                        <FaEdit className="me-2" />
                        <button className="btn btn-success">Modifier</button>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => deleteEtat(etats.etatId)}>
                        <FaTrash className="me-2" />
                        <button className="btn btn-danger">Supprimer</button>
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <nav>
        <ul className="pagination">
          {
            Array.from({ length: Math.ceil(etats.length / itemsPerPage) }).map((_, idx) => (
              <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePagination(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

export default EtatList;
