import { trpc } from "@/client/lib/trpc";
import { IconButton, Skeleton } from "@mui/material";
import { useEffect } from "react";
import styles from "./uploaded-file.module.css";
import { QuestionMark } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

interface UploadedFileProps {
  fileId: string;
  onDelete?: () => void;
}

export const UploadedFile = ({ fileId, onDelete }: UploadedFileProps) => {
  const { data, mutate } =
    trpc.file.getPresignedUrlForFileDownload.useMutation();

  useEffect(() => {
    mutate({ file_id: fileId });
  }, [mutate, fileId]);

  return (
    <div className={styles.container}>
      {data ? (
        <>
          {data.content_type.startsWith("image/") ? (
            <img src={data.url} className={styles.image} />
          ) : (
            <div className={styles.notImage}>
              <QuestionMark />
            </div>
          )}

          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className={styles.name}
          >
            {data.name}
          </a>

          {onDelete && (
            <IconButton color="error" aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            width="6rem"
            height="6rem"
            style={{ flexShrink: 0 }}
          />
          <Skeleton variant="text" width="20em" height="2rem" />
        </>
      )}
    </div>
  );
};
