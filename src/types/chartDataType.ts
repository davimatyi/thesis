export interface ChartData {
  title: string,
  type: string,
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
  show_x_axis: boolean,
  show_y_axis: boolean,
  show_value_labels: boolean
} 

export const DefaultChart: ChartData = {
  title: "title",
  type: "bar",
  dimensity: 1,
  values: [[5, 6, 8, 7]],
  x_axis_labels: ["value 1", "value 2", "value 3", "value 4"],
  y_axis_labels: [],
  stroke_color: "#ffffff",
  stroke_width: 1,
  stroke: true,
  fill_primary: "#ff0000",
  fill_secondary: "#00ff00",
  fill_gradient: false,
  show_x_axis: true,
  show_y_axis: false,
  show_value_labels: false
}