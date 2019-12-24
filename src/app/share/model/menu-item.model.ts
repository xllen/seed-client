export class MenuItemModel {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  visible: boolean;
  hasChildren: boolean;
  children: MenuItemModel[];
}
