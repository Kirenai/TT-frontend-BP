import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AccountModel } from '../../../models/account.mode';
import { MovementModel } from '../../../models/movement.model';
import { findAccounts } from '../../../services/account.service';
import { findMovement, save, update } from '../../../services/movement.service';

type MovementFormParams = {
  movementId: string;
};

const MovementForm = () => {
  const [movement, setMovement] = useState<MovementModel>({
    movementType: '',
    value: 0,
    account: {
      accountId: 0,
    },
  });
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const navigation = useNavigate();

  const { movementId } = useParams<MovementFormParams>();

  const handleOnSubmit = async (movement: MovementModel) => {
    if (movementId) await update(parseInt(movementId), movement);
    else await save(movement);

    navigation('/movements');
  };

  const loadAccounts = useCallback(async () => {
    const response = await findAccounts();
    setAccounts(response);
  }, []);

  const movementToState = useCallback(async () => {
    const response = await findMovement(parseInt(movementId!));
    setMovement({ ...response });
  }, [movementId]);

  useEffect(() => {
    if (movementId) movementToState();
    else loadAccounts();
    return () => {};
  }, []);

  return (
    <div className='box'>
      <h1>{movementId ? 'Actualizar movimiento' : 'Crear movimiento'}</h1>{' '}
      <Formik
        initialValues={movement}
        onSubmit={handleOnSubmit}
        enableReinitialize>
        <Form>
          <div className='form-group'>
            <div>
              <label htmlFor='accountNumber'>Tipo de movimiento</label>
              <Field className='form-inputs' as='select' name='movementType'>
                {movementId ? (
                  <option value={`${movement.movementType?.toUpperCase()}`}>
                    {movement.movementType}
                  </option>
                ) : (
                  <>
                    <option defaultValue={''}></option>
                    <option value='RETIRO'>Retiro</option>
                    <option value='DEPOSITO'>Deposito</option>
                  </>
                )}
              </Field>
              <ErrorMessage name='movementType' />
            </div>

            <div>
              <label className='block' htmlFor='value'>
                Movimiento
              </label>
              <Field className='form-inputs' type='number' name='value' />
              <ErrorMessage name='value' />
            </div>

            <div>
              <label className='block' htmlFor='accountId'>
                Cuenta
              </label>
              <Field
                className='form-inputs'
                as='select'
                name='account.accountId'>
                {movementId ? (
                  <option defaultValue={movement.account?.accountId}>
                    {movement.account?.accountNumber}
                  </option>
                ) : (
                  <>
                    <option defaultValue={''}></option>
                    {accounts.map(a => (
                      <option key={a.accountId} value={`${a.accountId}`}>
                        {a.accountNumber}
                      </option>
                    ))}
                  </>
                )}
              </Field>
              <ErrorMessage name='customerId' />
            </div>
          </div>

          <div className='group-action'>
            <button className='create-button' type='submit'>
              {movementId ? 'Actualizar' : 'Crear'}
            </button>
            <Link className='cancel-button' to='/movements'>
              Cancelar
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MovementForm;
