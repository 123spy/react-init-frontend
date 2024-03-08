export default [
  {
    path: "/",
    layout: false,
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', name: '欢迎', icon: 'smile', component: './Welcome' },
      {
        path: '/user',
        name: '用户',
        routes: [
          { name: '用户信息', path: '/user/info/:id', component: '@/pages/User/UserInfoPage' },
          { name: '用户设置', path: '/user/settings', component: '@/pages/User/UserSettingsPage' },
        ]
      }
    ]
  },
  {
    path: "/",
    layout: false,
    component: '@/layouts/AdminLayout',
    routes: [
      { path: '/admin', name: '欢迎', icon: 'smile', component: './Welcome' },
      { path: '/admin/user',name: '欢迎', icon: 'smile', component: '@/pages/Admin/AdminUserPage' },
      { path: '/admin/post',name: '欢迎', icon: 'smile', component: '@/pages/Admin/AdminPostPage' },
    ]
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: '@/pages/User/UserLoginPage' },
      { name: '注册', path: '/user/register', component: '@/pages/User/UserRegisterPage' }
    ],
  },
  { path: '*', layout: false, component: './404' },
];
