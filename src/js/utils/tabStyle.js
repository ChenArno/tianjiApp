const tabStyles = function (num) {
  const screenWidth = 750;
  let width = screenWidth / num;
  return {
    bgColor: "#FFFFFF",
    titleColor: "#666666",
    activeTitleColor: "#de4f45",
    activeBgColor: "#FFFFFF",
    isActiveTitleBold: true,
    iconWidth: 70,
    iconHeight: 70,
    width,
    height: 100,
    fontSize: 24,
    hasActiveBottom: true,
    activeBottomColor: "#de4f45",
    activeBottomHeight: 6,
    activeBottomWidth: 120,
    textPaddingLeft: 10,
    textPaddingRight: 10
  }
}

const cellStyle = function(num){
  const screenWidth = 620;
  let width = screenWidth / num;
  return {
    bgColor: "rgb(242,242,242)",
    titleColor: "rgb(102,102,102)",
    activeTitleColor: "#ffffff",
    activeBgColor: "rgb(255,101,103)",
    isActiveTitleBold: false,
    iconWidth: 70,
    iconHeight: 70,
    width,
    height: 60,
    fontSize: 24,
    hasActiveBottom: false,
    activeBottomColor: "#de4f45",
    activeBottomHeight: 6,
    activeBottomWidth: 120,
    textPaddingLeft: 10,
    textPaddingRight: 10
  }
}

export default {
  tabStyles,
  cellStyle
}