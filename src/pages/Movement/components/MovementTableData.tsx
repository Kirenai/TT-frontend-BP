import UpdateDelete from '../../../components/UpdateDelete';
import { MovementModel } from '../../../models/movement.model';

interface MovementTableDataProps {
  items: MovementModel[];
  filter: string;
  remove: (id: number) => void;
}

const MovementTableData = ({
  items,
  filter,
  remove,
}: MovementTableDataProps) => {
  return (
    <>
      {items
        .filter(
          f => f.account?.accountNumber?.includes(filter) || filter === ''
        )
        .map(item => (
          <tr key={item.movementId}>
            <td>{item.account?.accountNumber}</td>
            <td>{item.account?.accountType}</td>
            <td>{item.account?.initialBalance}</td>
            <td>{item.account?.state ? 'True' : 'False'}</td>
            <td>
              {item.movementType} de {item.value}
            </td>
            <td>
              <UpdateDelete
                entityUrl='movements'
                entityId={item.movementId!}
                remove={remove}
              />
            </td>
          </tr>
        ))}
    </>
  );
};

export default MovementTableData;
