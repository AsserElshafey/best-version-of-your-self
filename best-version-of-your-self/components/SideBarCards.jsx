import { Card, Text, Group, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import "@mantine/core/styles.css";

const SideBarCards = ({ icon, title, desc, onClick, isSelected }) => {
  const theme = useMantineTheme();

  return (
    <Card
      onClick={onClick}
      shadow="sm"
      padding="xs"
      radius="md"
      mb="xs"
      className={`cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-primary-dark"
          : "bg-gray-50 hover:bg-primary hover:opacity-90"
      }`}
      style={{
        borderLeft: isSelected ? `4px solid ${theme.colors.blue[7]}` : "none",
      }}
    >
      <Group noWrap spacing="xs" align="flex-start">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={40}
          height={40}
          className="object-contain rounded-full"
        />
        <div>
          <Text
            size="sm"
            weight={600}
            className={isSelected ? "text-white" : ""}
          >
            {title}
          </Text>
          <Text
            size="xs"
            lineClamp={1}
            className={isSelected ? "text-gray-200" : "text-gray-500"}
          >
            {desc}
          </Text>
        </div>
      </Group>
    </Card>
  );
};

export default SideBarCards;
