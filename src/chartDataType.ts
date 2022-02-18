export interface ChartData {
  title: string,
  type: string,
  dimensity: number,
  values: [[number]],
  x_axis_labels: [string],
  y_axis_labels: [string],
  stroke_color: string,
  stroke_width: number,
  stroke: boolean,
  fill_primary: string,
  fill_secondary: string,
  fill_gradient: boolean,
  show_x_axis: boolean,
  show_y_axis: boolean,
  show_value_labels: boolean
}