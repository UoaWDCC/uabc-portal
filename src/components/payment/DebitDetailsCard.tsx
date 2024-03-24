/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import { MdContentCopy } from "react-icons/md";

import { Card } from "../Card";

interface DebitDetailsCardProps {
  title: string;
  subtitle: string;
  sessionId?: string;
  copyText?: string;
}

export const DebitDetailsCard = ({
  title,
  subtitle,
  sessionId,
  copyText,
}: DebitDetailsCardProps) => {
  return (
    <Card className="relative mt-0 bg-gray-200 p-5 pt-52 font-normal">
      <p className="top-5 text-xl font-medium">{title}</p>
      <p className="text-gray-500">{subtitle}</p>

      {sessionId && (
        <p className="bg-gray-200 pt-5">
          SessionID: <span className="font-bold">{sessionId}</span>
        </p>
      )}
      {/* Clipboard button is positioned absolute relative to the parent card container */}
      <button
        onPointerDown={() =>
          copyText && navigator.clipboard.writeText(copyText)
        }
        className="absolute right-4 top-1/2 translate-y-1/2 rounded-lg p-2"
      >
        <MdContentCopy className="text-3xl" />
      </button>
    </Card>
  );
};
