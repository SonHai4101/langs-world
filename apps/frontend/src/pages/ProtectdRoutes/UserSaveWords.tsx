import { useListUserSaveWord } from "@/hook/useWord";

const tabs = [
  { id: 1, words: "10", label: "Total Words" },
  { id: 2, words: "2", label: "Easy" },
  { id: 3, words: "1", label: "Medium" },
  { id: 4, words: "1", label: "Hard" },
  { id: 5, words: "6", label: "New" },
];
export const UserSaveWords = () => {
  const { data: userSaveWord } = useListUserSaveWord({ page: 1, limit: 9999 });

  return (
    <div className="min-h-screen py-10 bg-[#faf8f5] dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="pt-20 px-6 max-w-6xl mx-auto">
        <div className="flex gap-4">
          {tabs.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 p-4 w-full rounded-2xl shadow-2xs bg-white"
            >
              <p className="text-2xl font-bold">{item.words}</p>
              <p className="text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
