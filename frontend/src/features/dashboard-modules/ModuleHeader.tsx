import { CardHeader, CardTitle } from "@/components/ui/card";
// import { infoIcon } from "../../assets/assets-path";

interface ModuleHeaderProps {
  title: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title }) => {
  return (
    <CardHeader className="p-4">
      <div className="flex justify-center items-center gap-2">
        <CardTitle className="font-thin text-center">{title}</CardTitle>
        {/* <img className="w-4 h-4 cursor-pointer" src={infoIcon} alt="" /> */}
      </div>
    </CardHeader>
  );
};

export default ModuleHeader;
