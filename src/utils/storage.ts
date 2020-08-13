const StorageUtil = {
  set(key: string, data: any) {
    if (!window.localStorage || !window.JSON || !key) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  },
  get (key: string) {
    if (!window.localStorage || !window.JSON || !key) {
      return;
    }
    const item = localStorage.getItem(key);
    if (!item) {
      return;
    }
    return JSON.parse(item);
  },
  remove (key: string) {
    if (!window.localStorage || !window.JSON || !key) {
      return;
    }
    localStorage.removeItem(key);
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
export default StorageUtil;
