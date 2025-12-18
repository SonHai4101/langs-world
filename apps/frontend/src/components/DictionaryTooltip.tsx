import { useDictionary } from "@/hook/useDictionary";
import { useLookupWord } from "@/hook/useWord";
import { useRef } from "react";
import {
  PiBookmarkSimpleLight,
  PiSpeakerSimpleHighLight,
} from "react-icons/pi";

type DictionaryTooltipProps = {
  word: string;
};

export const DictionaryTooltip = ({ word }: DictionaryTooltipProps) => {
  const { data: dictionaryData, isLoading, isError } = useDictionary(word);
  const { mutate: saveWord } = useLookupWord();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (isLoading) {
    return <div className="text-xs text-gray-500">Loading ...</div>;
  }

  if (isError || !dictionaryData?.[0]) {
    return <div className="text-xs text-red-500">No definition found</div>;
  }

  const entry = dictionaryData[0];

  const definition = entry.meanings[0]?.definitions[0]?.definition;

  const ipa = entry.phonetics?.find((p: any) => p.text)?.text;

  const sound = entry.phonetics?.find((p: any) => p.audio)?.audio;

  const playSound = (url?: string) => {
    if (!url) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    } else {
      audioRef.current.pause();
      audioRef.current.src = url;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      console.log("Audio playback failed");
    });
  };

  const handleSaveWord = () => {
    saveWord(entry.word);
  };

  return (
    <div className="flex flex-col gap-2 min-w-[250px]">
      <div className="font-semibold">Word: {entry.word}</div>
      {ipa ? (
        <div className="text-sm text-gray-500 mb-1">IPA: {ipa}</div>
      ) : (
        <div className="text-sm text-gray-500 mb-1">No IPA found</div>
      )}

      <div className="text-sm">
        <span className="font-bold">Definition:</span>{" "}
        {definition || "No definition found"}
      </div>

      <div className="flex gap-3 mt-2">
        <button
          className="flex gap-2 min-w-[140px] justify-center py-1 border rounded-xl items-center bg-white hover:bg-[#f2f0f0]"
          onClick={() => playSound(sound)}
          disabled={!sound}
        >
          <PiSpeakerSimpleHighLight /> Listen
        </button>

        <button
          className="flex gap-2 min-w-[140px] justify-center py-1 border rounded-xl items-center bg-white hover:bg-[#f2f0f0]"
          onClick={handleSaveWord}
        >
          <PiBookmarkSimpleLight /> Save
        </button>
      </div>
    </div>
  );
};
