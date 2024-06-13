import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

export default function DashboardDataTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        code: 1,
        name: 'Manut 1',
        category: 'Cate',
        quantity: 10
      },
      {
        code: 2,
        name: 'Manut 1',
        category: 'Cate',
        quantity: 10
      },
      {
        code: 3,
        name: 'Manut 1',
        category: 'Cate',
        quantity: 10
      },
      {
        code: 4,
        name: 'Manut 1',
        category: 'Cate',
        quantity: 10
      },
    ])
  }, []);

  return (
    <Card className="m-2">
      <DataTable value={products} tableStyle={{ minWidth: '45rem' }}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </Card>
  );
}