// src/store/UserStore.ts
import { reactive } from 'vue';
import { IStore } from '../store';
/**
 * IUserState
 */
declare interface IUserState {
  /**
   * 令牌
   */
  token: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 用户id
   */
  id: number;
  /**
   * 用户性别
   */
  gender: number;
  /**
   * 用户头像
   */
  avatar: string;
}

// 使用Vue3提供的reactive方法，将一个普通对象包装成响应式的
const state: IUserState = reactive({
  token: '',
  username: '',
  nickname: '',
  id: 0,
  gender: 0,
  avatar: '/@/assets/images/avatar.png',
});
const store: IStore<IUserState> = {
  persistedState: true,
  state,
};
export { state, IUserState };
export default store;
