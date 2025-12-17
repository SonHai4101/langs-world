import { MdQuiz } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useGetText } from "@/hook/useText";
import { HoverWord } from "@/components/HoverWord";

export const ReadingView = () => {
  const { data: text, isLoading: textIsLoading } = useGetText();

  const tokenize = (text: string) =>
    text.match(/\p{L}+|\p{N}+|[^\s\p{L}\p{N}]+|\s+/gu) ?? [];

  return (
    <div className="min-h-screen py-20 bg-[#faf8f5] dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Reading Mode</h1>
            <p>Hover over words to see definitions</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-white rounded-xl bg-primary">
            <MdQuiz />
            Generate Quiz
          </button>
        </div>
        <div className="flex gap-3 px-5 py-3 rounded-xl bg-[#f4f1ec] mt-5">
          <p className="font-bold">Word Difficulty:</p>
          <div className="flex gap-1 items-center">
            <GoDotFill className="text-[#6bc670]" />
            <p>Easy (Known)</p>
          </div>
          <div className="flex gap-1 items-center">
            <GoDotFill className="text-[#d9a515]" />
            <p>Medium</p>
          </div>
          <div className="flex gap-1 items-center">
            <GoDotFill className="text-[#ed756e]" />
            <p>Hard</p>
          </div>
          <div className="flex gap-1 items-center">
            <GoDotFill className="text-[#9172fe]" />
            <p>New</p>
          </div>
        </div>
        <div className="flex p-6 border rounded-xl bg-white min-h-[200px] mt-5 justify-center items-center">
          {textIsLoading ? (
            <p>Loading ...</p>
          ) : text?.data ? (
            <div>
              {tokenize(text.data[0].content).map((token, idx) => (
                <HoverWord key={idx} value={token} />
              ))}
            </div>
          ) : (
            <p>No paragraph found!</p>
          )}
        </div>
      </div>
    </div>
  );
};
