import {
  ArrowRightLeft,
  GripHorizontal,
  Package,
  Tags,
  User,
} from "lucide-react";

export const DashboardNavigation = [
  {
    name: "Usuários",
    href: "/dashboard/users",
    icon: User,
  },
  {
    name: "Perfis",
    href: "/dashboard/profiles",
    icon: Tags,
  },
  {
    name: "Módulos",
    href: "/dashboard/modules",
    icon: Package,
  },
  {
    name: "Transações",
    href: "/dashboard/transactions",
    icon: ArrowRightLeft,
  },
  {
    name: "Funções",
    href: "/dashboard/functions",
    icon: GripHorizontal,
  },
];

export const AppNavigation = [
  {
    name: "Início",
    href: "/app/home",
    icon: User,
  },
  {
    name: "Módulos",
    href: "/app/modules",
    icon: Package,
  },
];
