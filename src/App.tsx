import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Categories from './components/Categories'
import Shop from './components/Shop'
import Story from './components/Story'
import Gifts from './components/Gifts'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { WaveDivider } from './components/Decor'
import { CartProvider } from './hooks/useCart'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <Shop />
        <WaveDivider from="var(--color-cream)" to="var(--color-peachwash)" />
        <Story />
        <WaveDivider from="var(--color-peachwash)" to="var(--color-cream)" flip />
        <Gifts />
        <WaveDivider from="var(--color-cream)" to="var(--color-mintwash)" flip />
        <Testimonials />
        <WaveDivider from="var(--color-mintwash)" to="var(--color-cream)" />
        <Newsletter />
      </main>
      <WaveDivider from="var(--color-cream)" to="var(--color-shell)" />
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
