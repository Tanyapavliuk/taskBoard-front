import React from "react";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface Props {
  id: string;
  title:string;
}

export const SortableItem: React.FC<Props> = ({ id, title}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });


  return (
    <div ref={setNodeRef} className={` ${CSS.Transform.toString(transform)} ${transition}`} {...attributes} {...listeners}>
      <p>{title}</p>
    </div>
  );
};
