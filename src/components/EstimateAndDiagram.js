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
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`;

const RoofLevel = styled.div`
  background: ${props => props.color};
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
  min-height: 40px;
  
  &:hover {
    transform: scale(1.02);
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

const RoofLine = styled.div`
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0;
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
    'Flat': 0.05,     // Minimal differences (flat roof)
    'Low': 0.15,      // Small differences
    'Moderate': 0.3,  // Medium differences
    'Steep': 0.5,     // Large differences
    'Very Steep': 0.7 // Very large differences
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

  // Generate roof diagram based on levels, total size, and moss coverage
  const roofLevels = useMemo(() => {
    const levels = [];
    const sizeWidths = {
      small: 140,
      medium: 180,
      large: 220
    };
    
    // Get base width from total size
    const baseWidth = sizeWidths[roofData.totalSize];
    
    // Steepness affects the size difference between levels - CORRECTED values
    const steepnessMultipliers = {
      'Flat': 0.05,     // Minimal differences (flat roof)
      'Low': 0.15,      // Small differences
      'Moderate': 0.3,  // Medium differences
      'Steep': 0.5,     // Large differences
      'Very Steep': 0.7 // Very large differences
    };
    
    const steepnessFactor = steepnessMultipliers[roofData.steepness];
    
    // Moss coverage affects green color intensity - enhanced for more dramatic visual difference
    const mossIntensity = {
      'None': 0.2,      // Very light, almost white-green
      'Light': 0.4,     // Light green
      'Medium': 0.7,    // Medium green
      'Heavy': 1.0      // Full green intensity
    };
    
    const intensity = mossIntensity[roofData.mossCoverage];
    
    // Enhanced color palette with more dramatic moss coverage differences
    const colors = [
      // Darker green for bottom level
      `rgb(${Math.floor(34 * intensity)}, ${Math.floor(139 * intensity)}, ${Math.floor(34 * intensity)})`, // ForestGreen
      // Medium green for middle level  
      `rgb(${Math.floor(50 * intensity)}, ${Math.floor(205 * intensity)}, ${Math.floor(50 * intensity)})`, // LimeGreen
      // Lighter green for top level
      `rgb(${Math.floor(144 * intensity)}, ${Math.floor(238 * intensity)}, ${Math.floor(144 * intensity)})`  // LightGreen
    ];
    
    // Calculate sizes that maintain average width but vary based on steepness
    const totalLevels = roofData.levels;
    const averageWidth = baseWidth;
    
    // Create levels from bottom to top (largest to smallest)
    for (let i = 0; i < totalLevels; i++) {
      // Calculate position from bottom (0 = bottom, totalLevels-1 = top)
      const positionFromBottom = i;
      
      // Calculate width ensuring average stays the same
      let width;
      if (totalLevels === 1) {
        width = averageWidth;
      } else {
        // For multiple levels, distribute sizes around the average
        // Bottom level (i=0) should be largest, top level (i=totalLevels-1) should be smallest
        const normalizedPosition = positionFromBottom / (totalLevels - 1);
        
        // Use a more stable width distribution that doesn't depend heavily on steepness
        // This prevents extreme size variations that can break the diagram
        const sizeMultiplier = 1.2 - (normalizedPosition * 0.4); // 1.2x to 0.8x range
        width = averageWidth * sizeMultiplier;
        
        // Ensure width is always reasonable
        width = Math.max(width, averageWidth * 0.4); // Minimum 40% of average width
        width = Math.min(width, averageWidth * 1.5); // Maximum 150% of average width
      }
      
      const height = 50; // Reduced height for more compact display
      
      const level = {
        width,
        height,
        color: colors[i % colors.length],
        level: i + 1
      };
      
      levels.push(level);
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
              <React.Fragment key={index}>
                <RoofLevel
                  color={level.color}
                  style={{
                    width: `${level.width}px`,
                    height: `${level.height}px`
                  }}
                />
                {index < roofLevels.length - 1 && <RoofLine />}
              </React.Fragment>
            ))}
          </DiagramContainer>
        </div>
      </BottomSection>
    </Container>
  );
};

export default EstimateAndDiagram;

