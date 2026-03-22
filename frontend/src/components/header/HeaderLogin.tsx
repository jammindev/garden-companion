import { useState } from "react";

import HeaderModal from "../../modal/HeaderModal";
import NavbarMobile from "../navbar/NavbarMobile";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalNavBarOpen, setIsModalNavBarOpen] = useState<boolean>(false);

  const closeModalNavBar = () => {
    setIsModalNavBarOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-white dark:bg-slate-800 ">
      <div className="  opacity-95 flex items-center  w-full border-b px-10 py-2">
        <div className="flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-thin ">
            Garden Companion <span className="text-sm lg:text-xl ">Beta</span>
          </h1>
        </div>
        <div className="flex gap-5 items-center"></div>
      </div>
      <HeaderModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={closeModal}
      />
      <NavbarMobile onClose={closeModalNavBar} isOpen={isModalNavBarOpen} />
    </div>
  );
};
export default Header;
