import React, { useCallback, useState } from "react";

const voidFn = () => null;

export type UseDropzoneParams = {
  acceptedFileFormats: string[];
  onDrop?: (file: File) => void;
};

const useDropzone = ({ acceptedFileFormats, onDrop = voidFn }: UseDropzoneParams) => {
  const [isAppropriateFileOverDroppable, setIsAppropriateFileOverDroppable] = useState(false);
  const handleDragEnter = useCallback(
    (e: any) => {
      e.preventDefault();

      if (e.dataTransfer.items) {
        // Когда браузер поддерживает DataTransferItemList interface
        for (let i = 0; i < e.dataTransfer.items.length; ++i) {
          const file = e.dataTransfer.items[i];

          if (acceptedFileFormats.includes(file.type)) {
            setIsAppropriateFileOverDroppable(true);
            break;
          }
        }
      } else {
        // Когда браузер поддерживает DataTransfer interface
        for (let i = 0; i < e.dataTransfer.files.length; ++i) {
          const file = e.dataTransfer.files[i];

          if (acceptedFileFormats.includes(file.type)) {
            setIsAppropriateFileOverDroppable(true);
            break;
          }
        }
      }
    },
    [acceptedFileFormats]
  );
  const handleDragLeave = useCallback(() => {
    setIsAppropriateFileOverDroppable(false);
  }, []);
  const allowDrop = useCallback((e: any) => {
    e.preventDefault();
  }, []);
  const handleDrop = useCallback(
    (e: any) => {
      e.preventDefault();
      const dt = e.dataTransfer;

      if (!dt) {
        return;
      }

      // Когда браузер поддерживает DataTransferItemList interface
      if (dt?.items) {
        const items = [...dt?.items];
        for (let i = 0; i < items.length; ++i) {
          const file = items[i].getAsFile();

          if (acceptedFileFormats.includes(file.type)) {
            onDrop(file);
          }
        }
      } else {
        const files = [...dt?.files];
        // Когда браузер поддерживает DataTransfer interface
        for (let i = 0; i < files.length; ++i) {
          const file = files[i].getAsFile();

          if (acceptedFileFormats.includes(file.type)) {
            onDrop(file);
          }
        }
      }
    },
    [acceptedFileFormats, onDrop]
  );

  return {
    isAppropriateFileOverDroppable,
    dropzoneProps: {
      onDrop: handleDrop,
      onDragOver: allowDrop,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
    },
  };
};

export default useDropzone;
