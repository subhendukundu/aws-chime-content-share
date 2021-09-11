import React from 'react';
import styled from 'styled-components';

export const StyledItemMetricName = styled.dt`
  line-height: 1.5rem;
  margin-left: 1.5rem;
  width: 30%;
`;

export const StyledItemMetricValue = styled.dd`
  line-height: 1.5rem;
  width: 30%;
  margin-left: 0;
`;

export const MetricItem = ({
  metricName,
  metricValues
}) => {
  const showMetricItem = metricValues[0] && metricValues[0] !== '';
  return (
    <>
      {showMetricItem && (
        <>
          <StyledItemMetricName>{metricName}</StyledItemMetricName>
          {metricValues.map(metricValue => {
            return <StyledItemMetricValue>{metricValue}</StyledItemMetricValue>;
          })}
        </>
      )}
    </>
  );
};

export default MetricItem;