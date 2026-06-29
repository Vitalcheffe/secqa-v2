import { NavGroup } from '@/types';

/**
 * SecQA navigation configuration
 * Sidebar + Cmd+K bar
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Questionnaires',
        url: '/dashboard/product',
        icon: 'product',
        shortcut: ['q', 'q'],
        isActive: false,
        items: []
      },
      {
        title: 'Answer Library',
        url: '/dashboard/workspaces',
        icon: 'workspace',
        isActive: false,
        items: []
      },
      {
        title: 'Pipeline',
        url: '/dashboard/kanban',
        icon: 'dashboard',
        isActive: false,
        items: []
      },
      {
        title: 'Team',
        url: '/dashboard/users',
        icon: 'teams',
        shortcut: ['u', 'u'],
        isActive: false,
        items: [],
        access: { requireOrg: true }
      },
      {
        title: 'Support',
        url: '/dashboard/chat',
        icon: 'notification',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Tools',
    items: [
      {
        title: 'Upload Questionnaire',
        url: '/dashboard/forms/multi-step',
        icon: 'forms',
        shortcut: ['u', 'u'],
        isActive: false,
        items: []
      },
      {
        title: 'New Answer',
        url: '/dashboard/forms/basic',
        icon: 'forms',
        isActive: false,
        items: []
      },
      {
        title: 'Integrations',
        url: '/dashboard/forms/advanced',
        icon: 'forms',
        isActive: false,
        items: []
      },
      {
        title: 'Analytics',
        url: '/dashboard/analytics',
        icon: 'dashboard',
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Account',
    items: [
      {
        title: 'Account',
        url: '/dashboard/profile',
        icon: 'user',
        isActive: false,
        items: [
          {
            title: 'Profile',
            url: '/dashboard/profile',
            icon: 'user',
            isActive: false,
            items: []
          },
          {
            title: 'Notifications',
            url: '/dashboard/notifications',
            icon: 'notification',
            isActive: false,
            items: []
          },
          {
            title: 'Billing',
            url: '/dashboard/billing',
            icon: 'billing',
            isActive: false,
            items: []
          }
        ]
      }
    ]
  }
];
