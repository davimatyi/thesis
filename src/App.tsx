import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DataEditor from './routes/DataEditor';
import Overview from './routes/Overview';
import StyleEditor from './routes/StyleEditor';
import Welcome from './routes/Welcome';
import { defaultChart } from './types/ChartDataType';

let chart = defaultChart;

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/editor" element={<DataEditor chart={chart} />} />
            <Route path="/style" element={<StyleEditor chart={chart} />} />
            <Route path="/overview" element={<Overview chart={chart} />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
