import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/global.css';
import Table from '../../components/Table';
import { MovementModel } from '../../models/movement.model';
import { findMovements, remove } from '../../services/movement.service';
import MovementTableData from './components/MovementTableData';

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
    name: 'Movimiento',
  },
  {
    name: 'Acciones',
  },
];

const Movement = () => {
  const [movements, setMovements] = useState<MovementModel[]>([]);
  const [filter, setFilter] = useState('');

  const loadMovements = async () => {
    const data = await findMovements();
    setMovements(data);
  };

  const removeMovement = async (customerId: number) => {
    await remove(customerId);
    await loadMovements();
  };

  useEffect(() => {
    loadMovements();
    return () => {};
  }, []);

  return (
    <div className='box'>
      <h1>Movimientos</h1>
      <div className='group'>
        <input
          className='search'
          type='text'
          placeholder='Filtar por numero de cuenta'
          name='filter'
          onChange={e => setFilter(e.target.value)}
        />
        <Link to='/movements/create' className='new-button'>
          Nuevo
        </Link>
      </div>
      <Table headers={tableHeaders}>
        <MovementTableData
          items={movements}
          filter={filter}
          remove={removeMovement}
        />
      </Table>
    </div>
  );
};

export default Movement;
