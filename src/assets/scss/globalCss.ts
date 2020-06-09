import { createGlobalStyle } from 'styled-components';
import style from '@assets/global-style'


export const GlobalCss = createGlobalStyle`
  .plain-btn {
    border: 1px solid ${style['theme-color']};
    color: ${style['theme-color']}
  }
  .global-flex-center {
    display: flex;
    align-items: center;
  }
  .fade-enter, .fade-appear {
  opacity: 0;
  }

  .global-form {
    .ant-form-item-label > label {
      font-size: 13px;
      color: ${style['light-font']}
    }
  }

.fade-enter.fade-enter-active, .fade-appear.fade-appear-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}

.fade-exit {
  opacity: 1;
}

.fade-exit.fade-exit-active {
  opacity: 0;
}
`