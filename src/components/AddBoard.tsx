import React from "react";

import { useAddBoardMutation } from "../redux/api";
import { Button } from "./base/Button";
import { Input } from "./base/Input";
import { Loader } from "./base/Loader";

interface Props {
  onClose: () => void;
  onCreateBoard:(id: string) => void;
}

interface IFormData {
  name: string;
  description: string;
}

export const AddBoard: React.FC<Props> = ({ onCreateBoard,  onClose }) => {
  const [formData, setFormData] = React.useState<IFormData>({
    name: "",
    description: "",
  });

  const [createBoardList, { isLoading }] = useAddBoardMutation();

  const handleSendForm = async () => {
    const result = await createBoardList(formData);
    if ("data" in result) {
      onCreateBoard(result.data._id)
      onClose()
    } else {
      console.error("Error occurred:", result.error);
    }
  };

  const handleInput = (inputName: string, value: string) => {
    setFormData((state) => ({
      ...state,
      [inputName]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <Input
        name="name"
        value={formData.name}
        onInput={handleInput}
        placeholder="Name of the board"
      />
      <Input
        name="description"
        value={formData.description}
        onInput={handleInput}
        placeholder="Description of the board"
      />
      <Button onClick={handleSendForm}>Create board</Button>
    </div>
  );
};
