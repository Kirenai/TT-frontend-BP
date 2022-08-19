import UpdateDelete from '../../../components/UpdateDelete';
import { CustomerModel } from '../../../models/customer.model';

interface CustomerTableDataProps {
  items: CustomerModel[];
  filter: string;
  remove: (id: number) => void;
}

const CustomerTableData = ({
  items,
  filter,
  remove,
}: CustomerTableDataProps) => {
  return (
    <>
      {items
        .filter(f => f.person?.name?.includes(filter) || filter === '')
        .map(item => (
          <tr key={item.customerId}>
            <td>{item.person?.name}</td>
            <td>{item.person?.address}</td>
            <td>{item.person?.phone}</td>
            <td>{item.password}</td>
            <td>{item.state ? 'True' : 'False'}</td>
            <td>
              <UpdateDelete
                entityUrl='customers'
                entityId={item.customerId!}
                remove={remove}
              />
            </td>
          </tr>
        ))}
    </>
  );
};

export default CustomerTableData;
