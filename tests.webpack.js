// Bundle all file in src into test
const componentsContext = require.context('./src', true, /\.js$/)
componentsContext.keys().forEach(componentsContext)
