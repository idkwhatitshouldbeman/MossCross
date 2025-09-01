import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import InteractiveSliders from './components/InteractiveSliders';
import EstimateAndDiagram from './components/EstimateAndDiagram';
import ContactSection from './components/ContactSection';
import Header from './components/Header';

// Global styles for the glass morphism theme
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: linear-gradient(135deg, #1a3a3a 0%, #2F4F4F 25%, #3A5F5F 50%, #2F4F4F 75%, #1a3a3a 100%);
    min-height: 100vh;
    color: #ffffff;
    overflow-x: hidden;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(210, 180, 140, 0.5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(210, 180, 140, 0.7);
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  position: relative;
  
  /* Subtle background texture */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(210, 180, 140, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(210, 180, 140, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding-top: 20px;
  min-height: calc(100vh - 200px);
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const GlassPanel = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 30px;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: all 0.4s ease;
  height: fit-content;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.12);
  }
`;

function App() {
  // State for all roof variables
  const [roofData, setRoofData] = useState({
    levels: 1,
    totalSize: 'medium',
    steepness: 'moderate',
    mossCoverage: 'light',
    material: 'shingle'
  });

  // Update roof data when sliders change
  const handleRoofDataChange = (field, value) => {
    setRoofData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <GlassPanel>
            <InteractiveSliders 
              roofData={roofData} 
              onDataChange={handleRoofDataChange} 
            />
          </GlassPanel>
          
          <EstimateAndDiagram roofData={roofData} />
        </MainContent>
        
        <GlassPanel style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
          <ContactSection />
        </GlassPanel>
      </AppContainer>
    </>
  );
}

export default App;

