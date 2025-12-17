import { useState } from "react";
import { DictionaryTooltip } from "./DictionaryTooltip";
import { usePrefetchDictionary } from "@/hook/usePrefetchDictionary";

type HoverWordProps = {
  value: string;
};

export const HoverWord = ({ value }: HoverWordProps) => {
  const isWord = /\p{L}|\p{N}/u.test(value);
  const [show, setShow] = useState(false);
  const prefetch = usePrefetchDictionary();

  if (!isWord) {
    return <span>{value}</span>;
  }
  return (
    <span
      className="relative cursor-pointer hover:bg-yellow-200 transition rounded px-0.5"
      onMouseEnter={() => {
        prefetch(value);
        setShow(true);
      }}
      onMouseLeave={() => setShow(false)}
    >
      {value}
      {show && (
        <div className="absolute z-20 top-full left-0 mt-2 bg-white border rounded shadow-lg p-3">
          <DictionaryTooltip word={value.toLowerCase()} />
        </div>
      )}
    </span>
  );
};
