// Composable para cargar las secciones de una página desde Supabase
export function usePageSections(page = 'home') {
  const supabase = useNuxtApp().$supabase
  const sections = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function loadSections() {
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
        .eq('page', page)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (dbError) throw dbError
      sections.value = data || []
    } catch (e) {
      console.warn(`Error cargando secciones de ${page}:`, e.message)
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  onMounted(loadSections)

  return {
    sections,
    loading,
    error,
    reload: loadSections,
  }
}
