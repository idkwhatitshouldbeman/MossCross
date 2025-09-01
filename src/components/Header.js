import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 40px 0;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #D2B48C 0%, #F5DEB3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>MossCross</Logo>
      <Tagline>Professional Roof Cleaning Services</Tagline>
    </HeaderContainer>
  );
};

export default Header;

