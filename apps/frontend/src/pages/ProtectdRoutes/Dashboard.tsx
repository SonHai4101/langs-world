import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Card } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import { toast } from "react-toastify";
import { GrDocumentText } from "react-icons/gr";
import { Textarea } from "@/components/ui/textarea";
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

        {/* Upload Section */}
        <div>
          <Card className="mb-8 border-dashed border-2 border-black/30 bg-linear-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10">
            <CardHeader>
              <Textarea
                rows={10}
                placeholder="Paste your text here... &#10;&#10;Try pasting an article, a book excerpt, or any content in the language you're learning."
                className="resize-none p-0 bg-none border-0 focus-visible:ring-0 shadow-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardHeader>
          </Card>
          <div className="justify-end flex">
            <Button
              className="flex gap-3 text-lg text-white py-5"
              onClick={handleAnalyze}
            >
              Analyze Text <FaArrowRight />
            </Button>
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
