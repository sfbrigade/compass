import { TextField } from "@mui/material";
import { Dropdown } from "@/components/design_system/dropdown/Dropdown";
import { ColumnDefinition, UserBase, SelectOption } from "./types";

export function renderTableInput<T extends UserBase>(
  column: ColumnDefinition<T>,
  value: T[keyof T] | undefined,
  onChange: (value: T[keyof T]) => void
): React.ReactNode {
  switch (column.type) {
    case "text":
      return (
        <TextField
          size="small"
          label={column.label}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value as T[keyof T])}
        />
      );
    case "number":
      return (
        <TextField
          size="small"
          type="number"
          label={column.label}
          value={(value as number) || ""}
          onChange={(e) => onChange(Number(e.target.value) as T[keyof T])}
        />
      );
    case "select":
      return (
        <Dropdown
          itemList={column.options as SelectOption[]}
          selectedOption={(value as string) || ""}
          setSelectedOption={(newValue) => onChange(newValue as T[keyof T])}
          label={column.label}
        />
      );
    default:
      return String(value || "");
  }
}

export function renderTableCell<T extends UserBase>(
  column: ColumnDefinition<T>,
  value: T[keyof T]
): React.ReactNode {
  if (column.customRender) {
    return column.customRender(value);
  }

  switch (column.type) {
    case "select":
      return (
        column.options?.find((opt) => opt.value === value)?.label ||
        String(value)
      );
    case "date":
      return value instanceof Date ? value.toLocaleDateString() : String(value);
    default:
      return String(value || "");
  }
}
