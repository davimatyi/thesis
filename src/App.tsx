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
  const [previousFiles,] = useState<string[]> (() => {
    const data = localStorage.getItem("prevFiles");
    if(data !== null) return JSON.parse(data);
    else return [];
  });

    return (
      <div className="App">
          <SlideRoutes>
            <Route path="/" element={<Welcome chart={chart} setChart={setChart} prevFilesList={previousFiles} />} />
            <Route path="/editor" element={<DataEditor chart={chart} />} />
            <Route path="/style" element={<StyleEditor chart={chart} />} />
            <Route path="/overview" element={<Overview chart={chart} />} />
          </SlideRoutes>
      </div>
    );
}

export default App;
