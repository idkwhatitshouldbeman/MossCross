import React from 'react';
import styled from 'styled-components';

const SlidersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 20px;
`;

const SliderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoIcon = styled.span`
  color: #D2B48C;
  cursor: help;
  font-size: 0.9rem;
  
  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 1000;
    margin-top: 25px;
    margin-left: -50px;
  }
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  transition: all 0.3s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D2B48C 0%, #F5DEB3 100%);
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D2B48C 0%, #F5DEB3 100%);
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  &::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #D2B48C;
    box-shadow: 0 0 0 2px rgba(210, 180, 140, 0.2);
  }

  option {
    background: #2F4F4F;
    color: white;
  }
`;

const ValueDisplay = styled.div`
  font-size: 0.9rem;
  color: #D2B48C;
  font-weight: 500;
  text-align: center;
  padding: 8px;
  background: rgba(210, 180, 140, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(210, 180, 140, 0.2);
`;

const SteepnessIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const InteractiveSliders = ({ roofData, onDataChange }) => {
  const steepnessLabels = ['Flat', 'Low', 'Moderate', 'Steep', 'Very Steep'];
  const mossLabels = ['None', 'Light', 'Medium', 'Heavy'];

  return (
    <div>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: '600', 
        marginBottom: '30px',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center'
      }}>
        Configure Your Roof
      </h2>
      
      <SlidersContainer>
        {/* Roof Levels */}
        <SliderGroup>
          <Label>
            Number of Roof Levels
            <InfoIcon data-tooltip="How many distinct levels or stories your roof has">ⓘ</InfoIcon>
          </Label>
          <Select
            value={roofData.levels}
            onChange={(e) => onDataChange('levels', parseInt(e.target.value))}
          >
            <option value={1}>1 Level</option>
            <option value={2}>2 Levels</option>
            <option value={3}>3 Levels</option>
          </Select>
        </SliderGroup>

        {/* Roof Size Per Level */}
        <SliderGroup>
          <Label>
            Size Per Level
            <InfoIcon data-tooltip="The approximate size category for each roof level">ⓘ</InfoIcon>
          </Label>
          <Slider
            type="range"
            min="0"
            max="2"
            value={roofData.sizePerLevel === 'small' ? 0 : roofData.sizePerLevel === 'medium' ? 1 : 2}
            onChange={(e) => {
              const sizes = ['small', 'medium', 'large'];
              onDataChange('sizePerLevel', sizes[parseInt(e.target.value)]);
            }}
          />
          <ValueDisplay>
            {roofData.sizePerLevel === 'small' ? 'Small (under 1000 sq ft)' : 
             roofData.sizePerLevel === 'medium' ? 'Medium (1000-2000 sq ft)' : 
             'Large (over 2000 sq ft)'}
          </ValueDisplay>
        </SliderGroup>

        {/* Steepness */}
        <SliderGroup>
          <Label>
            Roof Steepness
            <InfoIcon data-tooltip="How steep or angled your roof is - affects safety and difficulty">ⓘ</InfoIcon>
          </Label>
          <Slider
            type="range"
            min="0"
            max="4"
            value={steepnessLabels.indexOf(roofData.steepness)}
            onChange={(e) => onDataChange('steepness', steepnessLabels[parseInt(e.target.value)])}
          />
          <ValueDisplay>{roofData.steepness}</ValueDisplay>
          <SteepnessIcons>
            <span>🏠</span>
            <span>🏠</span>
            <span>🏠</span>
            <span>🏠</span>
            <span>🏠</span>
          </SteepnessIcons>
        </SliderGroup>

        {/* Moss Coverage */}
        <SliderGroup>
          <Label>
            Moss/Algae Coverage
            <InfoIcon data-tooltip="The amount of moss, algae, or organic growth on your roof">ⓘ</InfoIcon>
          </Label>
          <Slider
            type="range"
            min="0"
            max="3"
            value={mossLabels.indexOf(roofData.mossCoverage)}
            onChange={(e) => onDataChange('mossCoverage', mossLabels[parseInt(e.target.value)])}
          />
          <ValueDisplay>{roofData.mossCoverage}</ValueDisplay>
        </SliderGroup>

        {/* Roof Material */}
        <SliderGroup>
          <Label>
            Roof Material
            <InfoIcon data-tooltip="The primary material your roof is made of">ⓘ</InfoIcon>
          </Label>
          <Select
            value={roofData.material}
            onChange={(e) => onDataChange('material', e.target.value)}
          >
            <option value="shingle">Asphalt Shingle</option>
            <option value="tile">Clay/Concrete Tile</option>
            <option value="metal">Metal</option>
            <option value="slate">Slate</option>
            <option value="wood">Wood Shake</option>
            <option value="other">Other</option>
          </Select>
        </SliderGroup>

        {/* Accessibility */}
        <SliderGroup>
          <Label>
            Accessibility Level
            <InfoIcon data-tooltip="How easy it is to access and work on your roof">ⓘ</InfoIcon>
          </Label>
          <Select
            value={roofData.accessibility}
            onChange={(e) => onDataChange('accessibility', e.target.value)}
          >
            <option value="easy">Easy Access</option>
            <option value="moderate">Moderate Access</option>
            <option value="difficult">Difficult Access</option>
          </Select>
        </SliderGroup>
      </SlidersContainer>
    </div>
  );
};

export default InteractiveSliders;

