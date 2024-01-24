export const isNullOrEmpty = (value) => {
    if (value === null || value === undefined) {
      return true;
    }
  
    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }
  
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
  
    if (typeof value === 'object' && value !== null) {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    return false;
}