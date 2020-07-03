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

  .global-table {
    .ant-table {
      min-height: calc(100vh-200px)
    }
    .ant-table-thead > tr > th{
      height: 44px !important;
      line-height: 44px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 500;
      background: #51c6cf0f;
      padding: 0px 16px;
      color: rgba(27, 29, 31, 0.65);
    }
  }
.ant-spin-nested-loading > div > .ant-spin {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    display: block;
    width: 100%;
    height: 100%;
    max-height: none;
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
