export default function ({html, css, javascript}) {
  let result = `
<html>
  <head></head>
  <body></body>
</html>`

  if (html) {
    result = result.replace('</body>', `${html}</body>`)
  }
  if (css) {
    result = result.replace('</head>', `<style>${css}</style></head>`)
  }
  if (javascript) {
    result = result.replace('</body>', `<script>${javascript}</script></body>`)
  }
  return result
}
