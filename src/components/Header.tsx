import '../assets/css/header.css';

const Header = () => {
  return (
    <div>
      <header className='header'>
        <div className='img-box'>
          <img
            src='https://brandemia.org/sites/default/files/inline/images/logo_banco_pichincha_portada.jpg'
            alt='img'
            width={150}
            height={106}
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
