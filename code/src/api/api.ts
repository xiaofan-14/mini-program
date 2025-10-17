import { get, post } from "../utils/https";
import type { TaskType } from 'src/type'

// 登录
export async function signin(code: string, userInfo: WechatMiniprogram.UserInfo) {
  return await post('auth/login', {
    code,
    nickName: userInfo.nickName,
    avatarUrl: userInfo.avatarUrl
  });
}
// 发布任务
export async function createTask(data: TaskType){
  return await post('task/publish', data)
}
// 获取任务列表 
export async function getTaskList() {
  return await get('task/list')
}
// 获取任务详情
export async function getTaskDetail(id: string) {
  return await get(`task/task-detail?id=${id}`)
}