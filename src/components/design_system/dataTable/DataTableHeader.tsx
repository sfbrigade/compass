import { useEffect, useRef, useState, ChangeEvent, ReactNode } from "react";
import { Grid as Grid, Stack, Typography } from "@mui/material";

import Search from "@/components/design_system/search/Search";

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
      sx={{
        justifyContent: "space-between",
        marginBottom: { xs: "1rem", sm: "2rem" },
      }}
    >
      <Grid width={{ xs: "100%", sm: "auto" }} order={{ xs: 2, sm: 1 }}>
        <Typography variant="h2">{title}</Typography>
      </Grid>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        order={{ xs: 1, sm: 2 }}
        alignItems={{ xs: "flex-end", sm: "center" }}
        width={{ xs: "100%", sm: "auto" }}
      >
        {onChangeSearchValue && (
          <Search
            sx={{
              marginBottom: { xs: "1rem", sm: "0" },
              minWidth: "20rem",
              width: { xs: "100%", sm: "auto" },
            }}
            value={search}
            onChange={onChangeSearch}
          />
        )}
        {children}
      </Stack>
    </Grid>
  );
}

export default DataTableHeader;
