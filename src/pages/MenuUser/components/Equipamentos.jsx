import { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog'
import { ToggleButton } from 'primereact/togglebutton'
import { Toast } from 'primereact/toast'

const Equipamentos = () => {
  const [equip, setEquip] = useState([])
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const toastRef = useRef(null)

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <>
        <div className="flex justify-content-between">
          <span className="p-input-icon-left">
            <Button severity='primary' label='Novo Equipamento' icon="pi pi-plus" onClick={() => setVisible(true)} size="small"/>
          </span>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisa" />
          </IconField>
        </div>
      </>
    )
  }

  const headerTable = renderHeader()

  useEffect(() => {
    setEquip([{
      id: 1,
      descricao: 'Equipamento 1',
      data_instalacao: '01/02/2023',
      data_ult_manutencao: '25/01/2024',
      data_prox_manutencao: '25/01/2025',
      status: 'Ativo'
    }, {
      id: 2,
      descricao: 'Equipamento 2',
      data_instalacao: '01/02/2023',
      data_ult_manutencao: '01/06/2023',
      data_prox_manutencao: '31/12/2023',
      status: 'Desativado'
    }])
    setLoading(false)
  }, [])

  const showMessage = () => {
    toastRef.current.show({ severity: 'success', summary: 'Cadastro realizado com sucesso', detail: 'Tudo certo com o cadastro!', life: 3000 });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    showMessage()
    setVisible(false)
  }

  const NovoEquipamentoDialog = () => (
    <>
      <Dialog header="Novo Equipamento" visible={visible} style={{ width: '60vw' }} onHide={() => setVisible(false)}>
        <form onSubmit={(e) => handleSubmit(e)} >
          <div className='flex flex-column'>
            <div className='flex flex-column gap-2'>
              <label htmlFor="equip">Descrição</label>
              <InputText id="equip" aria-describedby="username-help" />
            </div>
            <div className='flex gap-2 mt-3'>
              <div className='flex flex-column gap-2'>
                <label htmlFor="equip">Data de Instalação</label>
                <InputText id="equip" aria-describedby="username-help" type='date' />
              </div>
              <div className='flex flex-column gap-2'>
                <label htmlFor="equip">Ultima Manutenção</label>
                <InputText id="equip" aria-describedby="username-help" type='date' />
              </div>
              <div className='flex flex-column gap-2'>
                <label htmlFor="equip">Próxima Manutenção</label>
                <InputText id="equip" aria-describedby="username-help" type='date' />
              </div>
              <div className='flex flex-column gap-2'>
                <label htmlFor="equip">Ativo</label>
                <ToggleButton onLabel="Ativo" offLabel="Desativado" onIcon="pi pi-check" offIcon="pi pi-times"
                  checked={checked} onChange={(e) => setChecked(e.value)} />
              </div>
            </div>
          </div>

          <div className='mt-5'>
            <Button label='Criar Acesso' severity='primary' className='mr-2' type='submit' />
            <Button label='Cancelar' severity='secondary' text onClick={() => setVisible(false)} />
          </div>
        </form>
      </Dialog >
    </>

  )

  return (
    <div className="m-3">
      <h3>Cadastro de Equipamentos</h3>
      <NovoEquipamentoDialog />
      <Toast ref={toastRef} />
      <div className="card">
        <DataTable
          value={equip}
          tableStyle={{ minWidth: '50rem' }}
          paginator
          size='small'
          rows={10}
          dataKey='Cod_Usuario'
          header={headerTable}
          filters={filters}
          loading={loading}
          globalFilterFields={['descricao', 'data_instalacao', 'data_ult_manutencao', 'data_prox_manutencao', 'status']}
          emptyMessage='Nenhum resultado econtrado!'
        >
          <Column field="id" header="ID"></Column>
          <Column field="descricao" header="Equipamento"></Column>
          <Column field="data_instalacao" header="Dt. Instalação"></Column>
          <Column field="data_ult_manutencao" header="Ult. Manutenção"></Column>
          <Column field="data_prox_manutencao" header="Próx. Manutenção"></Column>
          <Column field="status" header="Status"></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default Equipamentos