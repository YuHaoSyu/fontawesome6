function SVGcol(style, file) {
  const svgTemp = document.getElementById('temp')
  const cloneTemp = svgTemp.content.cloneNode(true)

  return cloneTemp.firstElementChild.outerHTML
    .replace(/{{style}}/g, style)
    .replace(/{{file}}/g, file)
}
document.addEventListener('DOMContentLoaded', function (e) {
  const params = new URLSearchParams(location.search)
  const row = document.getElementById('icon-row')
  let { file = '', style = 'regular' } = Object.fromEntries(params.entries())
  file = file.toLowerCase()

  const form = document.getElementById('filter-form')
  form.attributes.action.value = location.pathname
  const url = document
    .getElementById('fontawesome-url')
    .content.cloneNode(true)
    .firstElementChild.outerHTML.replace(/{{file}}/g, file)

  if (!file) {
    document.getElementById('icon-row').innerHTML = url
    return
  }
  document.getElementById('icon-style').value =style
  document.getElementById('icon-file').value = file

  document.getElementById('icon-row').innerHTML = url + svgs
    .filter(svg => new RegExp(file).test(svg))
    .map(svg => SVGcol(style, svg))
    .join('')

  row.querySelectorAll('.icon-download').forEach(el => {
    el.addEventListener('click', async function (e) {
      e.preventDefault()
      try {
        const res = await fetch(el.href)
        if (!res.ok) {
          throw new Error(
            'Fetch failed: ' + res.status + ' ' + res.statusText
          )
        }

        const blob = new Blob([await res.text()], {
          type: 'image/svg+xml;charset=utf-8'
        })
        const blobUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = blobUrl
        a.download = el.download || 'icon.svg'
        a.click()
        URL.revokeObjectURL(blobUrl)
      } catch (err) {
        console.error('Download SVG failed:', err)
      }
    })
  }
)}, { once: true })
