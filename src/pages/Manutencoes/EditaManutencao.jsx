import { useParams } from "react-router-dom"
import { getEquipmentById, updateMaintenance } from "../../api/services"
import { useEffect, useRef, useState } from "react"
import { Toast } from "primereact/toast"
import { Card } from "primereact/card"
import { Tag } from "primereact/tag"
import { Message } from "primereact/message"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { Messages } from "primereact/messages"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Sidebar } from "primereact/sidebar"
import { Dropdown } from "primereact/dropdown"

export const EditaManutencao = () => {
  const { uuid } = useParams()
  const [equipment, setEquipment] = useState(null)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const toastRef = useRef(null)
  const msgRef = useRef(null)

  const showMessage = (severity) => {
    switch (severity) {
      case 'error':
        toastRef.current.show({ severity: 'error', summary: 'Erro!', detail: 'Falha ao acessar servidor. Tente novamente mais tarde.' })
        break;
    }
  }

  const statusOpt = [
    { name: 'Em Andamento' },
    { name: 'Em Atraso' },
    { name: 'Agendada' },
  ]

  const formatDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString()
    } else {
      return 'Sem registro'
    }
  }

  const StatusBody = () => {
    switch (equipment.status) {
      case 'Agendada':
        return (
          <>
            <div className="flex flex-column">
              <Tag value={equipment.status} severity='info' icon={'pi pi-check'} className="mt-1 mb-1" />
              <span className="text-xs">Data prevista: {formatDate(equipment.nextManutentionDate)}</span>
            </div>
          </>
        )
      case 'Em Andamento':
        return (<Tag value={equipment.status} severity='warning' icon={'pi pi-info-circle'} />)
      case 'Em Atraso':
        return (<Tag value={equipment.status} severity='danger' icon={'pi pi-minus-circle'} />)
    }
  }

  const getEquipment = async () => {
    const data = await getEquipmentById(uuid)
    if (!data) {
      showMessage('error')
      return
    }
    setEquipment(data)
  }

  useEffect(() => {
    getEquipment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    setEquipment({
      ...equipment,
      [e.target.name]: e.target.value
    })
  }

  const showFieldError = (field) => {
    msgRef.current.show({ sticky: false, life: 3000, severity: 'error', summary: `Campo **${field}** obrigatório`, closable: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (equipment.nextManutentionDate === '') {
      showFieldError('Próxima Manutenção')
      setLoading(false)
      return
    }

    if (equipment.status === '') {
      showFieldError('Status da Manutenção')
      setLoading(false)
      return
    }

    const res = await updateMaintenance(equipment)
    if (!res) {
      showMessage('error')
      setLoading(false)
      return
    }
    setVisible(false)
    setLoading(false)
    showMessage('success')
    getEquipment()
  }
  return (
    <>
      <div className="m-3">
        <Toast ref={toastRef} />
        <h3>Detalhes do Equipamento </h3>
        {!equipment & !loading ? (
          <Message text="Nenhum equipamento encontrado!" />
        ) : (
          <>
            <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
              <Messages ref={msgRef} />
              <form onSubmit={(e) => handleSubmit(e)} >
                <div className='flex flex-column'>
                  <div className='flex flex-column gap-2'>
                    <label htmlFor="nome">Equipamento</label>
                    <InputText className="p-inputtext-sm" disabled id="nome" aria-describedby="nome" value={equipment.name} onChange={e => handleChange(e)} name='name' />
                  </div>
                  <div className='flex flex-column gap-2 mt-3'>
                    <div className='flex flex-column gap-2'>
                      <label htmlFor="serviceTag">Service Tag</label>
                      <InputText className="p-inputtext-sm" disabled id="serviceTag" aria-describedby="serviceTag" type='text' value={equipment.serialNumber} name='serialNumber' onChange={handleChange} />
                    </div>
                    <div className='flex flex-column gap-2'>
                      <label htmlFor="equip">Local de Instalação</label>
                      <InputText className="p-inputtext-sm" disabled id="equip" aria-describedby="username-help" type='text' name='location' value={equipment.location} onChange={handleChange} />
                    </div>

                    <div className='flex flex-column gap-2'>
                      <label htmlFor="equip">Status da Manutenção*</label>
                      <Dropdown
                        className="p-inputtext-sm"
                        value={equipment.status}
                        onChange={(e) => setEquipment({ ...equipment, status: e.value })}
                        options={statusOpt}
                        optionLabel="name"
                        placeholder="Selecione um Status" />
                    </div>

                    <div className='flex flex-column gap-2'>
                      <label htmlFor="equip">Próxima Manutenção*</label>
                      <InputText className="p-inputtext-sm" id="equip" aria-describedby="username-help" type='date' value={equipment.nextManutentionDate} name='nextManutentionDate' onChange={(e) => setEquipment({ ...equipment, nextManutentionDate: e.target.value })} />
                    </div>
                  </div>
                  <div className='flex flex-column gap-2 mt-3'>
                    <label htmlFor="descricao">Outras Informações</label>
                    <InputTextarea id="descricao" aria-describedby="nome" rows={2} value={equipment.description} name='description' onChange={handleChange} />
                  </div>
                </div>
                <span className='mt-2'>(*) campos obrigatórios</span>
                <div className='mt-5'>
                  <Button label='Salvar' severity='primary' className='mr-2' type='submit' loading={loading} />
                  <Button label='Cancelar' type='button' severity='secondary' text onClick={() => setVisible(false)} />
                </div>
              </form>
            </Sidebar >
            <Card
              title={equipment.name}
              subTitle={`Total de manutenções até o momento: ${equipment.maintenanceCount}`}
            >
              <Divider type="solid" />
              <div className="flex flex-column">
                <label className="text-sm mb-2">Data de Instalação: {formatDate(equipment.currentInstallationDate)}</label>
                <label className="text-sm mb-2">Ult. Atualização: {formatDate(equipment.updated_at)}</label>
                <label className="text-sm mb-2">Localização: {equipment.location}</label>
                <label className="text-sm">Status da próxima manutenção: </label> <StatusBody />
              </div>
              <Divider type="solid" />
              <div className="flex justify-content-center">
                <Button label="Registrar nova manutenção" severity="success" onClick={() => setVisible(true)}></Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  )
}
