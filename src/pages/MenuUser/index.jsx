import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Equipamentos from './components/Equipamentos';
import Home from './components/Home'
import Manutencoes from './components/Manutencoes';
import Usuarios from './components/Usuarios';

const MenuUser = () => {
  const [menu, setMenu] = useState(1)

  const components = {
    1: <Home setMenu={setMenu}/>,
    2: <Equipamentos />,
    3: <Manutencoes />,
    4: <Usuarios />,
  }
  return (
    <>
      <Navbar activeIndex={setMenu} />
      <div className="m-3">
        {components[menu]}
      </div>
    </>
  )
}

export default MenuUser