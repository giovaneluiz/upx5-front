/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { Tag } from 'primereact/tag'
import { getUserAll } from '../../../api/services'
import { Messages } from 'primereact/messages'
import { InputMask } from 'primereact/inputmask'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'

const defaultUser = {
  name: '',
  cpf: '',
  password: '',
  confirmPassword: ''
}

const Users = () => {
  const [users, setUsers] = useState([])
  const [userData, setUserData] = useState(defaultUser)
  const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [titleDialog, setTitleDialog] = useState('Novo Usuário')
  const [iptPassWords, setIptPassWords] = useState(true)

  const toastRef = useRef(null)
  const msgRef = useRef(null)
  const nameRef = useRef(null)
  const cpfRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)


  const onGlobalFilterChange = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const showMessage = (severity => {
    switch (severity) {
      case 'success':
        toastRef.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Usuário Cadastrado!', life: 3000 })
        break
      case 'error':
        toastRef.current.show({ severity: 'error', summary: 'Erro!', detail: 'Falha na conexão com o servidor! Tente novamente mais tarde.' })
        break
    }
  })

  const accept = () => {
    toastRef.current.show({ severity: 'info', summary: 'Confirmado', life: 3000 })
  }

  const reject = () => {
    toastRef.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Operação cancelada pelo usuário.', life: 3000 })
  }

  const confirm1 = () => {
    confirmDialog({
      message: 'Tem certeza que deseja desbloquear o acesso do usuário?',
      header: 'Confirmação de Desbloqueio',
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
      message: 'Tem certeza que deseja bloquear o usuário?',
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
            <Button severity='primary' tooltip='Novo Usuário' icon="pi pi-plus" onClick={() => showNewDialog()} size="small" />
          </span>
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText className='mr-1' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisar" size='small' />
          </IconField>
        </div>
      </>
    )
  }

  const headerTable = renderHeader()

  const showNewDialog = () => {
    setUserData(defaultUser)
    setTitleDialog('Criar Novo Usuário')
    setVisible(true)
  }

  const showEditDialog = (id) => {
    const resUserData = users.filter((user) => user.id === id)
    setUserData(resUserData[0])
    setTitleDialog('Editar Usuário')
    setIptPassWords(false)
    setVisible(true)
  }

  const acoesTemplate = (rowData) => {
    return (
      <div className='flex flex-start'>
        <Button
          icon='pi pi-user-edit'
          severity='primary'
          rounded
          text
          tooltip='Editar'
          onClick={() => showEditDialog(rowData.id)}
        />
        <Button
          icon={rowData.status ? 'pi pi-ban' : 'pi pi-replay'}
          severity={rowData.status ? 'danger' : 'secondary'}
          rounded
          text
          tooltip={rowData.status ? 'Bloquear' : 'Ativar'}
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

  const showFieldError = (field) => {
    msgRef.current.show({ sticky: false, life: 3000, severity: 'error', summary: `Campo **${field}** obrigatório`, closable: true })
  }

  // eslint-disable-next-line no-unused-vars
  const loadData = async () => {
    const users = await getUserAll()
    console.log(users)
    if (!users) {
      showMessage('error')
      return
    }
    setUsers(users)
  }

  useEffect(() => {
    setLoading(true)
    setUsers([{
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Usuário 1',
      cpf: '111.111.111-11',
      createAt: '25/01/2024',
      updateAt: '25/01/2025',
      status: true
    }, {
      id: '987e6543-e21b-98d3-b654-321987654321',
      name: 'Usuário 2',
      cpf: '222.222.222-22',
      createAt: '25/01/2024',
      updateAt: '25/01/2025',
      status: false
    }])
    // loadData()
    setLoading(false)
  }, [])

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userData.name === '') {
      showFieldError('Nome')
      nameRef.current.focus()
      return
    }

    if (userData.cpf === '') {
      showFieldError('CPF')
      cpfRef.current.focus()
      return
    }

    if (userData.password === '') {
      showFieldError('Senha')
      passwordRef.current.focus()
      return
    }

    if (userData.confirmPassword === '') {
      showFieldError('Confirma Senha')
      confirmPasswordRef.current.focus()
      return
    }

    if (userData.password !== userData.confirmPassword) {
      msgRef.current.show({ sticky: false, life: 3000, severity: 'error', summary: `As senhas não conferem!`, closable: true })
      setUserData({
        ...userData,
        password: '',
        confirmPassword: ''
      })
      passwordRef.current.focus()
      return
    }

    showMessage('success')
    setVisible(false)
    setUserData(defaultUser)
  }

  return (
    <div>
      <h3>Cadastro de Usuários</h3>
      <Toast ref={toastRef} />
      <ConfirmDialog />
      <Dialog visible={visible} style={{ minWidth: '48vw' }} closable={false}>
        <h3>{titleDialog}</h3>
        <Messages ref={msgRef} />
        <form onSubmit={(e) => handleSubmit(e)} >
          <div className='flex flex-column'>
            <div className='flex flex-column gap-2'>
              <label htmlFor="name">Nome*</label>
              <InputText id="name" name='name' aria-describedby="name" value={userData.name} onChange={handleChange} ref={nameRef} />
            </div>
            <div className='flex gap-2 mt-3'>
              <div className='flex flex-column gap-2'>
                <label htmlFor="cpf">CPF/Acesso*</label>
                <InputMask id="cpf" name='cpf' value={userData.cpf} onChange={handleChange} mask="999.999.999-99" placeholder='999.999.999-99' ref={cpfRef} />
              </div>
              {iptPassWords && (
                <>
                  <div className='flex flex-column gap-2'>
                    <label htmlFor="password">Senha*</label>
                    <InputText id="password" name='password' aria-describedby="password" value={userData.password} type='password' onChange={handleChange} ref={passwordRef} />
                  </div>
                  <div className='flex flex-column gap-2'>
                    <label htmlFor="confirmPassword">Confirma Senha*</label>
                    <InputText id="confirmPassword"
                      name='confirmPassword'
                      aria-describedby="confirmPassword"
                      value={userData.confirmPassword}
                      type='password'
                      onChange={handleChange}
                      ref={confirmPasswordRef} />
                  </div>
                </>
              )}
            </div>
          </div>
          <span className='mt-2'>(*) campos obrigatórios</span>
          <div className='mt-5'>
            <Button label='Salvar' severity='primary' className='mr-2' type='submit' />
            {!iptPassWords && (
              <>
                <Button label='Redefinir Senha' severity="warning" text type='button' onClick={() => setIptPassWords(true)} />
              </>
            )}
            <Button label='Cancelar' type='button' severity='secondary' text onClick={() => setVisible(false)} />
          </div>
        </form>
      </Dialog >
      <div className="card">
        <DataTable
          value={users}
          paginator
          size='small'
          rows={10}
          dataKey='id'
          header={headerTable}
          filters={filters}
          loading={loading}
          globalFilterFields={['name', 'cpf']}
          emptyMessage='Nenhum resultado econtrado!'
        >
          <Column field="name" header="Nome"></Column>
          <Column field="cpf" header="CPF/Acesso"></Column>
          <Column field="createAt" header="Dat. Cadastro"></Column>
          <Column header="Status" body={statusTemplate}></Column>
          <Column header="Ações" body={acoesTemplate}></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default Users