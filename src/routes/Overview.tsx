import React from 'react';
import LinkButton from '../components/buttons/LinkButton';
import ChartView from '../rendering/ChartView';
import { DefaultChart } from '../types/chartDataType';

const Overview: React.FC = () => {
  return (
    <>
      Overview
      <LinkButton to="/style">Back</LinkButton>
      <ChartView data={DefaultChart} />
    </>
  );
}

export default Overview;