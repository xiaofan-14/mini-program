export interface UserInfo {
  id: string,
  openid: string,
  unionid: null | string,
  nickName: string,
  avatarUrl: string,
  gender: null | string,
  city: null | string,
  province: null | string,
  country: string,
  balance: number,
  totalIncome: number,
  pendingIncome: number,
  withdrawn: number,
  createdAt: string
  updatedAt: string
}