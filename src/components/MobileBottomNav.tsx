import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

const items = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/products', label: 'Shop', icon: ShoppingBag },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/account', label: 'Account', icon: User },
];

const MobileBottomNav: React.FC = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const { pathname } = useLocation();

  // Hide on checkout for a focused flow
  if (pathname.startsWith('/checkout')) return null;

  return (
    <nav
      aria-label="Primary mobile"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t shadow-[0_-2px_8px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon, exact }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={exact}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[11px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {label === 'Wishlist' && null}
              </div>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      {totalItems > 0 && (
        <NavLink
          to="/cart"
          className="absolute -top-3 right-3 bg-primary text-primary-foreground rounded-full text-xs font-bold h-7 min-w-7 px-2 flex items-center justify-center shadow-md"
          aria-label={`Cart with ${totalItems} items`}
        >
          {totalItems}
        </NavLink>
      )}
    </nav>
  );
};

export default MobileBottomNav;
