import {CheckOutlined} from "@ant-design/icons";

export default [
  {
    path: '/',
    name: "首页",
  },
  {
    path: "/admin",
    access: "canAdmin",
    name: "管理",
    children: [
      {
        name: '用户管理',
        path: '/admin/user',
      },
      {
        name: '帖子管理',
        path: '/admin/post',
      },
    ]
  }
]
