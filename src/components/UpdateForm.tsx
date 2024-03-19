import React from "react";

import { useUpdateBoardMutation } from "../redux/api";
import { Button } from "./base/Button";
import { Input } from "./base/Input";

interface Props {
  id: string;
  onClose: () => void;
//   onUpdateBoard: (id: string) => void;
}

interface IFormData {
  name: string;
  description: string;
}

export const UpdateBoard: React.FC<Props> = ({ id, onClose }) => {
  const [formData, setFormData] = React.useState<IFormData>({
    name: "",
    description: "",
  });

  const [updateBoardMutation] = useUpdateBoardMutation();

  const handleSendForm = async () => {
    const result = await updateBoardMutation({ id, body: formData });
    console.log(result)
    if ("data" in result) {
      onClose();
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
      <Button onClick={handleSendForm}>Update board</Button>
    </div>
  );
};
