export function localGet(key) {
  const val = localStorage.getItem(key);
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
}

export function localSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
