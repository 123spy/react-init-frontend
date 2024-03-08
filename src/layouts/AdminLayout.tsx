import {Outlet, useNavigate} from "@@/exports";
import {ProLayout} from "@ant-design/pro-layout";
import {history} from "umi";
import GlobalFooter from "@/components/GlobalFooter";
import {MenuDataItem} from "@umijs/route-utils";
import menu from "../../config/basicHeaderMenu";
import siderMenu from "../../config/adminSiderMenu";
import {Link, useAccess} from "@@/exports";
import {BellOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import GlobalAvatar from "@/components/GlobalAvatar";
import {APP_TITLE} from "@/constants/appConstant";
import {PageContainer} from "@ant-design/pro-components";
import {useModel} from "@umijs/max";

const menuDataRender = (menuList: MenuDataItem[], access: any) => {
  return menuList.filter((menuItem) => {
    return !menuItem.access || access[menuItem.access];
  });
};

const AdminLayout = () => {
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  if (!currentUser || !currentUser?.id || currentUser?.userRole !== 'admin') {
    window.location.href = '/404';
  }

  return (
    <div>
      <ProLayout
        layout={"mix"}
        title={APP_TITLE}
        logo={null}
        onMenuHeaderClick={() => {
          history.push("/");
        }}
        activeKey={window.location.href}
        {...siderMenu}
        menuItemRender={(item, dom) => {
          console.log(item.path);
          return (
            <div
              onClick={() => {
                history.push(item?.path);
              }}
            >
              {dom}
            </div>
          )
        }}
        pageTitleRender={false}
        footerRender={() => <GlobalFooter/>}
        avatarProps={{
          render: () => <GlobalAvatar></GlobalAvatar>
        }}
      >
        <PageContainer header={{
          title: null,
          breadcrumb: {},
        }}>
          <Outlet/>
        </PageContainer>
      </ProLayout>
    </div>
  )
}

export default AdminLayout;
