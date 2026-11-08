// Estado compartido del buscador B2B (hero ↔ calculadora).
// Módulo-scope refs = singleton: ambos componentes leen/escriben lo mismo.
const query = ref('')

export function useB2BSearch() {
  return { query }
}
