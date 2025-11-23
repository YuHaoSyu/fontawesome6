function SVGcol(style, file) {
  const svgTemp = document.getElementById('temp')
  const cloneTemp = svgTemp.content.cloneNode(true)


  return cloneTemp.firstElementChild.outerHTML
    .replace(/{{style}}/g, style)
    .replace(/{{file}}/g, file)
}
document.addEventListener(
  'DOMContentLoaded',
  function (e) {
    const params = new URLSearchParams(location.search)
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
    document.getElementById('icon-file').value = file

    const result = svgs
      .filter(svg => new RegExp(file).test(svg))
      .map(svg => SVGcol(style, svg))
      .join('')
    document.getElementById('icon-row').innerHTML = url + result
  },
  { once: true }
)
