import { createGlobalStyle } from 'styled-components';
import style from '@assets/global-style'
export const GlobalStyle = createGlobalStyle`
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