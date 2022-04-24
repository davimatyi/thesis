import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DataEditor from './routes/DataEditor';
import Overview from './routes/Overview';
import StyleEditor from './routes/StyleEditor';
import Welcome from './routes/Welcome';
import { ChartData } from './types/ChartDataType';

let chart: ChartData = {
  title: "title",
  type: "bar",
  background: "#ffffff",
  dimensity: 1,
  values: [[0]],
  x_axis_labels: [""],
  y_axis_labels: [""],
  stroke_color: "#555555",
  stroke_width: 5,
  stroke: false,
  fill_primary: "#72b2ac",
  fill_secondary: "#00ff00",
  fill_gradient: false,
  fill_colors: ["#226CB3", "#4FBAF3"],
  use_multiple_colors: true,
  show_x_axis: true,
  show_y_axis: true,
  axis_line_width: 5,
  axis_line_color: "#222222",
  axis_marker_length: 25,
  y_axis_marker_frequency: 100,
  show_value_labels: true,
  show_background_grid: true,
  spacing: 20,
  border_radius: 0,
  margin: 100,
  start_from_zero: true
}

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Welcome chart={chart} />} />
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
