export type ColumnType = "text" | "number" | "select" | "date";

export interface BaseEntity {
  id?: string | number;
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: string | number | Date | undefined;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ColumnDefinition<T extends BaseEntity> {
  id: keyof T;
  label: string;
  type: ColumnType;
  options?: SelectOption[];
  validation?: (value: T[keyof T]) => boolean;
  customRender?: (value: T[keyof T]) => React.ReactNode;
}

export interface TableProps<T extends BaseEntity> {
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
