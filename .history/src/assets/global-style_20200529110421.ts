// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

const themeColor = '#51c6cf'

const plainBtn = () => {
  return `
  color: ${themeColor},
  border: ${themeColor}
  `
}

export default {
  'theme-color': '#51c6cf',
  'theme-green': '#b8f1cc',
  'theme-blue': '#b8f1ed',
  'theme-aniyu': '#e7dac9',
  'theme-yellow': '#f1f1b8',
  'theme-apricot': '#f1ccb8',
  $normal- font: rgba(34, 34, 34, 0.85),
    $light - font: rgba(34, 34, 34, 0.65),
      $lighter - font: rgba(34, 34, 34, 0.45),
        $lightest - font: rgba(34, 34, 34, 0.25),
          'height': '100%',
            'theme-color-shadow': 'rgba (212, 68, 57, .5)',
              'font-color-light': '#f1f1f1',
                'font-color-desc': '#2E3030',
                  'font-color-desc-v2': '#bba8a8',// 略淡
                    'font-size-ss': '10px',
                      'font-size-s': '12px',
                        'font-size-m': '14px',
                          'font-size-l': '16px',
                            'font-size-ll': '18px',
                              "border-color": '#e4e4e4',
                                'background-color': '#f2f3f4',
                                  'background-color-shadow': 'rgba (0, 0, 0, 0.3)',
                                    'highlight-background-color': '#fff',
                                      extendClick,
                                      noWrap,
                                      plainBtn
}