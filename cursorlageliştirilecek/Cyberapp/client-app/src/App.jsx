// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';  // Footer bileşenini import ediyoruz
import Home from './pages/Common/Home'; 
import About from './pages/Common/About';
import PhishingSimulator from './pages/Phishing/PhishingSimulator';
import LoginPage from './pages/LoginPage';
import UserPanel from './pages/UserPanel';
import Contact from './pages/Common/Contact';
import BaitingSimulator from './pages/Baiting/BaitingSimulator';
import RegisterPage from './pages/RegisterPage';
import PhishingTestPage from './pages/Phishing/PhishingTestPage';
import BaitingTestPage from './pages/Baiting/BaitingTestPage';
import PretextingSimulator from './pages/Pretexting/PretextingSimulator';
import PretextingTestPage from './pages/Pretexting/PretextingTestPage';
import VishingSimulator from './pages/Vishing/VishingSimulator';
import VishingTestPage from './pages/Vishing/VishingTestPage';
import TipsPage from './pages/Common/TipsPage';
import PhishingSimulatorPage from './pages/Phishing/PhishingSimulatorPage';
import SimulatorsPage from './pages/Common/SimulatorsPage';
import BaitingSimulatorPage from './pages/Baiting/BaitingSimulatorPage';
import PretextingSimulatorPage from './pages/Pretexting/PretextingSimulatorPage';
import VishingSimulatorPage from './pages/Vishing/VishingSimulatorPage';
import Resources from './pages/Common/Resources';
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
          <Route path="/resources" element={<Resources />} />
          <Route path="/simulators" element={<SimulatorsPage />} />

          <Route path="/simulators/phishing" element={<PhishingSimulator />} />
          <Route path="/simulators/phishing/test" element={<PhishingTestPage />} />
          <Route path="/simulators/phishing/simulator" element={<PhishingSimulatorPage />} />

          <Route path="/simulators/baiting" element={<BaitingSimulator />} />
          <Route path="/simulators/baiting/test" element={<BaitingTestPage />} />
          <Route path="/simulators/baiting/simulator" element={<BaitingSimulatorPage />} />


          <Route path="/simulators/pretexting" element={<PretextingSimulator />} />
          <Route path="/simulators/pretexting/test" element={<PretextingTestPage />} />
          <Route path="/simulators/pretexting/simulator" element={<PretextingSimulatorPage />} />

          <Route path="/simulators/vishing" element={<VishingSimulator />} />
          <Route path="/simulators/vishing/test" element={<VishingTestPage />} />
          <Route path="/simulators/vishing/simulator" element={<VishingSimulatorPage />} />

          {/* <Route path="/*" element={<NotFoundPage />} /> */}
          {/* İLERDE YAPILACAK 404NOTFOUNDPAGESİ OLUSTUR */}
        </Routes>
        <Footer footerData={{/* footer verilerini buraya ekleyebilirsiniz */}} />  {/* Footer'ı burada ekliyoruz */}
      </Router>
    </AuthProvider>
  );
}

export default App;
