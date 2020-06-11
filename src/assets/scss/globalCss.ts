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

.ant-upload-list-picture-card .ant-upload-list-item-info::before {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    opacity: 0;
    -webkit-transition: all .3s;
    transition: all .3s;
    left: 0;
    content: ' ';
}
`
