import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Messages } from 'primereact/messages';
import { useRef, useState } from 'react'
import { insertEquipament } from '../../../api/services';

const defaultEquipment = {
  name: '',
  status: '',
  nextManutentionDate: '',
  currentInstallationDate: '',
  location: '',
  serialNumber: '',
}

// eslint-disable-next-line react/prop-types
const NovoEquipamento = ({ showMessage, visible, setVisible, load }) => {
  const [newEquipament, setNewEquipament] = useState(defaultEquipment)
  const [loading, setLoading] = useState(false)
  const msgRef = useRef(null)

  const handleChange = (e) => {
    setNewEquipament({
      ...newEquipament,
      [e.target.name]: e.target.value
    })
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    selectedDate.setDate(selectedDate.getDate() + 180)
    setNewEquipament({
      ...newEquipament,
      currentInstallationDate: e.target.value,
      nextManutentionDate: selectedDate.toISOString().split('T')[0]
    })
  }

  const showFieldError = (field) => {
    msgRef.current.show({ sticky: false, life: 3000, severity: 'error', summary: `Campo **${field}** obrigatório`, closable: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    
    if (newEquipament.name === '') {
      showFieldError('Nome')
      return
    }

    if (newEquipament.currentInstallationDate === '') {
      showFieldError('Data de Instalação')
      return
    }

    if (newEquipament.location === '') {
      showFieldError('Localização')
      return
    }
    setLoading(true)
    const equipment = await insertEquipament(newEquipament)
    if (!equipment) {
      showMessage('error')
      return
    }
    showMessage('success')
    setVisible(false)
    setLoading(false)
    setNewEquipament(defaultEquipment)
    load()
  }

  return (
    <Dialog header="Novo Equipamento" visible={visible} style={{ width: '70vw' }} onHide={() => setVisible(false)}>
      <Messages ref={msgRef} />
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className='flex flex-column'>
          <div className='flex flex-column gap-2'>
            <label htmlFor="nome">Nome*</label>
            <InputText id="nome" aria-describedby="nome" value={newEquipament.name} onChange={e => handleChange(e)} name='name' />
          </div>
          <div className='flex gap-2 mt-3'>
            <div className='flex flex-column gap-2'>
              <label htmlFor="serviceTag">Service Tag</label>
              <InputText id="serviceTag" aria-describedby="serviceTag" type='text' value={newEquipament.serialNumber} name='serialNumber' onChange={handleChange} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Data de Instalação*</label>
              <InputText id="equip" aria-describedby="username-help" type='date' value={newEquipament.currentInstallationDate} onChange={(e) => handleDateChange(e)} name='currentInstallationDate' />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Local de Instalação*</label>
              <InputText id="equip" aria-describedby="username-help" type='text' name='location' value={newEquipament.location} onChange={handleChange} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Próxima Manutenção*</label>
              <InputText
                value={newEquipament.nextManutentionDate}
                id="equip"
                aria-describedby="username-help"
                type='date'
                onChange={(e) => setNewEquipament({ ...newEquipament, nextManutentionDate: e.target.value })}
                name='nextManutentionDate'
              />
            </div>
          </div>
          <div className='flex flex-column gap-2 mt-3'>
            <label htmlFor="descricao">Outras Informações</label>
            <InputTextarea id="descricao" aria-describedby="nome" rows={2} value={newEquipament.description} name='description' onChange={handleChange} />
          </div>
        </div>
        <span className='mt-2'>(*) campos obrigatórios</span>
        <div className='mt-5'>
          <Button label='Salvar' severity='primary' className='mr-2' type='submit' loading={loading}/>
          <Button label='Cancelar' type='button' severity='secondary' text onClick={() => setVisible(false)} />
        </div>
      </form>
    </Dialog >
  )
}

export default NovoEquipamento