export interface Post {
  id: number;
  title: string;
  body: string;
}

// 실제 API 서비스 인터페이스
export interface DataService {
  getPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post>;
}

// 실제 API 서비스 구현
export class RealDataService implements DataService {
  async getPosts(): Promise<Post[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    // 데이터를 10개로 제한
    return data.slice(0, 10);
  }

  async getPost(id: number): Promise<Post> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return await response.json();
  }
}

// 프록시 서비스 구현
export class ProxyDataService implements DataService {
  private realService: RealDataService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: Map<string, { data: any; timestamp: number }>;
  private readonly CACHE_DURATION = 1000 * 60; // 1분 캐시

  constructor() {
    this.realService = new RealDataService();
    this.cache = new Map();
  }

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  async getPosts(): Promise<Post[]> {
    const cacheKey = "posts";

    if (this.isCacheValid(cacheKey)) {
      console.log("캐시된 데이터 반환");
      return this.cache.get(cacheKey)!.data;
    }

    console.log("새로운 데이터 요청");
    const posts = await this.realService.getPosts();
    this.cache.set(cacheKey, { data: posts, timestamp: Date.now() });
    return posts;
  }

  async getPost(id: number): Promise<Post> {
    const cacheKey = `post-${id}`;

    if (this.isCacheValid(cacheKey)) {
      console.log(`캐시된 포스트 ${id} 반환`);
      return this.cache.get(cacheKey)!.data;
    }

    console.log(`새로운 포스트 ${id} 요청`);
    const post = await this.realService.getPost(id);
    this.cache.set(cacheKey, { data: post, timestamp: Date.now() });
    return post;
  }

  clearCache(): void {
    this.cache.clear();
    console.log("캐시 초기화됨");
  }
}
