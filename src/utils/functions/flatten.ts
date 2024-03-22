export default function flattenObject(obj: any) {
  const flattened = {};

  function flatten(obj: any, prefix = '') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          flatten(obj[key], prefix + key + '.');
        } else {
          flattened[prefix + key] = obj[key];
        }
      }
    }
  }

  flatten(obj);

  return flattened;
}
