import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Messages } from 'primereact/messages';
import { useRef, useState } from 'react'

// eslint-disable-next-line react/prop-types
const NovoEquipamento = ({ showMessage, visible, setVisible }) => {
  const [newEquipament, setNewEquipament] = useState({
    descricao: '',
    serviceTag: '',
    data_instalacao: '',
    localizacao: '',
    data_prox_manutencao: '',
    observacoes: ''
  })
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
      data_instalacao: e.target.value,
      data_prox_manutencao: selectedDate.toISOString().split('T')[0]
    })
  }

  const showFieldError = (field) => {
    msgRef.current.show({ sticky: false, life: 3000, severity: 'error', summary: `Campo **${field}** obrigatório`, closable: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    
    
    if (newEquipament.descricao === '') {
      showFieldError('Nome')
      return
    }

    if (newEquipament.data_instalacao === '') {
      showFieldError('Data de Instalação')
      return
    }

    if (newEquipament.localizacao === '') {
      showFieldError('Localização')
      return
    }

    showMessage('success')
    setVisible(false)
    setNewEquipament({
      descricao: '',
      serviceTag: '',
      data_instalacao: '',
      localizacao: '',
      data_prox_manutencao: '',
      observacoes: ''
    })
  }

  return (
    <Dialog header="Novo Equipamento" visible={visible} style={{ width: '70vw' }} onHide={() => setVisible(false)}>
      <Messages ref={msgRef} />
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className='flex flex-column'>
          <div className='flex flex-column gap-2'>
            <label htmlFor="nome">Nome*</label>
            <InputText id="nome" aria-describedby="nome" value={newEquipament.descricao} onChange={e => handleChange(e)} name='descricao' />
          </div>
          <div className='flex gap-2 mt-3'>
            <div className='flex flex-column gap-2'>
              <label htmlFor="serviceTag">Service Tag</label>
              <InputText id="serviceTag" aria-describedby="serviceTag" type='text' value={newEquipament.serviceTag} name='serviceTag' onChange={handleChange} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Data de Instalação*</label>
              <InputText id="equip" aria-describedby="username-help" type='date' value={newEquipament.data_instalacao} onChange={(e) => handleDateChange(e)} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Local de Instalação*</label>
              <InputText id="equip" aria-describedby="username-help" type='text' name='localizacao' value={newEquipament.localizacao} onChange={handleChange} />
            </div>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Próxima Manutenção*</label>
              <InputText value={newEquipament.data_prox_manutencao} id="equip" aria-describedby="username-help" type='date' onChange={(e) => setNewEquipament({ ...newEquipament, data_prox_manutencao: e.target.value })} />
            </div>
          </div>
          <div className='flex flex-column gap-2 mt-3'>
            <label htmlFor="descricao">Outras Informações</label>
            <InputTextarea id="descricao" aria-describedby="nome" rows={2} value={newEquipament.observacoes} name='observacoes' onChange={handleChange} />
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

export default NovoEquipamento