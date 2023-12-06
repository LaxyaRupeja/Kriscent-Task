import ContactForm from "./components/ContactForm"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Products from "./components/Products"
import UserTestimonials from "./components/UserTestimonials"

function App() {
  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1' ,price: 100, discount: 180},
    { id: 2, name: 'Product 2', description: 'Description 2' ,price: 200, discount: 380},
    { id: 3, name: 'Product 3', description: 'Description 3' ,price: 300, discount: 530},
    { id: 4, name: 'Product 4', description: 'Description 4' ,price: 100, discount: 210},
  ]

  return (
    <>
      <Navbar />
      <Products products={products} />
      <UserTestimonials />
      <ContactForm />
      <Footer />
    </>
  )
}

export default App
