import Link from 'next/link';

const Header = () => {
   return (
      <header>
         <nav className="flex gap-2">
            <Link href={'/'}>Home</Link>
            <Link href={'/players'}>Joueurs</Link>
         </nav>
      </header>
   );
};

export default Header;
