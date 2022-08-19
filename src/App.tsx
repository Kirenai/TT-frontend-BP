import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AsideNav from './components/AsideNav';
import Customer from './pages/Customer/Customer';
import Account from './pages/Account/Account';
import Movement from './pages/Movement/Movement';
import Report from './pages/Report/Report';
import CustomerFrom from './pages/Customer/components/CustomerForm';
import AccountForm from './pages/Account/components/AccountForm';
import MovementForm from './pages/Movement/components/MovementForm';

import './App.css';

const App = () => {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <div className='flex'>
          <AsideNav />
          <Routes>
            <Route path='/customers' element={<Customer />} />
            <Route path='/customers/create' element={<CustomerFrom />} />
            <Route
              path='/customers/update/:customerId'
              element={<CustomerFrom />}
            />

            <Route path='/accounts' element={<Account />} />
            <Route path='/accounts/create' element={<AccountForm />} />
            <Route
              path='/accounts/update/:accountId'
              element={<AccountForm />}
            />

            <Route path='/movements' element={<Movement />} />
            <Route path='/movements/create' element={<MovementForm />} />
            <Route
              path='/movements/update/:movementId'
              element={<MovementForm />}
            />

            <Route path='/reports' element={<Report />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
