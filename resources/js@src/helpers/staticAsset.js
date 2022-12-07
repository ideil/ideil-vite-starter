export default path => new URL('../' + path, import.meta.url).href;
