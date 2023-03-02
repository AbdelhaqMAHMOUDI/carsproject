import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Route } from 'react-router-dom'
import Home from '.'
import Page2 from './inscription_ok'
import Login from './login'
import Admin from './admin'
// import AddItemForm from './crud'
export default function App({ Component, pageProps }: AppProps) {

  <><Route path="/" children={<Home />} />
    <Route path="/login" children={<Login />} />
    <Route path="/inscription_ok" children={<Page2 />} />
    <Route path="/admin" children={<Admin />} />
    {/* <Route path="/crud" children={<AddItemForm />} /> */}
  </>

  return <Component {...pageProps} />
}