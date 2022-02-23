import React from 'react';
import LinkButton from '../components/buttons/LinkButton';
import ChartView from '../rendering/ChartView';
import { defaultChart } from '../types/ChartDataType';

const Overview: React.FC = () => {
  return (
    <>
      Overview
      <LinkButton to="/style">Back</LinkButton>
      <ChartView data={defaultChart} />
    </>
  );
}

export default Overview;