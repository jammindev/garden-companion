import { AreaInterface } from "@/interfaces/interfaces";
import { useState } from "react";

type UseModalReturnType = [boolean, (area: AreaInterface) => void, () => void, AreaInterface | undefined];

const useModal = (): UseModalReturnType => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [area, setArea] = useState<AreaInterface>();

  const openModal = (area: AreaInterface) => {
    setIsModalOpen(true);
    setArea(area);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return [isModalOpen, openModal, closeModal, area];
};

export default useModal;
