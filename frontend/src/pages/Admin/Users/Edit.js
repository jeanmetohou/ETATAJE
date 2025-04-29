import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '@/_services';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const EditUser = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes] = await Promise.all([
          userService.getUser(uid),
        ]);

        const { fullname, email } = userRes.data;


        setUser({
          fullname: fullname || '',
          email: email || '',
          password: '',
        });

      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Erreur lors du chargement des données.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  const onChange = ({ target: { name, value } }) => {
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await userService.editUser(uid, user);
      sessionStorage.setItem(
        'successMessage',
        "Les informations de l'utilisateur ont été mises à jour avec succès"
      );
      navigate('/admin/user/list');
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError('Erreur lors de la mise à jour des informations de l\'utilisateur.');
    }
  };

  const renderInput = (label, icon, name, type = 'text', placeholder = '', additionalProps = {}) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">{icon}</span>
        <input type={type} className="form-control" id={name} name={name} value={user[name]} onChange={onChange} placeholder={placeholder} {...additionalProps} />
      </div>
    </div>
  );

  const cancelSubmit = () => {
    navigate('/admin/user/list');
  }

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Modifier Utilisateur</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {renderInput('Nom Complet', 'fullname', 'fullname', 'text', <FaUser />)}
        {renderInput('Email', 'email', 'email', <FaEnvelope />)}
        {renderInput('Mot de passe', 'password', 'password', <FaLock />)}
        <div className="d-flex justify-content-center mt-5">
          <div><button type="submit" className="btn btn-primary mx-5">Valider</button></div>
          <div><button type="submit" className="btn btn-warning" onClick={cancelSubmit}>Annuler</button></div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
