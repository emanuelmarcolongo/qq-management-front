import {
  Tags,
  User,
  Package,
  ArrowRightLeft,
  GripHorizontal,
} from "lucide-react";

const navigation = [
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

export default navigation;
