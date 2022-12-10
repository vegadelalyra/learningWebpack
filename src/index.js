import Template from '@templates/Template.js'
import '@styles/main.css'
import '@styles/vars.styl'
// down here, syntax to autorun function without calling is used
// (async fn(){})()
(async function App() {
  const main = null || document.getElementById('main')
  main.innerHTML = await Template()
})()
