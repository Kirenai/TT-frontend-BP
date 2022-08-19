import React from 'react';
import { Link } from 'react-router-dom';
import type { To } from 'react-router-dom';

interface AsideItemsProps {
  itemName: string;
  to: To;
}

const AsideItems = ({ itemName, to }: AsideItemsProps) => {
  return (
    <li className='aside-item'>
      <Link to={to}>{itemName}</Link>
    </li>
  );
};

export default AsideItems;
