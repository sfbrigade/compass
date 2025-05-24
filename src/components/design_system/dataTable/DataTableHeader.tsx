import { ReactNode } from "react";
import { Grid2 as Grid } from "@mui/material";

import Search from "@/components/design_system/search/Search";

interface DataTableHeaderProps {
  title: string;
  search: string;
  setSearch?: (value: string) => void;
  children?: ReactNode;
}

function DataTableHeader({
  title,
  search,
  setSearch,
  children,
}: DataTableHeaderProps) {
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
        {setSearch && (
          <Search
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        )}
        {children}
      </Grid>
    </Grid>
  );
}

export default DataTableHeader;
