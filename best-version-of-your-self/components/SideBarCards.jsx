import { Text } from "@mantine/core";
import Image from "next/image";
import "@mantine/core/styles.css";

const SideBarCards = ({ icon, title, desc, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`flex py-3 px-2 mb-1 shadow-md bg-gray-100 cursor-pointer ${
        isSelected
          ? "bg-primary-dark text-white"
          : "hover:bg-primary hover:text-white"
      }`}
    >
      <Image
        src={icon}
        alt={`${title} icon`}
        width={50}
        height={50}
        className="object-contain rounded-full h-12"
      />
      <div className="p-2 w-full">
        <p className="font-semibold text-lg">{title}</p>
        <span
          className={`text-sm ${
            isSelected ? "text-gray-200" : "text-gray-400"
          }`}
        >
          <Text lineClamp={1}>{desc}</Text>
        </span>
      </div>
    </div>
  );
};

export default SideBarCards;
