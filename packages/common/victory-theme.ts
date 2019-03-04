// *
// * Colors
// *
import { colors } from './theme'

const gridColor = colors.greyDark
const textColor = colors.green

// *
// * Typography
// *
const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif"
const letterSpacing = 'normal'
const fontSize = 8

// *
// * Layout
// *
const padding = 8
const baseProps = {
  width: 350,
  height: 350,
  padding: 30,
}

// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: textColor,
  stroke: 'transparent',
  strokeWidth: 0,
}

const centeredLabelStyles = {
  textAnchor: 'middle',
  ...baseLabelStyles,
}

// *
// * Strokes
// *
const strokeDasharray = '10, 5'
const strokeLinecap = 'round'
const strokeLinejoin = 'round'

const victoryTheme = {
  area: {
    style: {
      data: {
        fill: colors.redLight,
      },
      labels: centeredLabelStyles,
    },
    ...baseProps,
  },
  axis: {
    style: {
      axis: {
        fill: 'transparent',
        stroke: gridColor,
        strokeWidth: 2,
        strokeLinecap,
        strokeLinejoin,
      },
      axisLabel: {
        ...centeredLabelStyles,
        padding,
        stroke: 'transparent',
      },
      grid: {
        fill: 'none',
        stroke: gridColor,
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin,
        pointerEvents: 'painted',
      },
      ticks: {
        fill: 'transparent',
        size: 5,
        stroke: gridColor,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin,
      },
      tickLabels: {
        ...baseLabelStyles,
        fill: textColor,
      },
    },
    ...baseProps,
  },
  bar: {
    style: {
      data: {
        fill: colors.redLight,
        padding,
        strokeWidth: 0,
      },
      labels: baseLabelStyles,
    },
    ...baseProps,
  },
  boxplot: {
    style: {
      max: { padding, stroke: colors.grey, strokeWidth: 1 },
      maxLabels: baseLabelStyles,
      median: { padding, stroke: colors.grey, strokeWidth: 1 },
      medianLabels: baseLabelStyles,
      min: { padding, stroke: colors.grey, strokeWidth: 1 },
      minLabels: baseLabelStyles,
      q1: { padding, fill: colors.grey },
      q1Labels: baseLabelStyles,
      q3: { padding, fill: colors.grey },
      q3Labels: baseLabelStyles,
    },
    boxWidth: 20,
    ...baseProps,
  },
  candlestick: {
    style: {
      data: {
        stroke: colors.grey,
      },
      labels: centeredLabelStyles,
    },
    candleColors: {
      positive: '#ffffff',
      negative: colors.grey,
    },
    ...baseProps,
  },
  chart: baseProps,
  errorbar: {
    borderWidth: 8,
    style: {
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: colors.grey,
        strokeWidth: 2,
      },
      labels: centeredLabelStyles,
    },
    ...baseProps,
  },
  group: {
    colorScale: colors,
    ...baseProps,
  },
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: { ...baseLabelStyles, padding: 5 },
    },
  },
  line: {
    style: {
      data: {
        fill: 'transparent',
        opacity: 1,
        stroke: colors.grey,
        strokeWidth: 2,
      },
      labels: centeredLabelStyles,
    },
    ...baseProps,
  },
  pie: {
    colorScale: colors,
    style: {
      data: {
        padding,
        stroke: colors.greyLight,
        strokeWidth: 1,
      },
      labels: { ...baseLabelStyles, padding: 20 },
    },
    ...baseProps,
  },
  scatter: {
    style: {
      data: {
        fill: colors.grey,
        opacity: 1,
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: centeredLabelStyles,
    },
    ...baseProps,
  },
  stack: {
    colorScale: colors,
    ...baseProps,
  },
  tooltip: {
    style: { ...centeredLabelStyles, padding: 5, pointerEvents: 'none' },
    flyoutStyle: {
      stroke: colors.greyDark,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none',
    },
    cornerRadius: 5,
    pointerLength: 10,
  },
  voronoi: {
    style: {
      data: {
        fill: 'transparent',
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: { ...centeredLabelStyles, padding: 5, pointerEvents: 'none' },
      flyout: {
        stroke: colors.greyDark,
        strokeWidth: 1,
        fill: '#f0f0f0',
        pointerEvents: 'none',
      },
    },
    ...baseProps,
  },
}

export default victoryTheme
