import { useEffect, useState } from "react"

const Home = () => {
  const [usuario, setUsuario] = useState('')

  useEffect(() => {
    setUsuario('Administrador')
  }, [])

  return (
    <h3>Olá, {usuario}</h3>
  )
}

export default Home