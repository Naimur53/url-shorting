import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GradientUi = () => {
  const location = useLocation();
  const [i, setI] = useState(3);
  const position = [
    {
      style1: "bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2",
      style2: "left-0 -translate-x-1/2",
      style3: "right-0",
    },
    {
      style1: "bottom-full  left-1/2 translate-y-1/2 -translate-x-1/2",
      style2: "left-full -translate-x-1/2 ",
      style3: "right-full bottom-0 translate-x-1/2",
    },
    {
      style1: "bottom-1/2  left-1/2 translate-y-full -translate-x-full",
      style2: "left-full -translate-x-1/2 translate-y-1/2",
      style3: "right-full bottom-0 translate-x-1/2 -translate-y-1/2",
    },
    {
      style1: "bottom-0  left-1/2 translate-y-full -translate-x-full",
      style2: "left-1/2 -translate-x-1/2 translate-y-1/2",
      style3: "right-1/2 bottom-0 translate-x-1/2 translate-y-1/2",
    },
  ];
  useEffect(() => {
    if (location.pathname === "/my-urls") {
      setI(1);
    } else if (location.pathname === "/edit-urls") {
      setI(2);
    } else {
      setI(0);
    }
  }, [location.pathname]);
  return (
    <div className="absolute gradient-ui-wrap inset-0 overflow-hidden">
      <div
        className={`bg-blue-900  transition-all duration-1000 w-[500px] h-[500px]   ${position[i].style1}`}
      ></div>
      <div
        className={`bg-yellow-300/70 w-[600px]  transition-all duration-1000 h-[600px]  ${position[i].style2}`}
      ></div>
      <div
        className={`bg-pink-900/70 w-[500px] h-[500px]   transition-all duration-1000 ${position[i].style3}`}
      ></div>
    </div>
  );
};

export default GradientUi;
