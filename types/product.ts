export interface ProductResponse {
  productList: Product[]
  totalProductsAmount: number
}

export interface ProductStat {
  quantityActive: number
  quantitySold: number
  quantityReturned: number
  returnedPercentage: number
  date: number
  createdAt: string
  purchasePrice: number
}

export interface GetProductParams {
  searchQuery: string
  filter: string
  sortBy: string
  order: string
  size: number
  page: number
}

export type SortType = 'descend' | 'ascend'

export interface Product {
  productId: number
  category: string
  rating: string
  status: ProductStatus
  moderationStatus: ModerationStatus
  commission: number
  commissionDto: {
    minCommission: number
    maxCommission: number
  }
  skuList: SkuList[]
  skuTitle: string
  image: string
  previewImg: string
  title: string
  quantityActive: number
  quantityFbs: number
  quantityAdditional: number
  quantityOnPhotoStudio: number
  quantityCreated: number
  quantitySold: number
  quantityReturned: number
  quantityMissing: number
  quantityDefected: number
  quantityPending: number
  returnedPercentage: number
  newYearStatus: {
    title: string
    color: string
    value: string
  }
  price: number
  clicks: number
  viewers: number
  conversion: number
  roi: string
  rankInfo: {
    rank: string
    rankValue: string
    dateUpdated: number
  }
  blockReason: any
  dateModerated: any
  volumeDiscount: any
}

export interface SkuList {
  skuTitle: string
  skuFullTitle: string
  productTitle: string
  skuId: number
  quantityCreated: number
  quantityActive: number
  quantityFbs: number
  quantityAdditional: number
  quantityOnPhotoStudio: number
  quantityArchived: number
  quantitySold: number
  quantityReturned: number
  quantityMissing: number
  quantityDefected: number
  quantityPending: number
  returnedPercentage: number
  barcode: number
  archived: boolean
  commission: number
  characteristics: string
  purchasePrice: number
  price: number
  blockingReason: string
  blocked: boolean
  rankInfo: {
    rank: string
    rankValue: string
    dateUpdated: number
  },
  article: any
}

export interface ProductStatus {
  id: number
  title: string
  value: string
  description: string
  color: string
  additional: []
}

interface ModerationStatus {
  title: string
  color: string
  value: string
}
