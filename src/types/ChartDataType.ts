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
  perspective_yangle: number
} 

