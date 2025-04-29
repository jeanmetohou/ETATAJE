import React from 'react';
import { useNavigate } from 'react-router-dom';

const EtatDetail = () => {
    const navigate = useNavigate();

    const cancelSubmit = () => {
        navigate('/admin/etat/list');
      }
    return (
        <div>
            <h3>Détails du dossier</h3>
          <div><button type="submit" className="btn btn-warning" onClick={cancelSubmit}>Retour</button></div>
        </div>
    );
};

export default EtatDetail;