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
  x: number
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

export interface TransactionType {
  amount: number
  createdAt: string
  id: string
  status: string
  task: {
    contactPhone: string
    createdAt: string
    deadline: string
    deliveryAddress: string
    deliveryTime: string
    description: string
    genderRequirement: string
    id: string
    needBuilding: boolean;
    pickupAddress: string
    pickupCode: string
    publisherId: string
    receiverId: null | string
    reward: number
    status: string
    title: string
    type: string
    updatedAt: string
    weight: string
  };
  taskId: string
  type: string
  user: {
    avatarUrl: string
    balance: number
    city: null | string
    country: null | string
    createdAt: string
    gender: null | number
    id: string
    nickName: string
    openid: string
    pendingIncome: 0;
    province: null;
    totalIncome: 0;
    unionid: null;
    updatedAt: string
    withdrawn: 0;
  };
  userId: string
}