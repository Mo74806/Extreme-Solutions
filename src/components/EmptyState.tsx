import React from "react";
import { Button } from "./ui/button";

const EmptyState = ({
  title,
  subTitle,
  button,
  buttonText,
  buttonHandler,
}: {
  title: string;
  subTitle?: string;
  button?: boolean;
  buttonText?: string;
  buttonHandler?: () => void;
}) => {
  return (
    <div className="text-black mt-[20px] lg:mt-[200px] dark:text-white flex flex-col justify-center items-center mx-auto ">
      <img src="/assets/EmptySearch.svg" />
      <h1 className=" text-[24px] md:text-[32px] lg:text-[48px] font-extrabold ">
        {title}
      </h1>
      {subTitle && (
        <span className="text-[16px] md:text-[20px] lg:text-[24px] ">
          {subTitle}
        </span>
      )}
      {button && (
        <Button
          onClick={buttonHandler}
          variant="default"
          color="#b71824"
          className="button mt-3 text-white"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
