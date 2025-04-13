
// TProductSchema.

export type TProductSchema = {
  IRating: {
    rate: number;
    count: number;
  };

  IProductObject: {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    rating: TProductSchema['IRating'];
  };
  IProductResponse:TProductSchema['IProductObject'][];
  ICategoryListResponse:string[]
};
