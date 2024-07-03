const KEY_PREFIX_LOCAL = "@APP-CHECKLIST-";

class LocalStorage {
  static set = (key, value) =>
    localStorage.setItem(KEY_PREFIX_LOCAL.concat(key), JSON.stringify(value));

  static get = (key) =>
    JSON.parse(localStorage.getItem(KEY_PREFIX_LOCAL.concat(key)))
}

export default LocalStorage;
