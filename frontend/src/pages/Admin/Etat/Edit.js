import React, { useState, useEffect, useCallback } from 'react';
// import { FaClipboard, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaCar } from 'react-icons/fa';
import { etatService } from '@/_services';
import { useParams, useNavigate } from 'react-router-dom';

const EditEtat = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // const connectedUser = JSON.parse(sessionStorage.getItem('user')) || {};

  const [etat, setEtat] = useState({
    tribunalChambres: '',
    numeroDossier: '',
    nomEtQualiteDesPartiesConseil: '',
    objet: '',
    faitsEtProcedure: '',
    moyensDesParties: '',
    observations: '',
    updatedAt: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const [etat] = await Promise.all([
        etatService.getEtat(uid),
      ]);


      setEtat({
        tribunalChambres: etat.tribunalChambres || '',
        numeroDossier: etat.numeroDossier || '',
        nomEtQualiteDesPartiesConseil: etat.nomEtQualiteDesPartiesConseil || '',
        objet: etat.objet || '',
        faitsEtProcedure: etat.faitsEtProcedure || '',
        moyensDesParties: etat.moyensDesParties || '',
        observations: etat.observations || '',
        updatedAt: etat.updatedAt || '',
      });
    } catch (error) {
      setError(`Erreur lors du chargement des données : ${error.response?.data?.message || error.message}`);
    }
  }, [uid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEtat(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedEtat = {
        ...etat,
      };

      await etatService.editEtat(uid, formattedEtat);

      sessionStorage.setItem("successMessage", "Opération réussie! Dossier mise à jour avec succès.");
      navigate('/admin/etat/list');
    } catch (error) {
      setError(`Opération échouée : ${error.response?.data?.message || error.message}`);
    }
  };

  const renderInputGroup = (id, label, icon, type = "text") => (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">{icon}</span>
          <input
            type={type}
            className="form-control"
            id={id}
            name={id}
            value={etat[id]}
            onChange={handleChange}
          />
      </div>
    </div>
  );
  const cancelSubmit = () => {
    navigate('/admin/etat/list');
  }

  return (
    <div className="container mt-3">
      <h3 className="mb-4">Modifier un dossier</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {renderInputGroup("tribunalChambres", "Tribunal / Chambre")}
        {renderInputGroup("numeroDossier", "Numéro du dossier")}
        {renderInputGroup("nomEtQualiteDesPartiesConseil", "Nom et qualite des parties / Conseil")}
        {renderInputGroup("objet", "Objet")}
        {renderInputGroup("faitsEtProcedure", "Faits et procédures")}
        {renderInputGroup("moyensDesParties", "Moyens des parties")}
        {renderInputGroup("observations", "Observations")}
        <div className="d-flex justify-content-center mt-5">
          <button type="submit" className="btn btn-primary mx-5">Enregistrer</button>
          <div><button type="submit" className="btn btn-warning" onClick={cancelSubmit}>Annuler</button></div>
        </div>
      </form>
    </div>
  );
};

export default EditEtat;