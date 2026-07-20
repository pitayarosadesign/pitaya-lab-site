export function generateTransferPdf({
  movements,
  toLocationName,
  reason,
  note,
  date,
}: {
  movements: Array<{
    productName: string
    sku: string
    quantity: number
    note?: string
  }>
  toLocationName: string
  reason: string
  note?: string
  date: string
}) {
  // @ts-ignore
  const { jsPDF } = window.jspdf
  const doc = new jsPDF()

  const reasonLabels: Record<string, string> = {
    exhibition: '🎯 Exhibición / Muestrario',
    sale: '🛒 Venta en showroom',
    sample: '🎁 Cortesía / Muestra',
    transfer: '📦 Transferencia general',
  }

  // Encabezado
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('PITAYA LAB', 105, 20, { align: 'center' })

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text('Vale de Transferencia de Inventario', 105, 30, { align: 'center' })

  doc.setFontSize(10)
  doc.text(`Fecha: ${date}`, 14, 45)
  doc.text(`Destino: ${toLocationName}`, 14, 52)
  doc.text(`Motivo: ${reasonLabels[reason] || reason}`, 14, 59)
  if (note) {
    doc.text(`Nota: ${note}`, 14, 66)
  }

  // Línea separadora
  doc.setDrawColor(200)
  doc.line(14, note ? 72 : 68, 196, note ? 72 : 68)

  // Tabla de productos
  const startY = note ? 78 : 74
  const tableData = movements.map((m, i) => [
    (i + 1).toString(),
    m.productName,
    m.sku || '—',
    m.quantity.toString(),
    m.note || '',
  ])

  // @ts-ignore
  doc.autoTable({
    head: [['#', 'Producto', 'SKU', 'Cantidad', 'Nota']],
    body: tableData,
    startY,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [79, 70, 229], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 245, 250] },
  })

  const finalY = (doc as any).lastAutoTable.finalY || startY + 40

  // Totales
  const totalQty = movements.reduce((sum, m) => sum + m.quantity, 0)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(`Total de productos: ${movements.length}`, 14, finalY + 15)
  doc.text(`Total de piezas: ${totalQty}`, 14, finalY + 22)

  // Línea separadora
  doc.line(14, finalY + 30, 196, finalY + 30)

  // Firmas
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Entregó:', 14, finalY + 42)
  doc.line(14, finalY + 52, 80, finalY + 52)
  doc.setFontSize(8)
  doc.text('Nombre y firma', 14, finalY + 58)

  doc.setFontSize(10)
  doc.text('Recibió:', 120, finalY + 42)
  doc.line(120, finalY + 52, 196, finalY + 52)
  doc.setFontSize(8)
  doc.text('Nombre y firma', 120, finalY + 58)

  // Footer
  doc.setFontSize(7)
  doc.setTextColor(150)
  doc.text('PITAYA LAB - Documento generado automáticamente', 105, 285, { align: 'center' })

  // Descargar
  doc.save(`vale-transferencia-${date.replace(/\//g, '-')}.pdf`)
}
