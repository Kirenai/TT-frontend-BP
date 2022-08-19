import UpdateDelete from '../../../components/UpdateDelete';
import { AccountModel } from '../../../models/account.mode';

interface AccountTableDataProps {
  items: AccountModel[];
  filter: string;
  remove: (id: number) => void;
}

const AccountTableData = ({ items, filter, remove }: AccountTableDataProps) => {
  return (
    <>
      {items
        .filter(f => f.accountNumber?.includes(filter) || f === '')
        .map(item => (
          <tr key={item.accountId}>
            <td>{item.accountNumber}</td>
            <td>{item.accountType}</td>
            <td>{item.initialBalance}</td>
            <td>{item.state ? 'True' : 'False'}</td>
            <td>{item.customer?.person?.name}</td>
            <td>
              <UpdateDelete
                entityUrl='accounts'
                entityId={item.accountId!}
                remove={remove}
              />
            </td>
          </tr>
        ))}
    </>
  );
};

export default AccountTableData;
