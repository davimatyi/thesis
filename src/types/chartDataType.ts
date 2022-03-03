export interface ChartData {
  title: string,
  type: string,
  background: string,
  foreground: string,
  dimensity: number,
  values: number[][],
  x_axis_labels: string[],
  y_axis_labels: string[],
  stroke_color: string,
  stroke_width: number,
  stroke: boolean,
  fill_primary: string,
  fill_secondary: string,
  fill_gradient: boolean,
  fill_colors: string[],
  use_multiple_colors: boolean
  show_x_axis: boolean,
  show_y_axis: boolean,
  axis_line_width: number,
  axis_line_color: string,
  axis_marker_length: number,
  y_axis_marker_frequency: number,
  show_value_labels: boolean,
  show_background_grid: boolean,
  spacing: number,
  border_radius: number,
  margin: number,
  start_from_zero: boolean
} 

export const defaultChart: ChartData = {
  title: "title",
  type: "line",
  background: "#eeeeee",
  foreground: "#000000",
  dimensity: 1,
  values: [[5, 6, 8, 7, 10]],
  x_axis_labels: ["value 1", "value 2", "value 3", "value 4", "value 5"],
  y_axis_labels: [],
  stroke_color: "#555555",
  stroke_width: 5,
  stroke: false,
  fill_primary: "#72b2ac",
  fill_secondary: "#00ff00",
  fill_gradient: false,
  fill_colors: ["#ff0000", "#00ff00"],
  use_multiple_colors: false,
  show_x_axis: true,
  show_y_axis: true,
  axis_line_width: 5,
  axis_line_color: "#222222",
  axis_marker_length: 25,
  y_axis_marker_frequency: 1,
  show_value_labels: true,
  show_background_grid: true,
  spacing: 20,
  border_radius: 0,
  margin: 100,
  start_from_zero: true
}