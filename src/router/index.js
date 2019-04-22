import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },

  {
    path: '/archive',
    component: Layout,
    redirect: '/archive/villagerTable',
    name: 'Archive',
    meta: { title: '档案管理', icon: 'example' },
    children: [
      {
        path: 'townTable',
        name: 'TownTable',
        component: () => import('@/views/town_table/index'),
        meta: { title: '乡镇信息', icon: 'table' }
      },
      {
        path: 'villageTable',
        name: 'VillageTable',
        component: () => import('@/views/village_table/index'),
        meta: { title: '村信息', icon: 'table' }
      },

      {
        path: 'villagerGroupTable',
        name: 'VillagerGroupTable',
        component: () => import('@/views/villager_group_table/index'),
        meta: { title: '村民小组信息', icon: 'table' }
      },
      {
        path: 'nonOperatingAssetsTable',
        name: 'NonOperatingAssetsTable',
        component: () => import('@/views/non_operating_assets_table/index'),
        meta: { title: '非经营性资产信息', icon: 'table' }
      },

      {
        path: 'villagerTable',
        name: 'VillagerTable',
        component: () => import('@/views/villager_table/index'),
        meta: { title: '村民信息', icon: 'table' }
      },
      {
        path: 'familyTable',
        name: 'FamilyTable',
        component: () => import('@/views/family_table/index'),
        meta: { title: '家庭信息', icon: 'table' }
      },

      {
        path: 'departmentTable',
        name: 'DepartmentTable',
        component: () => import('@/views/department_table/index'),
        meta: { title: '组织机构信息', icon: 'table' }
      },
      {
        path: 'memberTable',
        name: 'MemberTable',
        component: () => import('@/views/member_table/index'),
        meta: { title: '人员信息', icon: 'table' }
      },

      {
        path: 'partyMemberTable',
        name: 'PartyMemberTable',
        component: () => import('@/views/party_member_table/index'),
        meta: { title: '党员信息', icon: 'table' }
      }
    ]
  },
  {
    path: '/basic',
    redirect: '/basic/adminlayout',
    name: 'Basic',
    component: Layout,
    meta: { title: '基本信息管理', icon: 'example' },
    children: [
      {
        path: 'adminLayout',
        name: 'AdminLayout',
        component: () => import('@/views/admin_layout/index'),
        meta: { title: '行政区划管理', icon: 'table' }
      },
      {
        path: 'dataDictionary',
        name: 'DataDictionary',
        component: () => import('@/views/data_dictionary/index'),
        redirect: '/basic/dataDictionary/dataCategroy',
        meta: { title: '数据字典管理', icon: 'form' },
        children: [
          {
            path: 'dataCategroy',
            name: 'DataCategroy',
            component: () => import('@/views/data_dictionary/data_categroy'),
            meta: { title: '数据类别管理', icon: 'form' }
          },
          {
            path: 'dataItem',
            name: 'DataItem',
            component: () => import('@/views/data_dictionary/data_item'),
            meta: { title: '数据项管理', icon: 'form' }
          }
        ]
      }
    ]
  },
  {
    path: '/system',
    redirect: '/system/userInfo',
    name: 'System',
    component: Layout,
    meta: { title: '系统管理', icon: '系统配置' },
    children: [
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: () => import('@/views/userinfo/index'),

        meta: { title: '密码管理', icon: '用户' }
      },
      {
        path: 'userTable',
        name: 'UserTable',
        component: () => import('@/views/user_table/index'),
        meta: { title: '用户管理', icon: '表格' }
      },
      {
        path: 'roleTable',
        name: 'RoleTable',
        component: () => import('@/views/role_table/index'),
        meta: { title: '角色管理', icon: '表格' }
      },
      {
        path: 'userRoleTable',
        name: 'UserRoleTable',
        component: () => import('@/views/user_role_table/index'),
        meta: { title: '用户角色管理', icon: '授权' }
      },
      {
        path: 'roleResourceTable',
        name: 'RoleResourceTable',
        component: () => import('@/views/role_resource_table/index'),
        meta: { title: '角色资源管理', icon: '授权' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://localhost:5543/swagger/index.html',
        meta: { title: 'API文档', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
