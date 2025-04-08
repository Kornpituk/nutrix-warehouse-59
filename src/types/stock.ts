
export interface StockItem {
  categoryId: string;
  categoryName: string;
  typeId: string;
  typeName: string;
  subTypeId: string;
  subTypeName: string;
  productId: string;
  barcode: string;
  productName: string;
  packagingTypeName: string;
  packagingTypeId: string;
  packKgs: number;
  totalKgs: number;
  brand: string;
  styleNo: string;
  colorId: string;
  color: string | null;
  sizeId: string;
  size: string | null;
  qty: number;
  unitId: string;
  unitName: string;
  image: string;
  nonTags: number;
  tags: number;
  lotNumber: string | null;
  locations: string | null;
}

export interface StockResponse {
  perPage: number;
  page: number;
  totalCount: number;
  totalPages: number;
  items: StockItem[] | null;
}
