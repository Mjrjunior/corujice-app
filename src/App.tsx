import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="corujice-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Corujice" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}