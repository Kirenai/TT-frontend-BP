import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AccountModel } from '../../../models/account.mode';
import { CustomerModel } from '../../../models/customer.model';
import { findAcount, save, update } from '../../../services/account.service';
import { findCustomers } from '../../../services/customer.service';

type AccountFormParams = {
  accountId: string;
};

const AccountForm = () => {
  const [account, setAccount] = useState<AccountModel>({
    accountNumber: '',
    accountType: '',
    initialBalance: 0,
    state: 'true',
    customer: {
      customerId: 0,
    },
  });
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const navigation = useNavigate();

  const { accountId } = useParams<AccountFormParams>();

  const handleOnSubmit = async (account: AccountModel) => {
    if (accountId) await update(parseInt(accountId), account);
    else await save(account);
    navigation('/accounts');
  };

  const loadCustomers = useCallback(async () => {
    const response = await findCustomers();
    setCustomers(response);
  }, []);

  const accountToState = useCallback(async () => {
    const response = await findAcount(parseInt(accountId!));
    console.log(response);
    setAccount({ ...response, state: response.state?.toString() });
  }, [accountId]);

  useEffect(() => {
    if (accountId) accountToState();
    else loadCustomers();
    return () => {};
  }, []);

  return (
    <div className='box'>
      <h1>{accountId ? 'Actualizar cuenta' : 'Crear cuenta'}</h1>
      <Formik
        initialValues={account}
        onSubmit={handleOnSubmit}
        enableReinitialize>
        <Form>
          <div className='form-group'>
            <div>
              <label htmlFor='accountNumber'>Número de cuenta</label>
              <Field
                className='form-inputs'
                type='text'
                placeholder='Número de cuenta..'
                name='accountNumber'
              />
              <ErrorMessage name='accountNumber' />
            </div>

            <div>
              <label className='block' htmlFor='accountType'>
                Tipo de cuenta
              </label>
              <Field className='form-inputs' as='select' name='accountType'>
                {accountId ? (
                  <option defaultValue={account.accountType?.toUpperCase()}>
                    {account.accountType}
                  </option>
                ) : (
                  <>
                    <option defaultValue={''}></option>
                    <option value='Ahorros'>Ahorros</option>
                    <option value='Corriente'>Corriente</option>
                  </>
                )}
              </Field>
              <ErrorMessage name='accountType' />
            </div>

            <div>
              <label className='block' htmlFor='customerId'>
                Cliente
              </label>
              <Field
                className='form-inputs'
                as='select'
                name='customer.customerId'>
                {accountId ? (
                  <option value={`${account.customer?.customerId}`}>
                    {account.customer?.person?.name}
                  </option>
                ) : (
                  <>
                    <option defaultValue={''}></option>
                    {customers.map(c => (
                      <option key={c.customerId} value={`${c.customerId}`}>
                        {c.person?.name}
                      </option>
                    ))}
                  </>
                )}
              </Field>
              <ErrorMessage name='customerId' />
            </div>

            <div>
              <label className='block' htmlFor='initialBalance'>
                Saldo Inicial
              </label>
              <Field
                className='form-inputs'
                type='number'
                placeholder='Saldo Inicial..'
                name='initialBalance'
              />
              <ErrorMessage name='initialBalance' />
            </div>

            <div>
              <label className='block'>Estado</label>
              <label>
                <Field type='radio' name='state' value='true' />
                Activo
              </label>
              <label>
                <Field type='radio' name='state' value='false' />
                Inactivo
              </label>
            </div>
          </div>

          <div className='group-action'>
            <button className='create-button' type='submit'>
              Crear
            </button>
            <Link className='cancel-button' to='/accounts'>
              Cancelar
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AccountForm;
