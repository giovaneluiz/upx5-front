import { Menubar } from "primereact/menubar";

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
      },      
    },
    {
      label: 'Manutenções ',
      icon: 'pi pi-cog',
      command: () => {
        activeIndex(3)
      }
    },
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      command: () => {
        activeIndex(4)
      }
    }
  ]

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  )
}

export default Navbar