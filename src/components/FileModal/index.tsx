"use client";

import { useState } from "react";
import ErrorModal from "./ErrorModal";
import UploadModal from "./UploadModal";

interface FileModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileModal = ({ setModalOpen }: FileModalProps) => {
  const [isError, setIsError] = useState(false);

  return isError ? (
    <ErrorModal setIsError={setIsError} />
  ) : (
    <UploadModal setModalOpen={setModalOpen} setIsError={setIsError} />
  );
};

export default FileModal;
