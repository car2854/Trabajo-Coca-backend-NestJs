export const permissions = [
  {
    title: 'Admin',
    groupPermissions: [
      {
        id: 'admin',
        name: 'Administrador',
        status: false
      }
    ]
  },
  {
    title: 'Permisos',
    groupPermissions: [
      {
        id: 'admin-ware-house',
        name: 'Administrar sucursales',
        status: false
      },
      {
        id: 'admin-activities',
        name: 'Administrar produccion y ventas',
        status: false
      },
      {
        id: 'admin-client',
        name: 'Administrar clientes',
        status: false
      },
      {
        id: 'admin-backpack',
        name: 'Administrar mochilas',
        status: false
      },
      {
        id: 'admin-orders',
        name: 'Administrar pedidos',
        status: false
      },
      {
        id: 'admin-points-of-sale',
        name: 'Administrar puntos de ventas',
        status: false
      },
      {
        id: 'admin-user',
        name: 'Administrar usuarios',
        status: false
      },
    ]
  },
  {
    title: 'Movil',
    groupPermissions: [
      {
        id: 'userMobilePromotores',
        name: 'Promotores',
        status: false
      },
      {
        id: 'userMobileEfecutivo',
        name: 'Ejecutivo de venta',
        status: false
      },
    ]
  }
]