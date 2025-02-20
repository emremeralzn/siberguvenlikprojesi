import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import SimulationCard from '../Components/SimulationCard';
import FeedbackModal from '../Components/FeedbackModal';
import { fetchUserScores, fetchUserSimulationLogs, fetchEducationContents } from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [scores, setScores] = useState([]);
  const [simulations, setSimulations] = useState([]);
  const [educationContents, setEducationContents] = useState([]);

  useEffect(() => {
  if (user) {
    // Kullanıcı skorlarını yükle
    fetchUserScores(user.id)
      .then((data) => {
        console.log('Scores:', data); // Konsolda kontrol edin
        setScores(data);
      });

    // Kullanıcı simülasyon geçmişini yükle
    fetchUserSimulationLogs(user.id)
      .then((data) => {
        console.log('Simulations:', data); // Konsolda kontrol edin
        setSimulations(data);
      });
  }
}, [user]);


  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
    setFeedbackOpen(true);
  };

  return (
    <div style={styles.dashboardContainer}>
      <h1>Dashboard</h1>
      {user ? (
        <div style={styles.userInfo}>
          <h2>Hoş geldiniz, {user.username}</h2>
          <p>Puanınız: <span style={styles.userScore}>{user.score}</span></p>

          <div style={styles.section}>
            <h3>Simülasyon Geçmişi</h3>
            <div style={styles.simulationList}>
              {simulations.map((simulation) => (
                <SimulationCard
                  key={simulation.id}
                  simulation={{
                    ...simulation,
                    onFeedbackClick: () => handleFeedbackClick('Simülasyon için geri bildirim...')
                  }}
                />
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h3>Kullanıcı Skorları</h3>
            <ul>
              {scores.map((score, index) => (
                <li key={index}>Tarih: {score.date} - Puan: {score.value}</li>
              ))}
            </ul>
          </div>

          <div style={styles.section}>
            <h3>Eğitim İçerikleri</h3>
            <ul>
              {educationContents.map((content) => (
                <li key={content.id}>{content.title}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Giriş yapmadınız. Lütfen giriş yapınız.</p>
      )}
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setFeedbackOpen(false)} 
        feedback={selectedFeedback} 
      />
    </div>
  );
};

const styles = {
  dashboardContainer: { /* mevcut stiller */ },
  userInfo: { /* mevcut stiller */ },
  userScore: { /* mevcut stiller */ },
  simulationList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    marginTop: '20px',
  },
  section: {
    marginTop: '30px',
  }
};

export default Dashboard;
