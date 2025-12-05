import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement, ReactElement, SVGProps } from "react";

import { ButtonProps } from "./ui/button";

type PlaceholderProps = {
  label: string;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
  button?: ReactElement<ButtonProps>;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center gap-y-2">
      {cloneElement(icon, { className: "w-16 h-16" })}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, { className: "h-10" })}
    </div>
  );
};

export { Placeholder };
