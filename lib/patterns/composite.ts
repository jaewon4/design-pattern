// 메뉴 아이템 인터페이스
export interface MenuComponent {
  id: string;
  name: string;
  getPath(): string[];
  isLeaf(): boolean;
}

// 개별 메뉴 아이템 (Leaf)
export class MenuItem implements MenuComponent {
  constructor(
    public id: string,
    public name: string,
    public link: string,
    private parent?: MenuGroup
  ) {}

  getPath(): string[] {
    return this.parent ? [...this.parent.getPath(), this.name] : [this.name];
  }

  isLeaf(): boolean {
    return true;
  }
}

// 메뉴 그룹 (Composite)
export class MenuGroup implements MenuComponent {
  private children: MenuComponent[] = [];

  constructor(
    public id: string,
    public name: string,
    private parent?: MenuGroup
  ) {}

  addChild(child: MenuComponent): void {
    this.children.push(child);
  }

  removeChild(childId: string): void {
    this.children = this.children.filter((child) => child.id !== childId);
  }

  getChild(index: number): MenuComponent {
    return this.children[index];
  }

  getChildren(): MenuComponent[] {
    return this.children;
  }

  getPath(): string[] {
    return this.parent ? [...this.parent.getPath(), this.name] : [this.name];
  }

  isLeaf(): boolean {
    return false;
  }
}

// 메뉴 트리 생성 함수
export function createMenuTree(): MenuGroup {
  const root = new MenuGroup("root", "Root");

  // Products 메뉴
  const products = new MenuGroup("products", "Products", root);
  products.addChild(
    new MenuItem(
      "electronics",
      "Electronics",
      "/products/electronics",
      products
    )
  );
  const computers = new MenuGroup("computers", "Computers", products);
  computers.addChild(
    new MenuItem("laptops", "Laptops", "/products/computers/laptops", computers)
  );
  computers.addChild(
    new MenuItem(
      "desktops",
      "Desktops",
      "/products/computers/desktops",
      computers
    )
  );
  products.addChild(computers);
  products.addChild(
    new MenuItem("phones", "Phones", "/products/phones", products)
  );

  // Services 메뉴
  const services = new MenuGroup("services", "Services", root);
  services.addChild(
    new MenuItem("consulting", "Consulting", "/services/consulting", services)
  );
  services.addChild(
    new MenuItem("training", "Training", "/services/training", services)
  );

  // Support 메뉴
  const support = new MenuGroup("support", "Support", root);
  const helpdesk = new MenuGroup("helpdesk", "Helpdesk", support);
  helpdesk.addChild(
    new MenuItem("tickets", "Tickets", "/support/helpdesk/tickets", helpdesk)
  );
  helpdesk.addChild(
    new MenuItem("chat", "Live Chat", "/support/helpdesk/chat", helpdesk)
  );
  support.addChild(helpdesk);
  support.addChild(new MenuItem("faq", "FAQ", "/support/faq", support));

  root.addChild(products);
  root.addChild(services);
  root.addChild(support);

  return root;
}
