// Composable para cargar las secciones de una página desde Supabase.
// Acepta un string fijo (ej. 'home') o un Ref/Computed para páginas dinámicas
// (ej. rutas [slug]). Se recarga automáticamente al cambiar la página.
export function usePageSections(page = 'home') {
  const supabase = useNuxtApp().$supabase
  const sections = ref([])
  const loading = ref(true)
  const error = ref(null)

  const pageRef = isRef(page) ? page : computed(() => page)

  async function loadSections() {
    const currentPage = pageRef.value
    if (!currentPage) {
      sections.value = []
      loading.value = false
      return
    }

    loading.value = true
    error.value = null

    if (!supabase) {
      loading.value = false
      return
    }

    try {
      const { data, error: dbError } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', currentPage)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (dbError) throw dbError
      sections.value = data || []
    } catch (e) {
      console.warn(`Error cargando secciones de ${currentPage}:`, e.message)
      error.value = e.message
      sections.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(loadSections)
  watch(pageRef, loadSections)

  return {
    sections,
    loading,
    error,
    reload: loadSections,
  }
}
