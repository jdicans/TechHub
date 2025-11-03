// Script para limpiar localStorage y sessionStorage
console.log('🧹 Limpiando almacenamiento del navegador...');
localStorage.clear();
sessionStorage.clear();
console.log('✅ Almacenamiento limpiado. Recargando...');
setTimeout(() => location.reload(), 1000);
