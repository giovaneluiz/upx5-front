import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Messages } from 'primereact/messages';
import { useEffect, useRef, useState } from 'react'
import { updateEquipament } from '../../../api/services';

// eslint-disable-next-line react/prop-types
const EditaEquipamento = ({ showMessage, visible, setVisible, equipData, load }) => {
  const [equipment, setEquipment] = useState({})
  const msgRef = useRef(null)

  useEffect(() => {
    console.log(equipData)
    setEquipment(equipData)
  }, [equipData])

  const handleChange = (e) => {
    setEquipment({
      ...equipment,
      [e.target.name]: e.target.value
    })
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    selectedDate.setDate(selectedDate.getDate() + 180)
    console.log(selectedDate.toISOString())
    setEquipment({
      ...equipment,
      currentInstallationDate: e.target.value,
      nextManutentionDate: selectedDate.toISOString().split('T')[0]
    })
  }

  const showFieldError = (field) => {
    msgRef.current.show({ sticky: false, life: 3000, severity: 'error', summary: `Campo **${field}** obrigatório`, closable: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (equipment.name === '') {
      showFieldError('Nome')
      return
    }

    if (equipment.currentInstallationDate === '') {
      showFieldError('Data de Instalação')
      return
    }

    if (equipment.nextManutentionDate === '') {
      showFieldError('Próxima Manutenção')
      return
    }

    if (equipment.location === '') {
      showFieldError('Localização')
      return
    }
    const res = await updateEquipament(equipment)
    if (!res) {
      showMessage('error')
      return
    }
    setVisible(false)
    setEquipment({
      name: '',
      status: '',
      nextManutentionDate: '',
      currentInstallationDate: '',
      location: '',
      serialNumber: '',
    })
    showMessage('success')
    load()
  }

  return (
    <Dialog header="Edita Equipamento" visible={visible} style={{ width: '70vw' }} onHide={() => setVisible(false)}>
      <Messages ref={msgRef} />
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className='flex flex-column'>
          <div className='flex flex-column gap-2'>
            <label htmlFor="nome">Nome*</label>
            <InputText id="nome" aria-describedby="nome" value={equipment.name} onChange={e => handleChange(e)} name='name' />
          </div>
          <div className='flex gap-2 mt-3'>
            <div className='flex flex-column gap-2'>
              <label htmlFor="serviceTag">Service Tag</label>
              <InputText id="serviceTag" aria-describedby="serviceTag" type='text' value={equipment.serialNumber} name='serialNumber' onChange={handleChange} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Data de Instalação*</label>
              <InputText id="equip" aria-describedby="username-help" type='date' value={equipment.currentInstallationDate} name='currentInstallationDate' onChange={(e) => handleDateChange(e)} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Local de Instalação*</label>
              <InputText id="equip" aria-describedby="username-help" type='text' name='location' value={equipment.location} onChange={handleChange} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Próxima Manutenção*</label>
              <InputText id="equip" aria-describedby="username-help" type='date' value={equipment.nextManutentionDate} name='nextManutentionDate' onChange={(e) => setEquipment({ ...equipment, nextManutentionDate: e.target.value })} />
            </div>
          </div>
          <div className='flex flex-column gap-2 mt-3'>
            <label htmlFor="descricao">Outras Informações</label>
            <InputTextarea id="descricao" aria-describedby="nome" rows={2} value={equipment.description} name='description' onChange={handleChange} />
          </div>
        </div>
        <span className='mt-2'>(*) campos obrigatórios</span>
        <div className='mt-5'>
          <Button label='Salvar' severity='primary' className='mr-2' type='submit' />
          <Button label='Cancelar' type='button' severity='secondary' text onClick={() => setVisible(false)} />
        </div>
      </form>
    </Dialog >
  )
}

export default EditaEquipamento