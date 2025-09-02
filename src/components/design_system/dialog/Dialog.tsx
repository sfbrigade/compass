import { ReactNode } from "react";
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@/components/design_system/button/Button";

interface DialogProps {
  cancelLabel?: string;
  children: ReactNode;
  confirmLabel?: string;
  open: boolean;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  title: ReactNode;
}

function Dialog({
  cancelLabel,
  children,
  confirmLabel,
  open,
  size = "sm",
  title,
}: DialogProps) {
  return (
    <MuiDialog open={open} fullWidth maxWidth={size}>
      <DialogTitle align="center" variant="h3">
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {cancelLabel && <Button variant="secondary">{cancelLabel}</Button>}
        {confirmLabel && <Button variant="primary">{confirmLabel}</Button>}
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
