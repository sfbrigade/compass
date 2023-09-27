import { trpc } from "@/client/lib/trpc";

const FilesPage = () => {
  const { data: files, refetch } = trpc.file.getMyFiles.useQuery();
  const getPresignedUrlForFileDownload =
    trpc.file.getPresignedUrlForFileDownload.useMutation();
  const getPresignedUrlForUpload =
    trpc.file.getPresignedUrlForFileUpload.useMutation();
  const finishFileUpload = trpc.file.finishFileUpload.useMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fileInput = event.currentTarget.elements.namedItem(
      "file"
    ) as HTMLInputElement;
    if (!fileInput.files) return;

    const file = fileInput.files[0];

    const { key, url } = await getPresignedUrlForUpload.mutateAsync({
      type: file.type,
    });

    await fetch(url, {
      method: "PUT",
      body: file,
    });

    await finishFileUpload.mutateAsync({
      key,
      filename: file.name,
    });

    await refetch();
  };

  const handleDownload = async (file_id: string) => {
    const { url } = await getPresignedUrlForFileDownload.mutateAsync({
      file_id,
    });

    window.open(url, "_blank");
  };

  return (
    <div>
      <h1>Files</h1>

      <ul>
        {files?.map((file) => (
          <li key={file.file_id} onClick={() => handleDownload(file.file_id)}>
            {file.name}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default FilesPage;
