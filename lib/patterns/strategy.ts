// 상품 타입 정의
export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  createdAt: string;
}

// 정렬 전략 인터페이스
export interface SortStrategy {
  sort(products: Product[]): Product[];
  name: string;
}

// 가격 오름차순 정렬
export class PriceAscStrategy implements SortStrategy {
  name = "가격 낮은순";

  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
  }
}

// 가격 내림차순 정렬
export class PriceDescStrategy implements SortStrategy {
  name = "가격 높은순";

  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.price - a.price);
  }
}

// 평점 순 정렬
export class RatingStrategy implements SortStrategy {
  name = "평점순";

  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.rating - a.rating);
  }
}

// 최신순 정렬
export class DateStrategy implements SortStrategy {
  name = "최신순";

  sort(products: Product[]): Product[] {
    return [...products].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

// 상품 정렬기 클래스
export class ProductSorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  sort(products: Product[]): Product[] {
    return this.strategy.sort(products);
  }

  getCurrentStrategyName(): string {
    return this.strategy.name;
  }
}

// 샘플 데이터 생성 함수
export function generateSampleProducts(): Product[] {
  return [
    {
      id: 1,
      name: "노트북",
      price: 1200000,
      rating: 4.5,
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      name: "스마트폰",
      price: 800000,
      rating: 4.8,
      createdAt: "2024-03-20",
    },
    {
      id: 3,
      name: "이어폰",
      price: 300000,
      rating: 4.2,
      createdAt: "2024-03-10",
    },
    {
      id: 4,
      name: "키보드",
      price: 150000,
      rating: 4.7,
      createdAt: "2024-03-18",
    },
    {
      id: 5,
      name: "마우스",
      price: 80000,
      rating: 4.4,
      createdAt: "2024-03-12",
    },
    {
      id: 6,
      name: "모니터",
      price: 500000,
      rating: 4.6,
      createdAt: "2024-03-19",
    },
  ];
}
