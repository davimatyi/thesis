export interface ChartData {
  title: string,
  type: string, // 'bar', 'line', 'pie' or '3dbar'
  background: string, // color hex
  dimensity: number,
  values: number[][],
  x_axis_labels: string[],
  y_axis_labels: string[],
  stroke_color: string, // hex
  stroke_width: number, // pixels
  stroke: boolean,
  fill_primary: string, // hex
  fill_secondary: string, // hex
  fill_gradient: boolean,
  fill_colors: string[], //hex[] alternating colors
  use_multiple_colors: boolean
  show_x_axis: boolean,
  show_y_axis: boolean,
  axis_line_width: number, // pixels
  axis_line_color: string, // hex
  axis_marker_length: number, // pixels
  y_axis_marker_frequency: number, // percentile
  show_value_labels: boolean,
  show_background_grid: boolean,
  spacing: number, // percentile
  border_radius: number, // pixels
  margin: number, // pixels
  start_from_zero: boolean,
  perspective_distance: number,
  perspective_xangle: number,
  perspective_yangle: number,
  perspective_yoffset: number
} 

const defaultChart: ChartData = {
  title: "title",
  type: "bar",
  background: "#ffffff",
  dimensity: 1,
  values: [[]],
  x_axis_labels: [],
  y_axis_labels: [],
  stroke_color: "#000000",
  stroke_width: 1,
  stroke: false,
  fill_primary: "#72b2ac",
  fill_secondary: "#00ff00",
  fill_gradient: false,
  fill_colors: ["#226CB3", "#4FBAF3"],
  use_multiple_colors: true,
  show_x_axis: true,
  show_y_axis: true,
  axis_line_width: 3,
  axis_line_color: "#222222",
  axis_marker_length: 25,
  y_axis_marker_frequency: 100,
  show_value_labels: true,
  show_background_grid: true,
  spacing: 20,
  border_radius: 0,
  margin: 100,
  start_from_zero: true,
  perspective_distance: 50,
  perspective_xangle: 1.5,
  perspective_yangle: 1,
  perspective_yoffset: 0
}

export default defaultChart;