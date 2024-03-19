import { useState } from "react";

import { ModalWrapper } from "./base/Modal";
import { AddBoard } from "./AddBoard";
import { BoadrInfo } from "./BoadrInfo";
import KanbanBoard from "./KanbanBoard";
import { SearchBoard } from "./SearchBoard";
import { UpdateBoard } from "./UpdateForm";

function App() {
  const [currentBoardId, setCurrentBoardId] = useState<string>("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState<boolean>(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState<boolean>(false);

  const handleFindBoard = (value: string) => {
    if (!value) {
      setNotFound(true);
      setCurrentBoardId(value);
    }
    if (value) {
      setNotFound(false);
      setCurrentBoardId(value);
    }
  };

  return (
    <div className="py-5">
      <SearchBoard
        onFindBoard={handleFindBoard}
        onAddClick={() => {
          setCurrentBoardId(""), setIsShowModalAdd(true);
        }}
      />
      {currentBoardId && (
        <BoadrInfo
          id={currentBoardId}
          onDeleteBoard={() => handleFindBoard("")}
          onShowModalUpdate={()=>setIsShowModalUpdate(true)}
        />
      )}
      {currentBoardId && <KanbanBoard boardId={currentBoardId} />}
      {notFound && (
        <p className="py-5 text-center">There is no board with such an ID</p>
      )}
      {isShowModalAdd && (
        <ModalWrapper
          onClose={() => {
            setIsShowModalAdd(false);
          }}
        >
          <AddBoard
            onCreateBoard={handleFindBoard}
            onClose={() => {
              setIsShowModalAdd(false);
            }}
          />
        </ModalWrapper>
      )}
      {isShowModalUpdate && (
        <ModalWrapper
          onClose={() => {
            setIsShowModalAdd(false);
          }}
        >
          <UpdateBoard
            id={currentBoardId}
            onClose={() => {
              setIsShowModalUpdate(false);
            }}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
export default App;
