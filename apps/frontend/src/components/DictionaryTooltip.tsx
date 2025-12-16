import { useDictionary } from "@/hook/useDictionary";

type DictionaryTooltipProps = {
  word: string;
};

export const DictionaryTooltip = ({ word }: DictionaryTooltipProps) => {
  const { data: dictionaryData, isLoading, isError } = useDictionary(word);

  if (isLoading) {
    return <div className="text-xs text-gray-500">Loading ...</div>;
  }

  if (isError || !dictionaryData?.data?.[0]) {
    return <div className="text-xs text-red-500">No definition found</div>;
  }

  const entry = dictionaryData.data[0];

  const definition = entry.meanings?.[0]?.definitions?.[0]?.definition;

  const ipa = entry.phonetics?.find((p) => p.text)?.text;

  return (
    <div className="max-w-xs">
      <div className="font-semibold">{entry.word}</div>

      {ipa && <div className="text-xs text-gray-500 mb-1">{ipa}</div>}

      <div className="text-sm">{definition}</div>
    </div>
  );
};
