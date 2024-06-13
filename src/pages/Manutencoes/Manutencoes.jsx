import { DashboarCard } from "./components/DashboarCard"
import { DashboardCharts } from "./components/DashboardCharts"
import DashboardDataTable from "./components/DashboardDataTable"

const Manutencoes = () => {
  return (
    <>
      <h3>Manutenções</h3>
      <DashboarCard />
      <div className="flex">
        <DashboardDataTable />
        <DashboardCharts />
      </div>
    </>
  )
}

export default Manutencoes