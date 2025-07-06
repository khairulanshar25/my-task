import ReactDOMClient from 'react-dom/client'
import App from './App'

if (import.meta.env.DEV) {
  const { worker } = await import('./MockServer/browser')
  await worker.start()
}

// dummy function
const dummy = () => {}
// console.log = dummy
// console.error = dummy
// console.warn = dummy
// console.info = dummy
// console.debug = dummy
// console.trace = dummy
// dummy function end

const container = document.getElementById(`khairul-root-main`)!
const shadowContainer = container.attachShadow({ mode: 'closed' })
const shadowRootElement = document.createElement('div')
shadowRootElement.setAttribute('class', 'globalCss')
shadowContainer.appendChild(shadowRootElement)

ReactDOMClient.createRoot(shadowRootElement).render(
  <App
    shadowContainer={shadowContainer}
    shadowRootElement={shadowRootElement}
  />,
)
