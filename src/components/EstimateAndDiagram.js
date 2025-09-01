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
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  }
`;

const LevelLabel = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
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
  },
  accessibilityMultipliers: {
    easy: 0.9,
    moderate: 1.0,
    difficult: 1.4
  }
};

const EstimateAndDiagram = ({ roofData }) => {
  // Calculate estimate based on roof data
  const estimate = useMemo(() => {
    let baseEstimate = PRICING.basePrice * roofData.levels;
    
    // Apply multipliers
    baseEstimate *= PRICING.sizeMultipliers[roofData.sizePerLevel];
    baseEstimate *= PRICING.steepnessMultipliers[roofData.steepness];
    baseEstimate *= PRICING.mossMultipliers[roofData.mossCoverage];
    baseEstimate *= PRICING.materialMultipliers[roofData.material];
    baseEstimate *= PRICING.accessibilityMultipliers[roofData.accessibility];
    
    return Math.round(baseEstimate);
  }, [roofData]);

  // Generate roof diagram based on levels and sizes
  const roofLevels = useMemo(() => {
    const levels = [];
    const sizeWidths = {
      small: 140,
      medium: 180,
      large: 220
    };
    
    // Create levels from bottom to top (largest to smallest)
    for (let i = roofData.levels - 1; i >= 0; i--) {
      const baseWidth = sizeWidths[roofData.sizePerLevel];
      // Each level gets progressively smaller
      const width = baseWidth * (0.8 + (i * 0.1));
      const height = 50 + (i * 15); // Each level gets slightly taller
      const colors = ['#8FBC8F', '#90EE90', '#98FB98']; // Different green shades
      
      levels.push({
        width,
        height,
        color: colors[i % colors.length],
        level: roofData.levels - i
      });
    }
    
    return levels; // Already in correct order (bottom to top)
  }, [roofData.levels, roofData.sizePerLevel]);

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
          <DiagramTitle>Your Roof Configuration</DiagramTitle>
          <DiagramContainer>
            {roofLevels.map((level, index) => (
              <RoofLevel
                key={index}
                color={level.color}
                style={{
                  width: `${level.width}px`,
                  height: `${level.height}px`
                }}
              >
                <LevelLabel>Level {level.level}</LevelLabel>
              </RoofLevel>
            ))}
          </DiagramContainer>
        </div>
      </BottomSection>
    </Container>
  );
};

export default EstimateAndDiagram;

