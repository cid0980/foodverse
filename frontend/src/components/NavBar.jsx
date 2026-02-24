import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/restaurants', label: 'Home' },
  { to: '/orders', label: 'Orders' },
  { to: '/cart', label: 'Cart' },
  { to: '/profile', label: 'Profile' }
];

export default function NavBar() {
  return (
    <nav className="fixed bottom-6 left-0 right-0">
      <div className="mx-auto flex max-w-md items-center justify-around rounded-full border border-ink/10 bg-white/90 px-6 py-3 shadow-soft backdrop-blur">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 text-xs font-semibold ${
                isActive ? 'text-ink' : 'text-ink/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`h-1 w-6 rounded-full ${isActive ? 'bg-lime' : 'bg-transparent'}`} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
