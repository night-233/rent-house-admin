import Cookies from 'js-cookie';

export const TokenKey = 'Authorization';

export default {

  getCookie (key: string = TokenKey) {
    return key ? Cookies.get(key) : Cookies.get(TokenKey);
  },

  setCookie (option: any) {
    const currentTokenKey = option.key || TokenKey;
    return Cookies.set(currentTokenKey, option.value, option.config);
  },

  removeCookie (key: string = TokenKey) {
    return Cookies.remove(key);
  }
};
