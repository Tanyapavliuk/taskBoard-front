import React, { useEffect } from "react";

interface Props {
  className?: string;
  onClose: () => void;
  children: React.ReactNode | React.ReactElement;
  closeClassName?: string;
}

export const ModalWrapper: React.FC<Props> = ({
  className = "",
  onClose,
  children,
  closeClassName = "",
}) => {
  const closeModalOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  const hanldeClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "backdrop") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
    document.addEventListener("keydown", closeModalOnEscape);

    return () => {
      document.body.classList.remove("overflow-y-hidden");
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, []);
  return (
    <div
      id="backdrop"
      onClick={hanldeClickBackdrop}
      className="fixed inset-0 z-10 bg-slate-300/30 flex justify-center items-center"
    >
      <div
        className={`relative w-[35.375rem] h-min py-10 px-5 md:px-10 mx-3 lg:p-[64px] bg-black rounded-[30px] ${className}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 right-5 text-xl hover:scale-110 focus:scale-110 ${closeClassName}`}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
