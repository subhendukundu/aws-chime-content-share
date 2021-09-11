import React from 'react';

import styled from 'styled-components';

export const StyledList = styled.dl`
  font-size: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  width: 28.125rem;
`;

export const MediaStatsList = ({ children }) => (
  <StyledList>{children}</StyledList>
);

export default MediaStatsList;