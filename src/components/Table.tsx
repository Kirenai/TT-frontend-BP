import React from 'react';

interface TableProps {
  headers: { name: string }[];
  children: JSX.Element;
}
const Table = ({ headers, children }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.name}>{header.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
