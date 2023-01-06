// Posible solucion al problema
export const sidebar = [
  
  {
    level: 1,
    routerLink: '/dashboard/main',
    icon: 'fa fa-home',
    name: 'Actividad',
    key: ''
  },
  
  // -------------------- Sucursales y inventarios ------------------------
  
  {
    level: 1,
    routerLink: '/dashboard/almacenes',
    icon: 'icon-pointer',
    name: 'Sucursales',
    key: 'admin-ware-house'
  },


  {
    level: 1,
    routerLink: '/dashboard/inventario',
    icon: 'ft-clipboard',
    name: 'Inventario',
    key: ''
  },
  
  // ---------------------- Actividades ----------------------------

  {
    level: 0,
    name: 'Actividades',
    key: 'admin-activities'
  },

  {
    level: 1,
    routerLink: '/dashboard/nuevo-ingreso',
    icon: 'ft-arrow-down',
    name: 'Produccion',
    key: 'admin-activities'
  },
  
  // Ventas
  {
    level: 1,
    routerLink: '/dashboard/historial-ventas',
    icon: 'ft-arrow-up',
    name: 'Ventas',
    key: 'admin-activities'
  },
  
  // -------------------- Clientes ----------------------------

  {
    level: 0,
    name: 'Clientes',
    key: 'admin-client'
  },

  {
    level: 1,
    routerLink: '/dashboard/clientes',
    icon: 'ft-user',
    name: 'Distribuidores',
    key: 'admin-client'
  },
  
  {
    level: 1,
    routerLink: '/dashboard/clientes-tiendas-licores',
    icon: 'ft-user',
    name: 'Mayoristas',
    key: 'admin-client'
  },

  // ---------------------- Usuarios ------------------------------

  {
    level: 0,
    name: 'Mochila',
    key: 'admin-backpack'
  },

  {
    level: 1,
    routerLink: '/dashboard/usuario-ejecutivos',
    icon: 'ft-user',
    name: 'Ejecutivos',
    key: 'admin-backpack'
  },
  
  // --------------------- Pedidos ---------------------------

  {
    level: 0,
    name: 'Otros',
    key: ''
  },

  {
    level: 1,
    routerLink: '/dashboard/pedidos',
    icon: 'ft-shopping-cart',
    name: 'Pedidos',
    key: 'admin-orders'
  },
  // ------------------ Otros --------------------------

  {
    level: 1,
    routerLink: '/public/maps',
    icon: 'ft-map-pin',
    name: 'Puntos de Ventas',
    key: 'admin-points-of-sale'
  },

  {
    level: 1,
    routerLink: '/dashboard/configuracion',
    icon: 'ft-settings',
    name: 'Configuraciones',
    key: ''
  },

];
