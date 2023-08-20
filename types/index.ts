export interface Response<T> {
  status: boolean
  data: T
}

export interface UserInterface {
  id: string
  login: string,
  account: UzumAccount
}

export interface UserForm extends Omit<UserInterface, 'id'> {}

export interface UzumAccount {
  username: string,
  password: string
}

export interface OrderType {
  amount: number
  commission: number
  date: string
  profit: number
  quantity: number
  status: string
  withdraw: number
}

export interface PieData {
  PROCESSING: number
  CANCELED: number
  TO_WITHDRAW: number
}

export interface OrderStats {
  processing: OrderType[]
  withdraw: OrderType[]
  canceled: OrderType[]
  labels: string[]
  pie: PieData
}
