export function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function get(key) {
  const val = localStorage.getItem(key);
  try {
    return JSON.parse(val);
  } catch (error) {
    return val;
  }
}
