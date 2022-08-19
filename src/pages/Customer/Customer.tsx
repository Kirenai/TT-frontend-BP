import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/global.css';
import Table from '../../components/Table';
import { CustomerModel } from '../../models/customer.model';
import { findCustomers, remove } from '../../services/customer.service';
import CustomerTableData from './components/CustomerTableData';

const tableHeaders = [
  {
    name: 'Nombres',
  },
  {
    name: 'Dirección',
  },
  {
    name: 'Teléfono',
  },
  {
    name: 'Contraseña',
  },
  {
    name: 'Estado',
  },
  {
    name: 'Acciones',
  },
];

const Customer = () => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [filter, setFilter] = useState('');

  const loadCustomers = useCallback(async () => {
    const data = await findCustomers();
    setCustomers(data);
  }, []);

  const removeCustomer = async (customerId: number) => {
    await remove(customerId);
    await loadCustomers();
  };

  useEffect(() => {
    loadCustomers();
    return () => {};
  }, []);

  return (
    <div className='box'>
      <h1>Clientes</h1>
      <div className='group'>
        <input
          className='search'
          type='text'
          placeholder='Filtrar por nombres'
          name='filter'
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <Link to='/customers/create' className='new-button'>
          Nuevo
        </Link>
      </div>
      <Table headers={tableHeaders}>
        <CustomerTableData
          items={customers}
          filter={filter}
          remove={removeCustomer}
        />
      </Table>
    </div>
  );
};

export default Customer;
