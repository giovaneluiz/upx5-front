import { useEffect, useRef, useState } from "react"
import { DashboarCard } from "./components/DashboarCard"
import { DashboardCharts } from "./components/DashboardCharts"
import DashboardDataTable from "./components/DashboardDataTable"
import { getEquipments } from "../../api/services"
import { Toast } from "primereact/toast"

const Manutencoes = () => {
  const [equipaments, setEquipaments] = useState([])
  const [loading, setLoading] = useState(false)
  const toastRef = useRef(null)
  
  const showMessage = (severity) => {
    switch (severity) {
      case 'error':
        toastRef.current.show({ severity: 'error', summary: 'Erro!', detail: 'Falha ao acessar servidor. Tente novamente mais tarde.' })
        break;
    
      default:
        break;
    }
  }

  const listEquipments = async () => {
    setLoading(true)
    const res = await getEquipments()
    if (!res) {
      showMessage('error')
    }
    setEquipaments(res)
    setLoading(false)
  }

  useEffect(() => {
    listEquipments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h3>Manutenções</h3>
      <Toast ref={toastRef} />
      <DashboarCard loading={loading} equipaments={equipaments}/>
      <div className="flex">
        <DashboardDataTable loading={loading} equipaments={equipaments}/>
        <DashboardCharts loading={loading} equipaments={equipaments}/>
      </div>
    </>
  )
}

export default Manutencoes