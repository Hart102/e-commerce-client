import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  columnReverse?: string;
};
function ContainerLG({ children, columnReverse }: ContainerProps) {
  return (
    <div
      className={`flex ${columnReverse} md:flex-row text-sm md:p-0 p-4 justify-center bg-white md:bg-transparent`}
    >
      {children}
    </div>
  );
}

function ContainerMD({ children }: ContainerProps) {
  return (
    <div className="w-full md:w-7/12 md- flex flex-col gap-8 md:bg-deep-gray-2001 md:p-10">
      {children}
    </div>
  );
}

function ContainerSM({ children }: ContainerProps) {
  return (
    <div className="flex flex-col gap-8 w-full md:w-4/12 md:py-10 md:px-12 py-10 px-5 bg-white">
      {children}
    </div>
  );
}

export { ContainerLG, ContainerMD, ContainerSM };
