import React from 'react';
import { AuthProvider } from "./providers/AuthProvider";
import './App.css';
import './service/firebase';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import DataList from "./components/DataList";
import PublicDataList from "./components/PublicDataList";
import UserProfile from "./components/UserProfile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from "@mui/material";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Box flexGrow={1} padding={3} paddingBottom={8}>
            <Routes>
              <Route path="/" element={<DataList />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/public" element={<PublicDataList />} /> 
            </Routes>
          </Box>
          <Footer />
        </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;