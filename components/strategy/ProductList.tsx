import { useState } from "react";
import {
  Product,
  ProductSorter,
  PriceAscStrategy,
  PriceDescStrategy,
  RatingStrategy,
  DateStrategy,
} from "@/lib/patterns/strategy";
import { StarIcon } from "@heroicons/react/24/solid";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  products: initialProducts,
}) => {
  const [sorter] = useState(() => new ProductSorter(new DateStrategy()));
  const [products, setProducts] = useState(initialProducts);

  const strategies = [
    new DateStrategy(),
    new PriceAscStrategy(),
    new PriceDescStrategy(),
    new RatingStrategy(),
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStrategyChange = (strategy: any) => {
    sorter.setStrategy(strategy);
    setProducts([...sorter.sort(products)]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">정렬:</span>
        {strategies.map((strategy) => (
          <button
            key={strategy.name}
            onClick={() => handleStrategyChange(strategy)}
            className="px-3 py-1 text-sm rounded-full border hover:bg-gray-50"
          >
            {strategy.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-6 space-y-4"
          >
            <h3 className="text-lg font-medium">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {product.price.toLocaleString()}원
              </span>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">
                  {product.rating}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              등록일: {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
