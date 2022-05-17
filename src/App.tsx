import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DataEditor from './routes/DataEditor';
import Overview from './routes/Overview';
import StyleEditor from './routes/StyleEditor';
import Welcome from './routes/Welcome';
import defaultChart, { ChartData } from './types/ChartDataType';
import SlideRoutes from 'react-slide-routes';


const App: React.FC = () => {
  const [chart, setChart] = useState<ChartData>(defaultChart);
  const [previousFiles,] = useState<{name: string, path: string}[]> ([]);
  
    return (
      <div className="App">
          <SlideRoutes>
            <Route path="/" element={<Welcome chart={chart} setChart={setChart} prevFilesList={previousFiles} />} />
            <Route path="/editor" element={<DataEditor chart={chart} prevFilesList={previousFiles} />} />
            <Route path="/style" element={<StyleEditor chart={chart} />} />
            <Route path="/overview" element={<Overview chart={chart} prevFilesList={previousFiles} />} />
          </SlideRoutes>
      </div>
    );
}

export default App;
