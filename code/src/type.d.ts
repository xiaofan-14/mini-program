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

export interface TaskType {
  title: string,
  type: string,
  description: string,
  reward: number,
  pickupAddress: string,
  deliveryAddress: string,
  weight: string,
  deliveryTime: string,
  genderRequirement: string,
  needBuilding: boolean,
  pickupCode: string,
  contactPhone: string,
  deadline: string,
  createdAt: string,
  id: string,
  receiverId: string | null,
  status: string,
  updatedAt: string,
}

export interface AddressType {
  address: string,
  name: string,
  phone: string
}

export interface PakcageType {
  type: string,
  weight: string,
  deliveryTime: string,
  gender: string,
  needBuilding: boolean,
  notes: string,
  price: number,
  pickupCode: number
}