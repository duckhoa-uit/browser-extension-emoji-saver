import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";

interface CopyButtonProps {
  onClick?: () => void;
}

export const CopyButton = forwardRef(
  ({ onClick }: CopyButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (copied) setCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }, [copied]);

    return (
      <button
        ref={ref}
        onClick={() => {
          setCopied(true);
          onClick?.();
        }}
        className="hover:bg-[#303134] cursor-pointer rounded-lg appearance-none p-2 border-0 outline-0 cursor-pointer"
      >
        <div className="relative w-4 h-4">
          <Clippy
            strokeDasharray={50}
            strokeDashoffset={copied ? -50 : 0}
            className="text-gray-800 absolute top-0 left-0 transition-all"
          />
          <Check
            strokeDasharray={50}
            strokeDashoffset={copied ? 0 : -50}
            className="text-green-500 absolute top-0 left-0 transition-all"
          />
        </div>
      </button>
    );
  }
);
CopyButton.displayName = "CopyButton";

function Clippy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#bdc1c6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5.75 4.75H10.25V1.75H5.75V4.75Z" />
      <path d="M3.25 2.88379C2.9511 3.05669 2.75 3.37987 2.75 3.75001V13.25C2.75 13.8023 3.19772 14.25 3.75 14.25H12.25C12.8023 14.25 13.25 13.8023 13.25 13.25V3.75001C13.25 3.37987 13.0489 3.05669 12.75 2.88379" />
    </svg>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M13.25 4.75L6 12L2.75 8.75" />
    </svg>
  );
}
