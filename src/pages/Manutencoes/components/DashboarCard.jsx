/* eslint-disable react/prop-types */
import { Card } from "primereact/card"
import { useEffect } from "react"

// eslint-disable-next-line react/prop-types
export const DashboarCard = ({ loading, equipaments }) => {
  
  useEffect(() => {
    localStorage.setItem('equipData', JSON.stringify(equipaments))    
  }, [equipaments])  
  
  const curret = equipaments.filter(equip => equip.status === 'Em Andamento' )
  const next = equipaments.filter(equip => equip.status === 'Agendada')
  const delaying = equipaments.filter(equip => equip.status === 'Em Atraso')

  return (
    <>
      {loading === true ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <div className="flex flex-column sm:flex-row">
            <Card
              className="border-left-3 border-green-500 m-2 w-full"
              title={equipaments.length}
              subTitle='Executadas'              
            />
            <Card
              className="border-left-3 border-blue-500 m-2 w-full	"
              title={curret.length}
              subTitle='Em andamento'              
            />
            <Card
              className="border-left-3 border-orange-500 m-2 w-full	"
              title={next.length}
              subTitle='Agendadas'              
            />
            <Card
              className="border-left-3 border-red-500 m-2 w-full	"
              title={delaying.length}
              subTitle='Atrasadas'              
            />
          </div>
        </>
      )}
    </>
  )
}