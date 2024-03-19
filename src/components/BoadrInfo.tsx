import React from "react";

import TrashIcon from "../icons/TrashIcon";
import { useDeleteBoardMutation, useGetBoardByIdQuery } from "../redux/api";

interface Props {
  id: string;
  onDeleteBoard:()=>void;
}

export const BoadrInfo: React.FC<Props> = ({ id , onDeleteBoard}) => {
  const { data } = useGetBoardByIdQuery(id);
  const [deleteBoardMutation] = useDeleteBoardMutation()

  const handleDeleteBoard = async ()=>{
    const result =await deleteBoardMutation(id)
    if(result){
        onDeleteBoard()
    }
  }
  return (
    <>
      {data && (
        <div className="container rounded-xl mt-4 py-3 px-5 border-2 border-rose-500 flex justify-between">
          <div>
            <p className="text-lg font-bold">
              Board ID -
              <span className="underline underline-offset-8 hover:decoration-violet-400">
                {id}
              </span>
            </p>
            <p>{data.name}</p>
            <p>{data.description}</p>
            <p>Amount tasks on the board - {data.tasks?.length}</p>
          </div>
          <div onClick={handleDeleteBoard} className="stroke-gray-500 hover:stroke-white w-6 h-6">
            <TrashIcon />
          </div>
        </div>
      )}
    </>
  );
};
