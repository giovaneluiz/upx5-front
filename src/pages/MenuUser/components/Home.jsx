import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useEffect, useState } from "react"

// eslint-disable-next-line react/prop-types
const Home = ({ setMenu }) => {
  const [usuario, setUsuario] = useState('')

  useEffect(() => {
    setUsuario('Administrador')
  }, [])

  const cardFooter = (severity, menuIndex) => (
    <>
      <Button
        label="Saiba mais"
        icon="pi pi-arrow-right"
        iconPos="right"
        outlined
        severity={severity}
        onClick={() => setMenu(menuIndex)}
        size="small" />
    </>
  )

  return (
    <>
      <h3>Olá, {usuario}.</h3>
      <div className="flex flex-column sm:flex-row">
        <Card className="border-left-3 border-green-500 m-2 max-w-15rem	" title={130} subTitle='Equipamentos Cadastrados' footer={cardFooter('success', 2)} />
        <Card className="border-left-3 border-orange-500 m-2 max-w-15rem	" title={2} subTitle='Manutenções programadas para os próximos 7 dias' footer={cardFooter('warning', 3)} />
        <Card className="border-left-3 border-red-500 m-2 max-w-15rem	" title={5} subTitle='Equipamentos precisando de atenção' footer={cardFooter('danger', 3)} />
      </div>
    </>
  )
}

export default Home