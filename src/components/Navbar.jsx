import { TabMenu } from "primereact/tabmenu";

// eslint-disable-next-line react/prop-types
const Navbar = ({ activeIndex }) => {
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        activeIndex(1)
      }
    },
    {
      label: 'Equipamentos',
      icon: 'pi pi-star',
      command: () => {
        activeIndex(2)
      }
    },
    {
      label: 'Manutenções ',
      icon: 'pi pi-cog'
    },
    {
      label: 'Usuários',
      icon: 'pi pi-users'
    }
  ]

  return (
    <div className="card">
      <TabMenu model={items} />
    </div>
  )
}

export default Navbar