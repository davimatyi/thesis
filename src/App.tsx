import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DataEditor from './routes/DataEditor';
import Overview from './routes/Overview';
import StyleEditor from './routes/StyleEditor';
import Welcome from './routes/Welcome';
import defaultChart, { ChartData } from './types/ChartDataType';
import SlideRoutes from 'react-slide-routes';


const App: React.FC = () => {
  const [chart, setChart] = useState<ChartData>(defaultChart);
  const [previousFiles,] = useState<File[]> (() => {
    const data = localStorage.getItem("prevFiles");
    if(data !== null) return JSON.parse(data);
    else return [];
  });

    return (
      <div className="App">
          <SlideRoutes destroy="false">
            <Route path="/" element={<Welcome chart={chart} setChart={setChart} prevFilesList={previousFiles} />} />
            <Route path="/editor" element={<DataEditor chart={chart} prevFilesList={previousFiles} />} />
            <Route path="/style" element={<StyleEditor chart={chart} />} />
            <Route path="/overview" element={<Overview chart={chart} prevFilesList={previousFiles} />} />
          </SlideRoutes>
      </div>
    );
}

export default App;
