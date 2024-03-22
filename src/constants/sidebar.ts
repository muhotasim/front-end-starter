import { MenuItem } from "../components/sidebar";

export const sidebarConst:MenuItem[] = [
    { 
        label: 'Dashboard',
        link: '/',
        childrens: [],
        permissionKey: 'can-see-dashboard',
        iconClass: 'fa fa-gauge-high'
    },
    { 
        label: 'Access Management',
        link: '',
        permissionKey: 'can-control-access',
        iconClass: 'fa fa-users-gear',
        childrens: [
            { 
                label: 'User',
                link: '/users',
                childrens: [],
                permissionKey: 'can-get-users-with-count',
                iconClass: 'fa fa-user-group'
            },
            { 
                label: 'Roles',
                link: '/roles',
                childrens: [],
                permissionKey: 'can-get-roles-with-count',
                iconClass: 'fa fa-users'
            },
            { 
                label: 'Permissions',
                link: '/permissions',
                permissionKey: 'can-get-permission-with-count',
                childrens: [],
                iconClass: 'fa fa-key',
                
            },
        ]
    }
];
