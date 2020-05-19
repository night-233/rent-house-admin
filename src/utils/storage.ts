var storageUtil = {
  getSession (key: string) {
    if (typeof (Storage) !== 'undefined' || typeof key !== 'string') {
      let value = localStorage.getItem(key);
      try {
        value = JSON.parse(value || '{}');
      } catch (e) {

      }
      return value !== 'undefined' ? value : '';
    } else {
      return false;
    }
  },
  setSession (key: string, value: any) {
    if (typeof (Storage) !== 'undefined' || typeof key !== 'string') {
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
      return true;
    } else {
      return false;
    }
  },
  removeSession (key: string) {
    if (typeof (Storage) !== 'undefined' || typeof key !== 'string') {
      localStorage.removeItem(key);
      return true;
    } else {
      return false;
    }
  },
  clearSession () {
    if (typeof (Storage) !== 'undefined') {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }
};
export default storageUtil;
