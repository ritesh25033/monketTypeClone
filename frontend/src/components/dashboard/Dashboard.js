import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user data
        const userRes = await axios.get('http://localhost:5000/api/auth/user', {
          headers: { 'x-auth-token': token }
        });
        
        setUser(userRes.data);
        
        // Fetch user's sessions
        const sessionsRes = await axios.get(`http://localhost:5000/api/sessions/${userRes.data._id}`, {
          headers: { 'x-auth-token': token }
        });
        
        setSessions(sessionsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="user-info">
        <h2>Welcome, {user.username}!</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
      
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Sessions</h3>
          <p>{sessions.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average WPM</h3>
          <p>
            {sessions.length > 0 
              ? Math.round(sessions.reduce((sum, session) => sum + session.wpm, 0) / sessions.length) 
              : 0}
          </p>
        </div>
        <div className="stat-card">
          <h3>Average Accuracy</h3>
          <p>
            {sessions.length > 0 
              ? Math.round(sessions.reduce((sum, session) => sum + session.accuracy, 0) / sessions.length) 
              : 0}%
          </p>
        </div>
      </div>
      
      <h3>Your Typing History</h3>
      
      {sessions.length === 0 ? (
        <p>No typing sessions found. Take a test to see your results here!</p>
      ) : (
        <div className="session-list">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Errors</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session._id}>
                  <td>{formatDate(session.createdAt)}</td>
                  <td>{session.wpm}</td>
                  <td>{session.accuracy}%</td>
                  <td>{session.totalErrors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
