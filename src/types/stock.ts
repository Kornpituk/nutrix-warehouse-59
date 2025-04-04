
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
  locations: any | null;
}

export interface StockResponse {
  perPage: number;
  page: number;
  totalCount: number;
  totalPages: number;
  items: StockItem[];
}
