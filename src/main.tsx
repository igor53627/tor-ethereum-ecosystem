import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import './index.css'
import App from './App.tsx'
import torTheme from './theme/torTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeScript initialColorMode={torTheme.config.initialColorMode} />
    <ChakraProvider theme={torTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
