import React, { useMemo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.12);
  }
`;

const TopSection = styled.div`
  background: rgba(210, 180, 140, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BottomSection = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const EstimateTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
`;

const EstimateAmount = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #D2B48C 0%, #F5DEB3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const EstimateNote = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
`;

const DiagramContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const RoofLevel = styled.div`
  background: linear-gradient(135deg, ${props => props.color} 0%, ${props => props.color}dd 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  transition: all 0.3s ease;
  clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%);
  }
`;



const DiagramTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 20px;
`;

// Pricing multipliers for different factors
const PRICING = {
  basePrice: 300,
  sizeMultipliers: {
    small: 0.8,
    medium: 1.0,
    large: 1.4
  },
  steepnessMultipliers: {
    'Flat': 0.9,
    'Low': 1.0,
    'Moderate': 1.1,
    'Steep': 1.3,
    'Very Steep': 1.6
  },
  mossMultipliers: {
    'None': 0.8,
    'Light': 1.0,
    'Medium': 1.3,
    'Heavy': 1.8
  },
  materialMultipliers: {
    shingle: 1.0,
    tile: 1.2,
    metal: 1.1,
    slate: 1.4,
    wood: 1.3,
    other: 1.1
  }
};

const EstimateAndDiagram = ({ roofData }) => {
  // Calculate estimate based on roof data
  const estimate = useMemo(() => {
    let baseEstimate = PRICING.basePrice * roofData.levels;
    
    // Apply multipliers
    baseEstimate *= PRICING.sizeMultipliers[roofData.totalSize];
    baseEstimate *= PRICING.steepnessMultipliers[roofData.steepness];
    baseEstimate *= PRICING.mossMultipliers[roofData.mossCoverage];
    baseEstimate *= PRICING.materialMultipliers[roofData.material];
    
    return Math.round(baseEstimate);
  }, [roofData]);

  // Generate roof diagram based on levels, total size, steepness, and moss coverage
  const roofLevels = useMemo(() => {
    const levels = [];
    const sizeWidths = {
      small: 140,
      medium: 180,
      large: 220
    };
    
    // Get base width from total size
    const baseWidth = sizeWidths[roofData.totalSize];
    
         // Steepness affects the clip-path (angle of the roof with overhang)
     const steepnessAngles = {
       'Flat': 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
       'Low': 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)',
       'Moderate': 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)',
       'Steep': 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)',
       'Very Steep': 'polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)'
     };
    
    // Moss coverage affects green color intensity
    const mossIntensity = {
      'None': 0.3,
      'Light': 0.5,
      'Medium': 0.7,
      'Heavy': 0.9
    };
    
    const intensity = mossIntensity[roofData.mossCoverage];
    const baseGreen = Math.floor(144 * intensity); // 144 is base green value
    const colors = [
      `rgb(${baseGreen}, ${Math.floor(188 * intensity)}, ${Math.floor(143 * intensity)})`, // DarkSeaGreen
      `rgb(${Math.floor(144 * intensity)}, ${Math.floor(238 * intensity)}, ${Math.floor(144 * intensity)})`, // LightGreen
      `rgb(${Math.floor(152 * intensity)}, ${Math.floor(251 * intensity)}, ${Math.floor(152 * intensity)})`  // PaleGreen
    ];
    
         // Create levels from bottom to top (largest to smallest)
     for (let i = 0; i < roofData.levels; i++) {
       // Each level gets progressively smaller from bottom to top
       const width = baseWidth * (1.0 - (i * 0.15));
       const height = 60; // All levels have the same height
      
      levels.push({
        width,
        height,
        color: colors[i % colors.length],
        level: i + 1,
        clipPath: steepnessAngles[roofData.steepness]
      });
    }
    
    return levels;
  }, [roofData.levels, roofData.totalSize, roofData.steepness, roofData.mossCoverage]);

  return (
    <Container>
      <TopSection>
        <EstimateTitle>Estimated Cleaning Cost</EstimateTitle>
        <EstimateAmount>${estimate.toLocaleString()}</EstimateAmount>
        <EstimateNote>
          *This is an estimate based on your inputs. Final price may vary based on on-site inspection.
        </EstimateNote>
      </TopSection>
      
      <BottomSection>
        <div>
                     <DiagramTitle>Roof Example</DiagramTitle>
          <DiagramContainer>
                         {roofLevels.slice().reverse().map((level, index) => (
                              <RoofLevel
                 key={index}
                 color={level.color}
                 style={{
                   width: `${level.width}px`,
                   height: `${level.height}px`
                 }}
               />
            ))}
          </DiagramContainer>
        </div>
      </BottomSection>
    </Container>
  );
};

export default EstimateAndDiagram;

