import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProFormTextArea, ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Dropdown, Form, message, Space, Tag} from 'antd';
import {useRef, useState} from 'react';
import request from 'umi-request';
import {
  addUserUsingPost,
  deleteUserUsingPost,
  listUserByPageUsingPost,
  updateUserUsingPost
} from "../../services/apis/userController";
import {
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {deletePostUsingPost, listPostVoByPageUsingPost, updatePostUsingPost} from "@/services/apis/postController";
import {Link} from "@@/exports";

const AdminPostPage = () => {
  const actionRef = useRef<ActionType>();

  const onDelete = async (id) => {
    const res = await deletePostUsingPost({id});
    if (res?.code === 0) {
      await actionRef.current.reload();
      message.success("删除成功");
    } else {
      message.error("删除失败");
    }
  }

  // {
  //   "thumbNum": 0,
  //   "userId": "1763932296236265473",
  // }

  const columns: ProColumns<API.PostVO>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 50
    },
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      // copyable: true,
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      ellipsis: true,
      // hideInSearch: true,
      render: (_, item) => {
        if (!item?.tags) {
          return <></>
        }
        return (
          item?.tags.map((item, index) => {
            return <Tag key={index} color={'blue'}>{item}</Tag>
          })
        )
      },
    },
    {
      title: '用户名称',
      copyable: true,
      ellipsis: true,
      tooltip: '简介过长会自动收缩',
      hideInSearch: true,
      render: (_, item) => {
        return <Link to={`/user/info/${item?.user?.id}`}>{item?.user?.userName}</Link>
      }
    },
    {
      title: '点赞数',
      dataIndex: 'thumbNum',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      valueType: "option",
      render: (_, item) => {
        return (
          <Space>
            <Button type={"link"} onClick={
              () => {
                onDelete(item?.id);
              }
            }>删除</Button>
            <ModalForm
              title="新建表单"
              trigger={
                <Button type="link">
                  更新
                </Button>
              }
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                const res = await updatePostUsingPost({...values, id: item?.id});
                if (res?.code === 0) {
                  await actionRef.current.reload();
                  message.success("更新成功");
                } else {
                  message.error("更新失败");
                }
              }}
              width={800}
            >
              <ProFormText
                name="title"
                // disabled
                label="标题"
                initialValue={item?.title}
                placeholder={"请输入标题"}
              />
              <ProFormTextArea
                // width="xs"
                name="content"
                // disabled
                label="内容"
                initialValue={item?.content}
                placeholder={"请输入内容"}
              />
            </ModalForm>
          </Space>
        )
      }
    }
  ];

  return (
    <div>
      <ProTable<API.UserVO>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const res = await listPostVoByPageUsingPost({...params});
          if (res?.code === 0) {
            return {
              data: res?.data?.records,
              success: true,
              current: res?.data?.current,
              pageSize: res?.data?.size,
              total: res?.data?.total
            }
          } else {
            message.error("请求失败");
          }
          return {
            data: [],
            success: false,
          };
        }}
        columnsState={{
          persistenceKey: 'user',
          persistenceType: 'localStorage',
          defaultValue: {
            option: {fixed: 'right', disable: true},
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{showSizeChanger: true}}
        dateFormatter="string"
        toolBarRender={() => [
          <ModalForm
            trigger={
              <Button type="primary">
                <PlusOutlined/>
                新建
              </Button>
            }
            autoFocusFirstInput
            modalProps={{
              destroyOnClose: true,
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
              const res = await addUserUsingPost(values);
              if (res?.code === 0) {
                await actionRef.current.reload();
                message.success("提交成功");
              } else {
                message.error("提交失败")
              }
            }}
            width={800}
          >
            <ProFormText
              name="userName"
              // disabled
              label="用户名"
              placeholder={"请输入用户名称"}
            />
            <ProFormText
              // width="xs"
              name="userAccount"
              // disabled
              label="用户账号"
              placeholder={"请输入用户账号"}
            />
          </ModalForm>
        ]}
      />
    </div>
  )
};

export default AdminPostPage;
