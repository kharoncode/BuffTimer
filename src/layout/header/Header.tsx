import Link from 'next/link';

const Header = () => {
   return (
      <header>
         <Link href={'/'}>Home</Link>
         <Link href={'/players'}>Joueurs</Link>
      </header>
   );
};

export default Header;
