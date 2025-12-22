import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import { toast } from "react-toastify";
import { GrDocumentText } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import { usePostText } from "@/hook/useText";
import { useNavigate } from "react-router";
dayjs.extend(relativeTime);

const steps = [
  {
    key: 1,
    title: "Word Detection",
    des: "Automatically identifies difficulty levels based on frequency",
  },
  {
    key: 2,
    title: "Hover Dictionary",
    des: "Click any word for instant definitions and pronunciation",
  },
  {
    key: 3,
    title: "Auto Quizzes",
    des: "Generate comprehension quizzes from your reading",
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const { mutate: postText } = usePostText();
  const [content, setContent] = useState("");

  const handleAnalyze = () => {
    postText(content);
    navigate("/read-view");
  };

  return (
    <div className="min-h-screen py-20 bg-[#faf8f5] dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex flex-col gap-2 text-center">
          <div className="justify-center flex">
            <div className="text-4xl p-5 rounded-xl bg-[#e1ede7]">
              <GrDocumentText />
            </div>
          </div>
          <p className="text-4xl font-bold">Start Reading</p>
          <p className="text-base font-normal">
            Paste or type any text in your target language to begin learning
          </p>
        </div>

        {/* Upload Section (plain Tailwind) */}
        <div>
          <div className="mb-8 border-dashed border-2 border-black/30 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 rounded-lg p-4">
            <div>
              <textarea
                rows={10}
                placeholder={
                  "Paste your text here...\n\nTry pasting an article, a book excerpt, or any content in the language you're learning."
                }
                className="w-full resize-none p-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm min-h-[12rem]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                aria-label="Paste text to analyze"
              />
            </div>
          </div>

          <div className="justify-end flex">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={content.trim().length === 0}
              className="flex items-center gap-3 text-lg text-white py-3 px-5 bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze Text <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="flex gap-8 justify-between mt-20">
          {steps.map((step) => (
            <div key={step.key} className="flex flex-col gap-2 text-center">
              <div className="justify-center flex">
                <p className="bg-[#f4eee0] rounded-full w-fit py-3 px-5">
                  {step.key}
                </p>
              </div>
              <p className="font-bold">{step.title}</p>
              <p>{step.des}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
