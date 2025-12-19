import { useEffect, useRef, useState } from "react";
import { DictionaryTooltip } from "./DictionaryTooltip";
import { usePrefetchDictionary } from "@/hook/usePrefetchDictionary";
import { useListUserSaveWord } from "@/hook/useWord";
import { normalizeWord } from "../../../backend/src/utils/normalizeWord";

type HoverWordProps = {
  value: string;
};

export const HoverWord = ({ value }: HoverWordProps) => {
  const { data: userSaveWord } = useListUserSaveWord({ page: 1, limit: 9999 });
  const isWord = /\p{L}|\p{N}/u.test(value);
  const [show, setShow] = useState(false);
  const prefetch = usePrefetchDictionary();
  const ref = useRef<HTMLSpanElement | null>(null);

  const handleToggle = () => {
    (prefetch(value), setShow((prev) => !prev));
  };

  const normalizeEntryWord = normalizeWord(value);
  const isSaved = userSaveWord?.data?.some(
    (item) => item.word.normalized === normalizeEntryWord
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  if (!isWord) {
    return <span>{value}</span>;
  }
  return (
    <span
      ref={ref}
      className={`relative cursor-pointer ${isSaved && "hover:bg-yellow-200"} transition rounded px-0.5 ${!isSaved && "bg-[#e0d9f7] hover:bg-[#c8b7fe]"}`}
      onClick={(e) => {
        e.stopPropagation;
        handleToggle();
      }}
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
