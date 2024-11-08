
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './CartContext';
import CartDrawer from './CartDrawer';
import SimpleBottomNavigation from './Bottombutton';
import Breadcrumb from './Breadcrumb';


const Layout = ({ children, userProfile, userId }) => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userId && userProfile?.displayName && (
              <p>いらっしゃいませ，{userProfile.displayName}</p>
            )}
          </Typography>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="subtitle1" align="right">
            合計:　 {total}　円
          </Typography>
        </Box>
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ paddingLeft: 2, marginTop: '8px' }}>
        <Breadcrumb />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, pb: '56px'}}>
        {children}
      </Box>

      <CartDrawer />
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
        <SimpleBottomNavigation />
      </Box>
    </Box>
  );
};

export default Layout;