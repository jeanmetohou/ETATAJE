import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { userService } from '@/_services/';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };
      return updatedUser;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...user };

    console.log('User payload:', payload);

    try {
      await userService.postUser(payload);
      sessionStorage.setItem('successMessage', 'Utilisateur ajouté avec succès');
      navigate('/admin/user/list');
    } catch (err) {
      console.error(err);
      setError(`Erreur lors de l'ajout de l'utilisateur: ${err.response?.data?.message || err.message}`);
    }
  };

  const renderInputGroup = (label, name, type, icon) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <div className="input-group">
        <span className="input-group-text">{icon}</span>
        <input
          type={type}
          className="form-control"
          id={name}
          name={name}
          value={user[name]}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );

  const cancelSubmit = () => {
    navigate('/admin/user/list');
  }

  return (
    <div className="container mt-3">
      <h3 className="mb-4">Ajouter un Utilisateur</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {renderInputGroup('Nom Complet', 'fullname', 'text', <FaUser />)}
        {renderInputGroup('Email', 'email', 'email', <FaEnvelope />)}
        {renderInputGroup('Mot de passe', 'password', 'password', <FaLock />)}
        <div className="d-flex justify-content-center mt-5">
          <div><button type="submit" className="btn btn-primary mx-5">Valider</button></div>
          <div><button type="submit" className="btn btn-warning" onClick={cancelSubmit}>Annuler</button></div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;