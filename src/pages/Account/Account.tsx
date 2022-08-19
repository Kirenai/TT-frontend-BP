import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/global.css';
import Table from '../../components/Table';
import UpdateDelete from '../../components/UpdateDelete';
import { AccountModel } from '../../models/account.mode';
import { findAccounts, remove } from '../../services/account.service';
import AccountTableData from './components/AccountTableData';

const tableHeaders = [
  {
    name: 'Numero Cuenta',
  },
  {
    name: 'Tipo',
  },
  {
    name: 'Saldo Inicial',
  },
  {
    name: 'Estado',
  },
  {
    name: 'Cliente',
  },
  {
    name: 'Acciones',
  },
];

const Account = () => {
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [filter, setFilter] = useState('');

  const loadAccounts = useCallback(async () => {
    const response = await findAccounts();
    setAccounts(response);
  }, []);

  const removeAccount = async (customerId: number) => {
    await remove(customerId);
    await loadAccounts();
  };

  useEffect(() => {
    loadAccounts();
    return () => {};
  }, []);

  return (
    <div className='box'>
      <h1>Cuentas</h1>
      <div className='group'>
        <input
          className='search'
          type='text'
          placeholder='Filtar por numero de cuenta'
          name='filter'
          onChange={e => setFilter(e.target.value)}
        />
        <Link to='/accounts/create' className='new-button'>
          Nuevo
        </Link>
      </div>
      <Table headers={tableHeaders}>
        <AccountTableData
          items={accounts}
          filter={filter}
          remove={removeAccount}
        />
      </Table>
    </div>
  );
};

export default Account;
