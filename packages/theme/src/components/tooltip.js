const toolTipArrow = {
  '&::before': {
    width: 15,
    height: 10,
    content: "''",
    top: '0%',
    background: 'inherit',
    left: 'calc(50% - 15px / 2)',
    'clip-path': 'polygon(50% 0, 100% 100%, 0 100%)',
    position: 'absolute',
    'margin-top': -10,
    zIndex: 10,
  },
}

module.exports = (theme) => {
  return {
    '.tooltip-arrow': { ...toolTipArrow },
  }
}
