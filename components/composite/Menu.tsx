import { useState } from "react";
import { MenuComponent, MenuGroup } from "@/lib/patterns/composite";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface MenuItemProps {
  item: MenuComponent;
  level: number;
  onSelect: (paths: string[]) => void;
}

export const MenuItemComponent: React.FC<MenuItemProps> = ({
  item,
  level,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);

  const handleClick = () => {
    if (!item.isLeaf()) {
      setIsExpanded(!isExpanded);
    }
    onSelect(item.getPath());
  };

  const paddingLeft = `${level * 1.5}rem`;

  return (
    <div>
      <div
        className={`flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer ${
          item.isLeaf() ? "hover:text-blue-600" : ""
        }`}
        style={{ paddingLeft }}
        onClick={handleClick}
      >
        {!item.isLeaf() && (
          <span className="mx-2">
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </span>
        )}
        <span>{item.name}</span>
      </div>

      {!item.isLeaf() && isExpanded && (
        <div>
          {(item as MenuGroup).getChildren().map((child) => (
            <MenuItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
