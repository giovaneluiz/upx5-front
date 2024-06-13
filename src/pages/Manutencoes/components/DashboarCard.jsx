import { Button } from "primereact/button"
import { Card } from "primereact/card"

export const DashboarCard = () => {
  const cardFooter = (severity) => (
    <>
      <Button
        label="Ver todos"
        icon="pi pi-arrow-right"
        iconPos="right"
        outlined
        severity={severity}
        size="small" />
    </>
  )

  return (
    <>      
      <div className="flex flex-column sm:flex-row">
        <Card
          className="border-left-3 border-green-500 m-2 w-full"
          title={654}
          subTitle='Executadas'
          footer={cardFooter('success', 2)}
        />
        <Card
          className="border-left-3 border-blue-500 m-2 w-full	"
          title={5}
          subTitle='Em andamento'
          footer={cardFooter('primary', 3)}
        />
        <Card
          className="border-left-3 border-orange-500 m-2 w-full	"
          title={12}
          subTitle='Próximos 7 dias'
          footer={cardFooter('warning', 3)}
        />
        <Card
          className="border-left-3 border-red-500 m-2 w-full	"
          title={2}
          subTitle='Atrasadas'
          footer={cardFooter('danger', 3)}
        />
      </div>
    </>
  )
}