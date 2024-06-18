/* eslint-disable react/prop-types */
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { dateValidator } from '../../../validators/date-validator';

export default function DashboardDataTable({ loading, equipaments }) {
  
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
          sortField='nextManutentionDate'                     
        >
          <Column field="name" sortable header="Equipamento"></Column>
          <Column field="location" sortable header="Localização"></Column>
          <Column field="nextManutentionDate" sortable header="Próx. Manutenção" body={dateValidator.nextManutentionDateTemplate}></Column>                    
          <Column field="status" sortable header="Status"></Column>
        </DataTable>
    </Card>
  );
}