import { MenuItem } from "../components/sidebar";

export const sidebarConst:MenuItem[] = [
    { 
        label: 'Dashboard',
        link: '/',
        childrens: [],
        permissionKey: 'can-see-dashboard'
    },
    { 
        label: 'Access',
        link: '',
        permissionKey: 'can-control-access',
        childrens: [
            { 
                label: 'User',
                link: '/users',
                childrens: [],
                permissionKey: 'can-get-users-with-count'
            },
            { 
                label: 'Roles',
                link: '/roles',
                childrens: [],
                permissionKey: 'can-get-roles-with-count'
            },
            { 
                label: 'Permissions',
                link: '/permissions',
                permissionKey: 'can-get-permission-with-count',
                childrens: [],
                
            },
        ]
    },
];
