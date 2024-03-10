export const sidebarConst = [
    { 
        label: 'Dashboard',
        link: '/',
        childrens: []
    },
    { 
        label: 'Site Config',
        link: '/config',
        childrens: [
            { 
                label: 'Site Info',
                link: '/site-info',
                childrens: []
            },
            { 
                label: 'Role & Permissions',
                link: '/role-permissions',
                childrens: []
            },
            { 
                label: 'Menus',
                link: '/menus',
                childrens: []
            },
        ]
    },
];
