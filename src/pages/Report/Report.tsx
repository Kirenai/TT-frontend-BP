import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import '../../assets/css/global.css';
import Table from '../../components/Table';
import { CustomerModel } from '../../models/customer.model';
import { ReportModel } from '../../models/movement.model';
import { findCustomers } from '../../services/customer.service';
import { findMovementsByDateAndCustomer } from '../../services/movement.service';
import ReportTableData from './components/ReportTableData';

const tableHeaders = [
  {
    name: 'Fecha',
  },
  {
    name: 'Cliente',
  },
  {
    name: 'Tipo',
  },
  {
    name: 'Numero Cuenta',
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
    name: 'Saldo disponible',
  },
];

const Report = () => {
  const [reports, setReports] = useState<ReportModel[]>([]);
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [filter, setFilter] = useState('');

  const loadCustomers = async () => {
    const response = await findCustomers();
    setCustomers(response);
  };

  useEffect(() => {
    loadCustomers();
    return () => {};
  }, []);

  return (
    <div className='box'>
      <h1>Reportes</h1>
      <div className='group'>
        <input
          className='search'
          type='text'
          placeholder='Filtrar por fecha'
          name='filter'
          onChange={e => setFilter(e.target.value)}
        />
        <Formik
          initialValues={{ dateStart: '', dateEnd: '', customerId: undefined }}
          onSubmit={async ({ dateStart, dateEnd, customerId }) => {
            const response = await findMovementsByDateAndCustomer(
              dateStart,
              dateEnd,
              parseInt(customerId!)
            );
            console.log(response);
            setReports(response);
          }}>
          <Form>
            <div className='form-group'>
              <Field className='date' type='date' name='dateStart' />
              <Field className='date' type='date' name='dateEnd' />
              <Field
                className='date'
                as='select'
                name='customerId'
                placeholder='Buscar por fecha'>
                <option defaultValue={'0'}></option>
                {customers.map(c => (
                  <option key={c.customerId} value={`${c.customerId}`}>
                    {c.person?.name}
                  </option>
                ))}
              </Field>
              <button className='send' type='submit'>
                Buscar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <Table headers={tableHeaders}>
        <ReportTableData items={reports} filter={filter} />
      </Table>
    </div>
  );
};

export default Report;
