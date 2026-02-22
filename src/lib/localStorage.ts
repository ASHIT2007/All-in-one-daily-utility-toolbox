/**
 * Simple localStorage utility functions with type safety
 */

export function get<T>(key: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(key);
    if (val === null) return defaultValue;
    return JSON.parse(val) as T;
  } catch {
    return defaultValue;
  }
}

export function set<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Failed to set localStorage key: ${key}`);
  }
}

export function remove(key: string) {
  localStorage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}