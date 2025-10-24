import { get, post, del } from "../utils/https";
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
export async function createTask(data: TaskType) {
  return await post('task/publish', data)
}
// 获取任务列表 
export async function getTaskList(page: number, pageSize: number) {
  return await get(`task/list?page=${page}&pageSize=${pageSize}`)
}
// 获取任务详情
export async function getTaskDetail(id: string) {
  return await get(`task/task-detail?id=${id}`)
}
// 获取我发布的列表
export async function getMyPublish(page: number, pageSize: number) {
  return await get(`task/my-publish?page=${page}&pageSize=${pageSize}`)
}
// 获取我领取的任务列表
export async function getMyReceived(page: number, pageSize: number) {
  return await get(`task/my-received?page=${page}&pageSize=${pageSize}`)
}
// 领取任务
export async function receiveTask(data: { taskId: string }) {
  return post('task/receive-task', data)
}
// 完成任务
export async function completeTask(data: { taskId: string }){
  return post('task/complete-task', data)
}
// 删除任务
export async function deleteTask(data: { taskId: string }){
  return del('task/delete-task', data)
}
// 取消任务
export async function cancelTask(data: { taskId: string }){
  return post('task/cancel-task', data)
}
// 获取收益列表
export async function getTransactions(){
  return get('transaction')
}
// 获取收益详情
export async function getTransactionDetail(id: string){
  return get(`transaction/detail?id=${id}`)
}

// 充值
export async function recharge(amount: number) {
  return await post("transaction/recharge", { amount });
}

// 提现
export async function withdraw(amount: number) {
  return await post("transaction/withdraw", { amount });
}

// 获取用户信息
export async function profile() {
  return await get('auth/profile')
}