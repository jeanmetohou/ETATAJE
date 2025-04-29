import React, { useState } from 'react';
import { etatService } from '@/_services';
import { useNavigate } from 'react-router-dom';

const AddEtat = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // const userProfil = JSON.parse(sessionStorage.getItem('user')) || {};

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEtat(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await etatService.postEtat(etat).then((res) => console.log(res.data));

      sessionStorage.setItem("successMessage", "Opération réussie! dossier ajouté");
      navigate('/admin/etat/list');
    } catch (error) {
      setError(`Opération échouée : ${error.response?.data?.message || error.message}`);
    }
  };

  const renderInputGroup = (id, label, type = "textarea") => (
    <div className="col-9 mb-3" style={{ justifyContent:'center' }}>
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        {type === "textarea"
          ? (<textarea className="form-control" id={id} name={id} value={etat[id]} onChange={handleChange} rows="4" placeholder={label} />)
          : (<input type={type} className="form-control" id={id} name={id} value={etat[id]} onChange={handleChange} />)}
      </div>
    </div>
  );

  const cancelSubmit = () => {
    navigate('/admin/etat/list');
  }

  return (
    <div className="container mt-3">
      <h3 className="mb-4">Ajouter un dossier</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
      {renderInputGroup("tribunalChambres", "Tribunal / Chambre")}
        {renderInputGroup("numeroDossier", "Numéro du dossier")}
        {renderInputGroup("nomEtQualiteDesPartiesConseil", "Nom et qualite des parties / Conseil")}
        {renderInputGroup("objet", "Objet", "textarea")}
        {renderInputGroup("faitsEtProcedure", "Faits et procédures")}
        {renderInputGroup("moyensDesParties", "Moyens des parties")}
        {renderInputGroup("observations", "Observations")}
        <div className="d-flex justify-content-center mt-5">
          <div><button type="submit" className="btn btn-primary mx-5">Valider</button></div>
          <div><button type="submit" className="btn btn-warning" onClick={cancelSubmit}>Annuler</button></div>
        </div>
      </form>
    </div>
  );
};

export default AddEtat;
