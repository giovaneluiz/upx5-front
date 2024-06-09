import { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Toast } from 'primereact/toast'
import { Tag } from 'primereact/tag'
import { Link } from 'react-router-dom'
import NovoEquipamento from './NovoEquipamento'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import EditaEquipamento from './EditaEquipamento'

const Equipamentos = () => {
  const [equipaments, setEquipaments] = useState([])
  const [equipmentEdit, setEquipmentEdit] = useState([])
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(false)
  const toastRef = useRef(null)

  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const accept = () => {
    toastRef.current.show({ severity: 'info', summary: 'Confirmado', life: 3000 })
  }

  const reject = () => {
    toastRef.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Operação cancelada pelo usuário.', life: 3000 })
  }

  const confirm1 = () => {
    confirmDialog({
      message: 'Tem certeza que deseja ativar o equipamento?',
      header: 'Confirmação de Ativação',
      icon: 'pi pi-exclamation-triangule',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept,
      reject
    })
  }

  const confirm2 = () => {
    confirmDialog({
      message: 'Tem certeza que deseja desativar o equipamento?',
      header: 'Confirmação de Bloqueio',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept,
      reject
    })
  }
  const renderHeader = () => {
    return (
      <>
        <div className="flex justify-content-between align-items-center">
          <span className="p-input-icon-left mr-1">
            <Button severity='primary' tooltip='Novo Equipamento' icon="pi pi-plus" onClick={() => setVisible(true)} size="small" />
          </span>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText className='mr-1' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisa" size='small' />
          </IconField>
        </div>
      </>
    )
  }

  const headerTable = renderHeader()

  const showMessage = ((severity, field) => {
    switch (severity) {
      case 'success':
        toastRef.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento salvo!', life: 3000 })
        break
      case 'error':
        toastRef.current.show({ severity: 'error', summary: 'Erro!', detail: 'Erro ao inserir os dados, tente novamente mais tarde.' })
        break
      case 'warn':
        toastRef.current.show({ severity: 'warn', summary: 'Alerta!', detail: `Campo ${field} obrigatório!` })
        break
    }
  })

  const showEditDialog = (id) => {
    const resEquipmentData = equipaments.filter((equip) => equip.id === id)    
    setEquipmentEdit(resEquipmentData[0])
    setEdit(true)
  }

  const acoesTemplate = (rowData) => {
    return (
      <div className='flex flex-start'>
        <Button
          icon='pi pi-pen-to-square'
          severity='primary'
          rounded
          text
          tooltip='Editar'
          onClick={() => showEditDialog(rowData.id)}
        />
        <Link to={`/print-qrcode/${rowData.id}`} target='_blank'>
          <Button
            icon='pi pi-qrcode'
            severity='help'
            rounded
            text
            tooltip='Imprimir QRCode'            
          />
        </Link>
        <Button
          icon={rowData.status ? 'pi pi-ban' : 'pi pi-replay'}
          severity={rowData.status ? 'danger' : 'secondary'}
          rounded
          text
          tooltip={rowData.status ? 'Desativar' : 'Ativar'}
          onClick={rowData.status ? confirm2 : confirm1}
        />
      </div>
    )
  }

  const statusTemplate = (rowData) => {
    return (
      <>
        {rowData.status ? (
          <Tag value='Ativo' severity='success' icon={'pi pi-check'} />
        ) : (
          <Tag value='Inativo' severity='danger' icon={'pi pi-ban'} />
        )}
      </>
    )
  }

  useEffect(() => {
    setEquipaments([{
      id: '123e4567-e89b-12d3-a456-426614174000',
      descricao: 'Equipamento 1',
      localizacao: 'Area 01',
      data_instalacao: '2023-02-01',
      data_ult_manutencao: '2023-02-01',
      data_prox_manutencao: '2023-02-01',
      status: true
    }, {
      id: '987e6543-e21b-98d3-b654-321987654321',
      descricao: 'Equipamento 2',
      localizacao: 'Area 02',
      data_instalacao: '2023-02-01',
      data_ult_manutencao: '2023-02-23',
      data_prox_manutencao: '2023-02-23',
      status: false
    }])
    setLoading(false)
  }, [])

  return (
    <div>
      <h3>Cadastro de Equipamentos</h3>
      <Toast ref={toastRef} />
      <ConfirmDialog />
      <NovoEquipamento showMessage={showMessage} visible={visible} setVisible={setVisible} />
      <EditaEquipamento showMessage={showMessage} visible={edit} setVisible={setEdit} equipData={equipmentEdit}/>
      <div className="card">
        <DataTable
          value={equipaments}
          paginator
          size='small'
          rows={10}
          dataKey='id'
          header={headerTable}
          filters={filters}
          loading={loading}
          globalFilterFields={['descricao', 'localizacao', 'status']}
          emptyMessage='Nenhum resultado econtrado!'
        >
          <Column field="descricao" header="Equipamento"></Column>
          <Column field="localizacao" header="Localização"></Column>
          <Column field="data_instalacao" header="Dt. Instalação"></Column>
          <Column field="data_ult_manutencao" header="Ult. Manutenção"></Column>
          <Column field="data_prox_manutencao" header="Próx. Manutenção"></Column>
          <Column header="Status" body={statusTemplate}></Column>
          <Column header="Ações" body={acoesTemplate}></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default Equipamentos