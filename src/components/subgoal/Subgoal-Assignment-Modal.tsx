import { trpc } from "@/client/lib/trpc";
import {
  Box,
  Dialog,
  DialogTitle,
  Alert,
  AlertTitle,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

interface SubgoalAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  subgoal_id: string;
}

export const SubgoalAssignmentModal = (props: SubgoalAssignmentModalProps) => {
  const [selectedParaIds, setSelectedParaIds] = useState<string[]>([]);
  const myParasQuery = trpc.case_manager.getMyParas.useQuery();
  const { data: subgoal } = trpc.iep.getSubgoal.useQuery({
    subgoal_id: props.subgoal_id,
  });

  const handleParaToggle = (paraId: string) => () => {
    setSelectedParaIds((prev) => {
      if (prev.includes(paraId)) {
        return prev.filter((id) => id !== paraId);
      } else {
        return [...prev, paraId];
      }
    });
  };

  //onClose, keep data in state? or have notification to verify navigation away from page.
  const handleClose = () => {
    props.onClose();
    setSelectedParaIds([]);
  };

  return (
    <Dialog open={props.isOpen} onClose={handleClose}>
      <DialogTitle>Assign to benchmark</DialogTitle>

      <Box sx={{ px: 2, pb: 2 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Benchmark</AlertTitle>
          {/* could not determine a way to do this without mapping since it despised the subgoal[0] options */}
          {subgoal?.map((datapoint) => datapoint.description)}
        </Alert>
        Select one or more paras:
        <Box
          sx={{
            my: 2,
            maxHeight: "10rem",
            overflow: "scroll",
            border: "1px solid #d6dde1",
            borderRadius: 1,
          }}
        >
          <List sx={{ p: 0 }}>
            {myParasQuery.data?.map((para) => (
              <ListItem key={para.para_id} sx={{ px: 0, py: 0 }}>
                <ListItemButton dense onClick={handleParaToggle(para.para_id)}>
                  <ListItemIcon sx={{ minWidth: "auto" }}>
                    <Checkbox
                      edge="start"
                      disableRipple
                      tabIndex={-1}
                      checked={selectedParaIds.includes(para.para_id)}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    {para.first_name} {para.last_name}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained" onClick={handleClose}>
            Next
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};