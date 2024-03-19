import React from "react";
import { useClipboard } from "use-clipboard-copy";

import CopyIcon from "../icons/CopyIcon";
import TrashIcon from "../icons/TrashIcon";
import { useDeleteBoardMutation, useGetBoardByIdQuery } from "../redux/api";

interface Props {
  id: string;
  onDeleteBoard: () => void;
  onShowModalUpdate:()=>void;
}

export const BoadrInfo: React.FC<Props> = ({ id, onDeleteBoard, onShowModalUpdate }) => {
  const { data } = useGetBoardByIdQuery(id);
  const [deleteBoardMutation] = useDeleteBoardMutation();
  const clipboard = useClipboard();

  const handleDeleteBoard = async () => {
    const result = await deleteBoardMutation(id);
    if (result) {
      onDeleteBoard();
    }
  };
  return (
    <>
      {data && (
        <div className="container rounded-xl mt-4 py-3 px-5 border-2 border-rose-500 flex justify-between gap-5">
          <div>
            <p className="text-lg font-bold text-nowrap flex items-center gap-2">
              Board ID -
              <span className="underline underline-offset-8 hover:decoration-rose-800 select-all">
                {id}
              </span>
              <span onClick={() => clipboard.copy(id)} className="stroke-gray-500 hover:stroke-rose-500 align-middle inline-block cursor-pointer"><CopyIcon/></span>
            </p>
            <p>{data.name}</p>
            <p>{data.description}</p>
            <p>Amount tasks on the board - {data.tasks?.length}</p>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div
              onClick={handleDeleteBoard}
              className="stroke-gray-500 hover:stroke-rose-500 w-6 h-6 cursor-pointer"
            >
              <TrashIcon />
            </div>
            <div onClick={onShowModalUpdate} className="py-1 px-3 border-2 border-gray-500 text-nowrap rounded-full cursor-pointer hover:bg-rose-500 focus:bg-rose-500 hover:border-rose-500 hover:shadow-lg hover:shadow-rose-800">Update Board</div>
          </div>
        </div>
      )}
    </>
  );
};
