import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Input,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";

export type AssignmentDuration =
  | {
      type: "forever";
    }
  | {
      type: "minimum_number_of_collections";
      minimumNumberOfCollections: number;
    }
  | {
      type: "until_date";
      date: Date;
    };

interface DurationSelectionStepProps {
  disabled?: boolean;
  selectedDuration: AssignmentDuration;
  onDurationChange: (duration: AssignmentDuration) => void;
}

export const DurationSelectionStep = ({
  disabled,
  selectedDuration,
  onDurationChange,
}: DurationSelectionStepProps) => {
  const handleTypeChange = (
    event: SelectChangeEvent<AssignmentDuration["type"]>
  ) => {
    switch (event.target.value) {
      case "forever":
        onDurationChange({ type: "forever" });
        break;
      case "minimum_number_of_collections":
        onDurationChange({
          type: "minimum_number_of_collections",
          minimumNumberOfCollections: 1,
        });
        break;
      case "until_date":
        onDurationChange({ type: "until_date", date: new Date() });
        break;
      default:
        throw new Error("Invalid AssignmentDuration type");
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ my: 3 }} disabled={disabled}>
        <InputLabel id="para-assignment-ends-at">Ends at</InputLabel>
        <Select
          labelId="para-assignment-ends-at"
          label="Ends at"
          value={selectedDuration.type}
          onChange={handleTypeChange}
        >
          <MenuItem value={"forever"}>
            Never: The para will collected data until unassigned
          </MenuItem>
          <MenuItem value={"minimum_number_of_collections"}>
            Until a number of instances have been recorded
          </MenuItem>
          <MenuItem value={"until_date"}>
            Until a target date has been reached
          </MenuItem>
        </Select>
      </FormControl>

      {selectedDuration.type === "minimum_number_of_collections" && (
        <FormControl fullWidth disabled={disabled}>
          <InputLabel id="para-assignment-minimum-number-of-collections">
            How many times should [staff] collect data on this benchmark?
          </InputLabel>
          <Input
            type="number"
            value={selectedDuration.minimumNumberOfCollections}
            onChange={(e) =>
              onDurationChange({
                type: "minimum_number_of_collections",
                minimumNumberOfCollections: parseInt(e.target.value),
              })
            }
          />
        </FormControl>
      )}

      {selectedDuration.type === "until_date" && (
        <>
          <InputLabel>
            Until what date should [staff] collect data on this benchmark?
          </InputLabel>
          <StaticDatePicker
            defaultValue={selectedDuration.date}
            onChange={(e) =>
              e
                ? onDurationChange({
                    type: "until_date",
                    date: e,
                  })
                : undefined
            }
            slots={{ actionBar: () => null }}
            disabled={disabled}
          />
        </>
      )}
    </>
  );
};
