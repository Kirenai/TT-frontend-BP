import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CustomerModel } from '../../../models/customer.model';
import { findCustomer, save, update } from '../../../services/customer.service';

type CustomerFormParams = {
  customerId: string;
};

const CustomerForm = () => {
  const [customer, setCustomer] = useState<CustomerModel>({
    password: '',
    state: 'true',
    person: {
      name: '',
      gender: '',
      age: 0,
      identification: '',
      address: '',
      phone: '',
    },
  });
  const navigation = useNavigate();

  const { customerId } = useParams<CustomerFormParams>();

  const handleOnSubmit = async (customer: CustomerModel) => {
    if (customerId) await update(parseInt(customerId), customer);
    else await save(customer);

    navigation('/customers');
  };

  const customerToState = useCallback(async () => {
    const response = await findCustomer(parseInt(customerId!));
    setCustomer({ ...response, state: response.state?.toString() });
  }, [customerId]);

  useEffect(() => {
    if (customerId) {
      customerToState();
    }
    return () => {};
  }, []);

  return (
    <div className='box'>
      <h1>{customerId ? 'Actualizar cliente' : 'Crear cliente'}</h1>
      <Formik
        initialValues={customer}
        onSubmit={handleOnSubmit}
        enableReinitialize>
        <Form>
          <div className='form-group'>
            <div>
              <label htmlFor='name'>Nombres</label>
              <Field
                className='form-inputs'
                type='text'
                placeholder='Nombres..'
                name='person.name'
              />
              <ErrorMessage name='name' />
            </div>

            <div>
              <label className='block' htmlFor='gender'>
                Genero
              </label>
              <Field
                className='form-inputs'
                type='text'
                placeholder='Genero..'
                name='person.gender'
              />
              <ErrorMessage name='gender' />
            </div>

            <div>
              <label className='block' htmlFor='age'>
                Edad
              </label>
              <Field
                className='form-inputs'
                type='number'
                placeholder='Edad..'
                name='person.age'
              />
              <ErrorMessage name='age' />
            </div>

            <div>
              <label className='block' htmlFor='identification'>
                Identificación
              </label>
              <Field
                className='form-inputs'
                type='text'
                placeholder='Identificación..'
                name='person.identification'
              />
              <ErrorMessage name='identification' />
            </div>

            <div>
              <label className='block' htmlFor='address'>
                Dirección
              </label>
              <Field
                className='form-inputs'
                type='text'
                placeholder='Dirección..'
                name='person.address'
              />
              <ErrorMessage name='address' />
            </div>
            <div>
              <label className='block' htmlFor='phone'>
                Télefono
              </label>
              <Field
                className='form-inputs'
                type='text'
                placeholder='teléfono..'
                name='person.phone'
              />
              <ErrorMessage name='phone' />
            </div>
            <div>
              <label className='block' htmlFor='password'>
                Contraseña
              </label>
              <Field
                className='form-inputs'
                type='password'
                placeholder='Contraseña..'
                name='password'
                id='password'
              />
              <ErrorMessage name='password' />
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
              {customerId ? 'Actualizar' : 'Crear'}
            </button>
            <Link className='cancel-button' to='/customers'>
              Cancelar
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CustomerForm;
