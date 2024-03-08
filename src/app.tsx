import {getLoginUserUsingGet} from "@/services/apis/userController";

const isDev = process.env.NODE_ENV === 'development';
import axios from '@/plugins/axios';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.UserVO;
}> {
  const res = await getLoginUserUsingGet();
  if(res.code === 0) {
    return {
      currentUser: res?.data
    }
  }
  return {
    currentUser : {},
  };
}
