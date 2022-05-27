import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DataEditorScreen from './routes/DataEditorScreen';
import OverviewScreen from './routes/OverviewScreen';
import StyleEditorScreen from './routes/StyleEditorScreen';
import WelcomeScreen from './routes/WelcomeScreen';
import defaultChart, { ChartData } from './types/ChartDataType';
import SlideRoutes from 'react-slide-routes';


const App: React.FC = () => {
  const [chart, setChart] = useState<ChartData>(defaultChart);
  const [previousFiles,] = useState<string[]> (() => {
    const data = localStorage.getItem("prevFiles");
    if(data !== null) return JSON.parse(data);
    else return [];
  });

    return (
      <div className="App">
          <SlideRoutes>
            <Route path="/" element={<WelcomeScreen chart={chart} setChart={setChart} prevFilesList={previousFiles} />} />
            <Route path="/editor" element={<DataEditorScreen chart={chart} />} />
            <Route path="/style" element={<StyleEditorScreen chart={chart} />} />
            <Route path="/overview" element={<OverviewScreen chart={chart} prevFilesList={previousFiles} />} />
          </SlideRoutes>
      </div>
    );
}

export default App;
