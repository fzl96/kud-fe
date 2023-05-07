export const translate = (route: string) => {
  switch (route) {
    case 'dashboard':
      return 'dashboard';
    case 'customers':
      return 'pelanggan';
    case 'categories':
      return 'kategori';
    case 'roles':
      return 'roles';
    case 'suppliers':
      return 'supplier';
    case 'products':
      return 'produk';
    case 'purchases':
      return 'pembelian';
    case 'sales':
      return 'penjualan';
    case 'users':
      return 'user';
    case 'cashier':
      return 'kasir';
    default:
      return route;
  } 
}