import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeleteSongById, useGetAllSongs } from "@/hook/useSong";
import { Card } from "@radix-ui/themes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { useDeleteAudio } from "@/hook/useAudio";
import { GrDocumentText } from "react-icons/gr";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowRight } from "react-icons/fa";
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
  // const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { mutate: deleteSong } = useDeleteSongById();
  const { mutate: deleteAudio } = useDeleteAudio();

  // const togglePlay = (song: Song) => {
  //   const { currentSong, isPlaying, setSong, setPlaying, audioElement } =
  //     usePlayerStore.getState();

  //   if (!audioElement) return;

  //   // If clicking the same song → toggle play/pause
  //   if (currentSong?.id === song.id) {
  //     setPlaying(!isPlaying);
  //     return;
  //   }

  //   // If clicking a new song → load & play it
  //   setSong(song); // sets current song
  //   setPlaying(true);
  // };

  // Fetch all songs on mount

  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) {
  //     // fetchSongs();
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const data = await songService.searchSongs(searchQuery);
  //     setSongs(data);
  //   } catch (error) {
  //     console.error("Failed to search songs:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDeleteSong = async (id: string) => {
  //   if (!confirm("Are you sure you want to delete this song?")) return;
  //   try {
  //     await songService.deleteSong(id);
  //     // fetchSongs();
  //   } catch (error) {
  //     console.error("Failed to delete song:", error);
  //   }
  // };

  // const handleDelete = (songId: string, audioId: string) => {
  //   deleteSong(songId, {
  //     onSuccess: () => {
  //       toast.success("Delete successfully");
  //       deleteAudio(audioId);
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   });
  // };

  // const openEditDialog = (song: Song) => {
  //   setSelectedSong(song);
  //   // setFormData({
  //   //   title: song.title,
  //   //   artist: song.artist || "",
  //   //   album: song.album || "",
  //   //   duration: song.duration || 0,
  //   //   audioUrl: song.audio?.url || "",
  //   // });
  //   setIsEditDialogOpen(true);
  // };

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
              />
            </CardHeader>
          </Card>
          <div className="justify-end flex">
            <Button className="flex gap-3 text-lg text-white py-5">
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Song</DialogTitle>
            <DialogDescription>
              Update the song information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                placeholder="Song title"
                // value={formData.title}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-artist">Artist</Label>
              <Input
                id="edit-artist"
                placeholder="Artist name"
                // value={formData.artist}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-album">Album</Label>
              <Input
                id="edit-album"
                placeholder="Album name"
                // value={formData.album}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration (seconds)</Label>
              <Input
                id="edit-duration"
                type="number"
                placeholder="Duration in seconds"
                // value={formData.duration}
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-audioUrl">Audio URL</Label>
              <Input
                id="edit-audioUrl"
                placeholder="https://..."
                // value={formData.audioUrl}
                onChange={() => {}}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                // resetForm();
                // setSelectedSong(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => {}}>Update Song</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
