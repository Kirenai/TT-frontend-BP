import { ReportModel } from '../../../models/movement.model';

interface ReportTableDataProps {
  items: ReportModel[];
  filter: string;
}

const ReportTableData = ({ items, filter }: ReportTableDataProps) => {
  return (
    <>
      {items
        .filter(f => f.date.includes(filter) || filter === '')
        .map(item => (
          <tr key={item.date}>
            <td>{item.date}</td>
            <td>{item.client}</td>
            <td>{item.accountNumber}</td>
            <td>{item.type}</td>
            <td>{item.initialBalance}</td>
            <td>{item.state ? 'True' : 'False'}</td>
            <td>{item.movement}</td>
            <td>{item.balance}</td>
          </tr>
        ))}
    </>
  );
};

export default ReportTableData;
