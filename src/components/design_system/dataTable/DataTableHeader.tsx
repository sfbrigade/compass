import { useEffect, useRef, useState, ChangeEvent, ReactNode } from "react";
import { Grid2 as Grid } from "@mui/material";

import Search from "@/components/design_system/search/Search";

import classes from "./DataTableHeader.module.css";

interface DataTableHeaderProps {
  title: string;
  searchValue: string;
  onChangeSearchValue?: (value: string) => void;
  children?: ReactNode;
}

function DataTableHeader({
  title,
  searchValue,
  onChangeSearchValue,
  children,
}: DataTableHeaderProps) {
  const [search, setSearch] = useState<string>();
  const timeoutRef = useRef<number>();

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  function onChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      onChangeSearchValue?.(event.target.value);
    }, 500);
  }

  return (
    <Grid
      container
      sx={{ justifyContent: "space-between", marginBottom: "2rem" }}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <h2>{title}</h2>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 6 }}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        {onChangeSearchValue && (
          <Search
            className={classes.search}
            value={search}
            onChange={onChangeSearch}
          />
        )}
        {children}
      </Grid>
    </Grid>
  );
}

export default DataTableHeader;
