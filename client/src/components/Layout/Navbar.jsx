import { Menu, User, ShoppingCart, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/slices/popupSlice";

// const Navbar = () => {
//   return <></>;
// };

const Navbar = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  let cartItemsCount = 0;
  if (cart) {
    cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <nav className="fixed left-0 w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LEFT HAMBERGER MENU */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          {/* CENTER LOGO*/}
          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-bold text-primary">ShopMate</h1>
          </div>

          {/* RIGHT side  ICONS*/}
          <div className="flex items-center space-x-2">{/* THEME TOGGLE*/}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
