import { useDictionary } from "@/hook/useDictionary";

type DictionaryTooltipProps = {
  word: string;
};

export const DictionaryTooltip = ({ word }: DictionaryTooltipProps) => {
  const { data: dictionaryData, isLoading, isError } = useDictionary(word);

  if (isLoading) {
    return <div className="text-xs text-gray-500">Loading ...</div>;
  }

  if (isError || !dictionaryData?.[0]) {
    return <div className="text-xs text-red-500">No definition found</div>;
  }

  const entry = dictionaryData[0];

  const definition = entry.meanings[0]?.definitions[0]?.definition;

  const ipa = entry.phonetics?.find((p: any) => p.text)?.text;

  return (
    <div className="flex flex-col gap-2 min-w-[250px]">
      <div className="font-semibold">Word: {entry.word}</div>

      {ipa ? (
        <div className="text-xs text-gray-500 mb-1">IPA: {ipa}</div>
      ) : (
        <div className="text-xs text-gray-500 mb-1">No IPA found</div>
      )}

      <div className="text-sm">Definition: {definition}</div>
    </div>
  );
};
