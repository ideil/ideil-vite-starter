import '../vite.js';
const modules = import.meta.glob('./modules/**/index.js');
Object.keys(modules).forEach(key => modules[key]());
