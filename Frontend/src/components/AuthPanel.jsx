import React, { useState } from 'react';
import axios from 'axios';
import './AuthPanel.css';

function AuthPanel({ user, setUser, savedAlgorithms, setSavedAlgorithms, code, setCode }) {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [algorithmName, setAlgorithmName] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const data = isLogin 
        ? { email, password }
        : { name, email, password };

      const response = await axios.post(endpoint, data);
      
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      setShowAuth(false);
      setMessage('');
      loadAlgorithms();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setSavedAlgorithms([]);
  };

  const loadAlgorithms = async () => {
    try {
      const response = await axios.get('/api/algorithms');
      setSavedAlgorithms(response.data);
    } catch (error) {
      console.error('Erreur de chargement des algorithmes:', error);
    }
  };

  const saveAlgorithm = async () => {
    if (!algorithmName.trim()) {
      setMessage('Veuillez entrer un nom pour l\'algorithme');
      return;
    }

    try {
      await axios.post('/api/algorithms', {
        name: algorithmName,
        code: code
      });
      
      setAlgorithmName('');
      setMessage('Algorithme sauvegardé avec succès!');
      loadAlgorithms();
    } catch (error) {
      setMessage('Erreur lors de la sauvegarde');
    }
  };

  const loadAlgorithm = (algorithm) => {
    setCode(algorithm.code);
    setMessage(`Algorithme "${algorithm.name}" chargé`);
  };

  return (
    <div className="auth-panel">
      {!user ? (
        <>
          <button onClick={() => setShowAuth(!showAuth)} className="btn-auth">
            {showAuth ? 'Fermer' : 'Se connecter / S\'inscrire'}
          </button>

          {showAuth && (
            <div className="auth-form">
              <h3>{isLogin ? 'Connexion' : 'Inscription'}</h3>
              <form onSubmit={handleAuth}>
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn-submit">
                  {isLogin ? 'Se connecter' : 'S\'inscrire'}
                </button>
              </form>
              <button onClick={() => setIsLogin(!isLogin)} className="btn-toggle">
                {isLogin ? 'Créer un compte' : 'Déjà inscrit?'}
              </button>
              {message && <p className="message">{message}</p>}
            </div>
          )}
        </>
      ) : (
        <div className="user-panel">
          <span className="user-name">Bonjour, {user.name}!</span>
          
          <div className="save-section">
            <input
              type="text"
              placeholder="Nom de l'algorithme"
              value={algorithmName}
              onChange={(e) => setAlgorithmName(e.target.value)}
            />
            <button onClick={saveAlgorithm} className="btn-save">
              💾 Sauvegarder
            </button>
          </div>

          {savedAlgorithms.length > 0 && (
            <div className="saved-algorithms">
              <h4>Algorithmes sauvegardés:</h4>
              <ul>
                {savedAlgorithms.map((algo) => (
                  <li key={algo.id} onClick={() => loadAlgorithm(algo)}>
                    {algo.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={handleLogout} className="btn-logout">
            Déconnexion
          </button>
          
          {message && <p className="message success">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default AuthPanel;
