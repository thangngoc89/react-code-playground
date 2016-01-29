export default function ({html, css, javascript}) {
  const result =
`
<html>
  <head>
    <style>${css}</style>
    <script>${javascript}</script>
  </head>
  <body>
    ${html}
  </body>
`
  return result
}
