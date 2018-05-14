
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  echarts.registerTheme('tjCurve', {
    "color": [
      "#fa6c62",
      "#59c4e6",
      "#516b91",
      "#93b7e3",
      "#a5e7f0",
      "#cbb0e3"
    ],
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": "#516b91"
      },
      "subtextStyle": {
        "color": "#93b7e3"
      }
    },
    "line": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": "1"
        }
      },
      "symbolSize": "3",
      "symbol": "emptyCircle",
      "smooth": true
    },
    "radar": {
      "itemStyle": {
        "normal": {
          "borderWidth": 1
        }
      },
      "lineStyle": {
        "normal": {
          "width": "1"
        }
      },
      "symbolSize": "3",
      "symbol": "emptyCircle",
      "smooth": true
    },
    "bar": {
      "itemStyle": {
        "normal": {
          "barBorderWidth": "0",
          "barBorderColor": "#ccc"
        },
        "emphasis": {
          "barBorderWidth": "0",
          "barBorderColor": "#ccc"
        }
      }
    },
    "pie": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      }
    },
    "scatter": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      }
    },
    "boxplot": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      }
    },
    "parallel": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      }
    },
    "sankey": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      }
    },
    "funnel": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      }
    },
    "gauge": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        },
        "emphasis": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      }
    },
    "candlestick": {
      "itemStyle": {
        "normal": {
          "color": "#c23531",
          "color0": "#314656",
          "borderColor": "#c23531",
          "borderColor0": "#314656",
          "borderWidth": 1
        }
      }
    },
    "graph": {
      "itemStyle": {
        "normal": {
          "borderWidth": "0",
          "borderColor": "#ccc"
        }
      },
      "lineStyle": {
        "normal": {
          "width": 1,
          "color": "#aaa"
        }
      },
      "symbolSize": "3",
      "symbol": "emptyCircle",
      "smooth": true,
      "color": [
        "#fa6c62",
        "#59c4e6",
        "#516b91",
        "#93b7e3",
        "#a5e7f0",
        "#cbb0e3"
      ],
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eeeeee"
          }
        }
      }
    },
    "map": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "geo": {
      "itemStyle": {
        "normal": {
          "areaColor": "#eeeeee",
          "borderColor": "#444444",
          "borderWidth": 0.5
        },
        "emphasis": {
          "areaColor": "rgba(255,215,0,0.8)",
          "borderColor": "#444444",
          "borderWidth": 1
        }
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#000000"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "rgb(100,0,0)"
          }
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#d9d9d9"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#666666"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": "#d9d9d9"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#666666"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.05)",
            "rgba(200,200,200,0.02)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ccc"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#d9d9d9"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "textStyle": {
          "color": "#333"
        }
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": [
            "#666666"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "normal": {
          "borderColor": "#999999"
        },
        "emphasis": {
          "borderColor": "#ab7676"
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": "#999999"
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": "#ff8b59",
          "width": "1"
        },
        "crossStyle": {
          "color": "#ff8b59",
          "width": "1"
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#8fd3e8",
        "width": "1"
      },
      "itemStyle": {
        "normal": {
          "color": "#8fd3e8",
          "borderWidth": "1"
        },
        "emphasis": {
          "color": "#a9334c"
        }
      },
      "controlStyle": {
        "normal": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        },
        "emphasis": {
          "color": "#293c55",
          "borderColor": "#293c55",
          "borderWidth": 0.5
        }
      },
      "checkpointStyle": {
        "color": "#e43c59",
        "borderColor": "rgba(0,0,0,0)"
      },
      "label": {
        "normal": {
          "textStyle": {
            "color": "#293c55"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#293c55"
          }
        }
      }
    },
    "visualMap": {
      "color": [
        "#bf444c",
        "#d88273",
        "#f6efa6"
      ]
    },
    "dataZoom": {
      "backgroundColor": "rgba(47,69,84,0)",
      "dataBackgroundColor": "rgba(47,69,84,0.3)",
      "fillerColor": "rgba(167,183,204,0.4)",
      "handleColor": "#a7b7cc",
      "handleSize": "100%",
      "textStyle": {
        "color": "#333333"
      }
    },
    "markPoint": {
      "label": {
        "normal": {
          "textStyle": {
            "color": "#eeeeee"
          }
        },
        "emphasis": {
          "textStyle": {
            "color": "#eeeeee"
          }
        }
      }
    }
  });
}));

