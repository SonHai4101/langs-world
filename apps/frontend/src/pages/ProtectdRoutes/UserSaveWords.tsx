import { useListUserSaveWord } from "@/hook/useWord";
import { GoSearch } from "react-icons/go";
import { CiSliderHorizontal } from "react-icons/ci";

const tabs = [
  { id: 1, words: "10", label: "Total Words", color: "#333333" },
  { id: 2, words: "2", label: "Easy", color: "#6bc670" },
  { id: 3, words: "1", label: "Medium", color: "#d9a515" },
  { id: 4, words: "1", label: "Hard", color: "#ed756e" },
  { id: 5, words: "6", label: "New", color: "#af99f6" },
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
              <p className={`text-2xl font-bold text-[${item.color}]`}>{item.words}</p>
              <p className="text-sm">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <GoSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"  />
            <input
              placeholder="Search words or definitions..."
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          
        </div>
      </div>
    </div>
  );
};
