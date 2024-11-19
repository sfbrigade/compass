import { Roles } from "@/types/auth";

export type ColumnType = "text" | "number" | "select" | "date";

export interface UserBase {
  id?: string | number;
  first_name: string;
  last_name: string;
  email: string;
  role: Roles;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ColumnDefinition<T extends UserBase> {
  id: keyof T;
  label: string;
  type: ColumnType;
  options?: SelectOption[];
  validation?: (value: T[keyof T]) => boolean;
  customRender?: (value: T[keyof T]) => React.ReactNode;
}

export interface TableProps<T extends UserBase> {
  data: T[];
  columns: ColumnDefinition<T>[];
  type: string;
  onRowClick?: (row: T) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  sortBy: keyof T;
  sortOrder: "asc" | "desc";
  onSort: (sortBy: keyof T, sortOrder: "asc" | "desc") => void;
  onSearch?: (search: string) => void;
  searchTerm?: string;
  onAdd?: (data: Omit<T, "id">) => Promise<void>;
  showAddRow?: boolean;
}
