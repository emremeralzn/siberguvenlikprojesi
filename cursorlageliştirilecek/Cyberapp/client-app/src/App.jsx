// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';  // Footer bileşenini import ediyoruz
import Home from './pages/Home'; 
import About from './pages/About';
import PhishingSimulator from './pages/PhishingSimulator';
import LoginPage from './pages/LoginPage';
import UserPanel from './pages/UserPanel';
import Contact from './pages/Contact';
import BaitingSimulator from './pages/BaitingSimulator';
import RegisterPage from './pages/RegisterPage';
import PhishingTestPage from './pages/PhishingTestPage';
import BaitingTestPage from './pages/BaitingTestPage';
import PretextingSimulator from './pages/PretextingSimulator';
import PretextingTestPage from './pages/PretextingTestPage';
import VishingSimulator from './pages/VishingSimulator';
import VishingTestPage from './pages/VishingTestPage';
import TipsPage from './pages/TipsPage';
import PhishingSimulatorPage from './pages/PhishingSimulatorPage';
import SimulatorsPage from './pages/SimulatorsPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/userpanel" element={<UserPanel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/simulators" element={<SimulatorsPage />} />

          <Route path="/simulators/phishing" element={<PhishingSimulator />} />
          <Route path="/simulators/phishing/test" element={<PhishingTestPage />} />
          <Route path="/simulators/phishing/simulator" element={<PhishingSimulatorPage />} />

          <Route path="/simulators/baiting" element={<BaitingSimulator />} />
          <Route path="/simulators/baiting/test" element={<BaitingTestPage />} />

          <Route path="/simulators/pretexting" element={<PretextingSimulator />} />
          <Route path="/simulators/pretexting/test" element={<PretextingTestPage />} />

          <Route path="/simulators/vishing" element={<VishingSimulator />} />
          <Route path="/simulators/vishing/test" element={<VishingTestPage />} />

          <Route path="/simulators/pretexting/test" element={<PretextingTestPage />} />
        </Routes>
        <Footer footerData={{/* footer verilerini buraya ekleyebilirsiniz */}} />  {/* Footer'ı burada ekliyoruz */}
      </Router>
    </AuthProvider>
  );
}

export default App;
