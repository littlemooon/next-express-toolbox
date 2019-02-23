import {  VictoryThemeDefinition } from "victory";

// Colors
// const colors = [
//   "#252525",
//   "#525252",
//   "#737373",
//   "#969696",
//   "#bdbdbd",
//   "#d9d9d9",
//   "#f0f0f0"
// ];
const charcoal = "#252525";
// const grey = "#969696";

// Typography
const sansSerif =
  "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;

// Layout
// const baseProps = {
//   width: 450,
//   height: 300,
//   padding: 50,
//   colorScale: colors
// };

// Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 10,
  fill: charcoal,
  stroke: "transparent"
};
// const centeredLabelStyles = { textAnchor: "middle", ...baseLabelStyles }

// // Strokes
// const strokeLinecap = "round";
// const strokeLinejoin = "round";

// Put it all together...
const victoryTheme: VictoryThemeDefinition = {
  axis: {
    axis: {},
    axisLabel: baseLabelStyles,
    grid: {},
    ticks: {},
    tickLabels: baseLabelStyles,
  }
  // area: {
  //   style: {
  //     data: {
  //       fill: charcoal
  //     },
  //     labels: centeredLabelStyles
  //   }, ...baseProps
  // },
  // axis: {
  //   style: {
  //     axis: {
  //       fill: "transparent",
  //       stroke: charcoal,
  //       strokeWidth: 1,
  //       strokeLinecap,
  //       strokeLinejoin
  //     },
  //     axisLabel: { ...centeredLabelStyles, padding: 25 },
  //     grid: {
  //       fill: "none",
  //       stroke: "none",
  //       pointerEvents: "painted"
  //     },
  //     ticks: {
  //       fill: "transparent",
  //       size: 1,
  //       stroke: "transparent"
  //     },
  //     tickLabels: baseLabelStyles
  //   }, ...baseProps
  // },
  // bar: {
  //   style: {
  //     data: {
  //       fill: charcoal,
  //       padding: 8,
  //       strokeWidth: 0
  //     },
  //     labels: baseLabelStyles
  //   }, ...baseProps
  // },
  // boxplot: {
  //   style: {
  //     max: { padding: 8, stroke: charcoal, strokeWidth: 1 },
  //     maxLabels: baseLabelStyles,
  //     median: { padding: 8, stroke: charcoal, strokeWidth: 1 },
  //     medianLabels: baseLabelStyles,
  //     min: { padding: 8, stroke: charcoal, strokeWidth: 1 },
  //     minLabels: baseLabelStyles,
  //     q1: { padding: 8, fill: grey },
  //     q1Labels: baseLabelStyles,
  //     q3: { padding: 8, fill: grey },
  //     q3Labels: baseLabelStyles
  //   },
  //   boxWidth: 20,
  //   ...baseProps
  // },
  // candlestick: {
  //   style: {
  //     data: {
  //       stroke: charcoal,
  //       strokeWidth: 1
  //     },
  //     labels: centeredLabelStyles
  //   },
  //   candleColors: {
  //     positive: "#ffffff",
  //     negative: charcoal
  //   }, ...baseProps
  // },
  // chart: baseProps,
  // errorbar: {
  //   borderWidth: 8,
  //   style: {
  //     data: {
  //       fill: "transparent",
  //       stroke: charcoal,
  //       strokeWidth: 2
  //     },
  //     labels: centeredLabelStyles
  //   }, ...baseProps
  // },
  // group: {
  //   colorScale: colors, ...baseProps
  // },
  // legend: {
  //   colorScale: colors,
  //   gutter: 10,
  //   orientation: "vertical",
  //   titleOrientation: "top",
  //   style: {
  //     data: {
  //       type: "circle"
  //     },
  //     labels: baseLabelStyles,
  //     title: { , ...baseLabelStyles, padding: 5 }
  //   }
  // },
  // line: {
  //   style: {
  //     data: {
  //       fill: "transparent",
  //       stroke: charcoal,
  //       strokeWidth: 2
  //     },
  //     labels: centeredLabelStyles
  //   }, ...baseProps
  // },
  // pie: {
  //   style: {
  //     data: {
  //       padding: 10,
  //       stroke: "transparent",
  //       strokeWidth: 1
  //     },
  //     labels: { ...baseLabelStyles, padding: 20 }
  //   },
  //   colorScale: colors,
  //   width: 400,
  //   height: 400,
  //   padding: 50
  // },
  // scatter: {
  //   style: {
  //     data: {
  //       fill: charcoal,
  //       stroke: "transparent",
  //       strokeWidth: 0
  //     },
  //     labels: centeredLabelStyles
  //   }, ...baseProps
  // },
  // stack: {
  //   colorScale: colors, ...baseProps
  // },
  // tooltip: {
  //   style: { ...centeredLabelStyles, padding: 5, pointerEvents: "none" },
  //   flyoutStyle: {
  //     stroke: charcoal,
  //     strokeWidth: 1,
  //     fill: "#f0f0f0",
  //     pointerEvents: "none"
  //   },
  //   cornerRadius: 5,
  //   pointerLength: 10
  // },
  // voronoi: {
  //   style: {
  //     data: {
  //       fill: "transparent",
  //       stroke: "transparent",
  //       strokeWidth: 0
  //     },
  //     labels: { ...centeredLabelStyles, padding: 5, pointerEvents: "none" },
  //     flyout: {
  //       stroke: charcoal,
  //       strokeWidth: 1,
  //       fill: "#f0f0f0",
  //       pointerEvents: "none"
  //     }
  //   }, ...baseProps
  // },
};

export default victoryTheme

// {
//   "area": {
//     "style": {
//       "data": {
//         "fill": "#212121"
//       },
//       "labels": {
//         "textAnchor": "middle",
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "axis": {
//     "style": {
//       "axis": {
//         "fill": "transparent",
//         "stroke": "#90A4AE",
//         "strokeWidth": 2,
//         "strokeLinecap": "round",
//         "strokeLinejoin": "round"
//       },
//       "axisLabel": {
//         "textAnchor": "middle",
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "grid": {
//         "fill": "none",
//         "stroke": "#ECEFF1",
//         "strokeDasharray": "10, 5",
//         "strokeLinecap": "round",
//         "strokeLinejoin": "round",
//         "pointerEvents": "painted"
//       },
//       "ticks": {
//         "fill": "transparent",
//         "size": 5,
//         "stroke": "#90A4AE",
//         "strokeWidth": 1,
//         "strokeLinecap": "round",
//         "strokeLinejoin": "round"
//       },
//       "tickLabels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "bar": {
//     "style": {
//       "data": {
//         "fill": "#455A64",
//         "padding": 8,
//         "strokeWidth": 0
//       },
//       "labels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "boxplot": {
//     "style": {
//       "max": {
//         "padding": 8,
//         "stroke": "#455A64",
//         "strokeWidth": 1
//       },
//       "maxLabels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "median": {
//         "padding": 8,
//         "stroke": "#455A64",
//         "strokeWidth": 1
//       },
//       "medianLabels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "min": {
//         "padding": 8,
//         "stroke": "#455A64",
//         "strokeWidth": 1
//       },
//       "minLabels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "q1": {
//         "padding": 8,
//         "fill": "#455A64"
//       },
//       "q1Labels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "q3": {
//         "padding": 8,
//         "fill": "#455A64"
//       },
//       "q3Labels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "boxWidth": 20,
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "candlestick": {
//     "style": {
//       "data": {
//         "stroke": "#455A64"
//       },
//       "labels": {
//         "textAnchor": "middle",
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "candleColors": {
//       "positive": "#ffffff",
//       "negative": "#455A64"
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "chart": {
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "errorbar": {
//     "borderWidth": 8,
//     "style": {
//       "data": {
//         "fill": "transparent",
//         "opacity": 1,
//         "stroke": "#455A64",
//         "strokeWidth": 2
//       },
//       "labels": {
//         "textAnchor": "middle",
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "group": {
//     "colorScale": [
//       "#F4511E",
//       "#FFF59D",
//       "#DCE775",
//       "#8BC34A",
//       "#00796B",
//       "#006064"
//     ],
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "legend": {
//     "colorScale": [
//       "#F4511E",
//       "#FFF59D",
//       "#DCE775",
//       "#8BC34A",
//       "#00796B",
//       "#006064"
//     ],
//     "gutter": 10,
//     "orientation": "vertical",
//     "titleOrientation": "top",
//     "style": {
//       "data": {
//         "type": "circle"
//       },
//       "labels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "title": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 5,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     }
//   },
//   "line": {
//     "style": {
//       "data": {
//         "fill": "transparent",
//         "opacity": 1,
//         "stroke": "#455A64",
//         "strokeWidth": 2
//       },
//       "labels": {
//         "textAnchor": "middle",
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "pie": {
//     "colorScale": [
//       "#F4511E",
//       "#FFF59D",
//       "#DCE775",
//       "#8BC34A",
//       "#00796B",
//       "#006064"
//     ],
//     "style": {
//       "data": {
//         "padding": 8,
//         "stroke": "#ECEFF1",
//         "strokeWidth": 1
//       },
//       "labels": {
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 20,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "scatter": {
//     "style": {
//       "data": {
//         "fill": "#455A64",
//         "opacity": 1,
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "labels": {
//         "textAnchor": "middle",
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 8,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "stack": {
//     "colorScale": [
//       "#F4511E",
//       "#FFF59D",
//       "#DCE775",
//       "#8BC34A",
//       "#00796B",
//       "#006064"
//     ],
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   },
//   "tooltip": {
//     "style": {
//       "textAnchor": "middle",
//       "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//       "fontSize": 12,
//       "letterSpacing": "normal",
//       "padding": 5,
//       "fill": "#455A64",
//       "stroke": "transparent",
//       "strokeWidth": 0,
//       "pointerEvents": "none"
//     },
//     "flyoutStyle": {
//       "stroke": "#212121",
//       "strokeWidth": 1,
//       "fill": "#f0f0f0",
//       "pointerEvents": "none"
//     },
//     "cornerRadius": 5,
//     "pointerLength": 10
//   },
//   "voronoi": {
//     "style": {
//       "data": {
//         "fill": "transparent",
//         "stroke": "transparent",
//         "strokeWidth": 0
//       },
//       "labels": {
//         "textAnchor": "middle",
//         "fontFamily": "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
//         "fontSize": 12,
//         "letterSpacing": "normal",
//         "padding": 5,
//         "fill": "#455A64",
//         "stroke": "transparent",
//         "strokeWidth": 0,
//         "pointerEvents": "none"
//       },
//       "flyout": {
//         "stroke": "#212121",
//         "strokeWidth": 1,
//         "fill": "#f0f0f0",
//         "pointerEvents": "none"
//       }
//     },
//     "width": 350,
//     "height": 350,
//     "padding": 50
//   }
// }
