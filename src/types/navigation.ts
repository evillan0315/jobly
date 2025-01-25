export interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

export interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}
