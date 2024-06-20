/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { dateValidator } from '../../../validators/date-validator';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Tag } from 'primereact/tag';

export default function DashboardDataTable({ loading, equipaments }) {
  const acoesTemplate = (rowData) => {
    return (
      <div className='flex flex-start'>
        <Link to={`/manutencao/${rowData.id}`} target='_blank'>
          <Button
            icon='pi pi-window-maximize'
            severity='success'
            rounded
            text
            tooltip='Ver detalhes'
          />
        </Link>
      </div>
    )
  }
  const statusBodyTemplate = (rowData) => {
    switch (rowData.status) {
      case 'Agendada':
        return (<Tag value={rowData.status} severity='info' icon={'pi pi-check'} className="mt-1 mb-1" />)
      case 'Em Andamento':
        return (<Tag value={rowData.status} severity='warning' icon={'pi pi-info-circle'} />)
      case 'Em Atraso':
        return (<Tag value={rowData.status} severity='danger' icon={'pi pi-minus-circle'} />)
    }
  }
  return (
    <Card className="m-2">
      <DataTable
        value={equipaments}
        paginator
        size='small'
        rows={5}
        dataKey='id'
        header={'Lista de Manutenções'}
        loading={loading}
        globalFilterFields={['name', 'location', 'active']}
        emptyMessage='Nenhum resultado econtrado!'
        sortField='name'
        sortOrder={1}
      >
        <Column field="name" sortable header="Equipamento"></Column>
        <Column field="location" sortable header="Localização"></Column>
        <Column field="nextManutentionDate" sortable header="Próx. Manutenção" body={dateValidator.nextManutentionDateTemplate}></Column>
        <Column field="status" sortable header="Status" body={statusBodyTemplate}></Column>
        <Column header="Ações" body={acoesTemplate}></Column>
      </DataTable>
    </Card>
  );
}