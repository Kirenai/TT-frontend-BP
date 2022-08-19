import { Link } from 'react-router-dom';

import '../assets/css/asidenav.css';
import AsideItems from './AsideItems';

const asideMock = [
  {
    itemName: 'Clientes',
    to: '/customers',
  },
  {
    itemName: 'Cuentas',
    to: '/accounts',
  },
  {
    itemName: 'Movimientos',
    to: '/movements',
  },
  {
    itemName: 'Reportes',
    to: '/reports',
  },
];

const AsideNav = () => {
  return (
    <aside className='aside-box'>
      <ul>
        {asideMock.map(aside => (
          <AsideItems
            key={aside.itemName}
            itemName={aside.itemName}
            to={aside.to}
          />
        ))}
      </ul>
    </aside>
  );
};

export default AsideNav;
