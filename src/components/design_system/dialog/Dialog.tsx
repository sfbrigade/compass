import { MouseEventHandler, ReactNode } from "react";
import {
  AppBar,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArrowBack } from "@mui/icons-material";
import Button from "@/components/design_system/button/Button";

interface DialogProps {
  cancelLabel?: string;
  children: ReactNode;
  confirmLabel?: string;
  fullScreenOnMobile: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  open: boolean;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  title: ReactNode;
}

function Dialog({
  cancelLabel,
  children,
  confirmLabel,
  fullScreenOnMobile = false,
  onCancel,
  onConfirm,
  open,
  size = "sm",
  title,
}: DialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MuiDialog
      open={open}
      fullScreen={fullScreenOnMobile && isMobile}
      fullWidth
      maxWidth={size}
    >
      {isMobile && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              onClick={(event) => onCancel?.(event)}
              color="inherit"
              sx={{ padding: "1.25rem" }}
            >
              <ArrowBack />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <DialogTitle
        align="center"
        variant="h3"
        sx={{ paddingTop: { xs: "5.5rem", sm: "1.5rem" } }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {cancelLabel && (
          <Button variant="secondary" onClick={(event) => onCancel?.(event)}>
            {cancelLabel}
          </Button>
        )}
        {confirmLabel && (
          <Button
            type="submit"
            variant="primary"
            onClick={(event) => onConfirm?.(event)}
          >
            {confirmLabel}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
