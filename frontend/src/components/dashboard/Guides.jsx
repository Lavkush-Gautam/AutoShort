import React, { useState } from "react";
import { BookOpen, PlayCircle, Lightbulb, Wand2, Video, X } from "lucide-react";

const guides = [
  {
    title: "Getting Started with Faceless Videos",
    description:
      "Learn how to create your first AI-powered video series from scratch using templates.",
    content: `Faceless videos use AI narration and visuals to create engaging content without showing your face.
You can start by selecting a theme, adding narration using voice AI, and choosing your preferred art style.
Keep your video short, catchy, and focused on one clear message.`,
    image:
      "https://images.unsplash.com/photo-1581276879432-15a43b38c2ed?auto=format&fit=crop&w=900&q=80",
    icon: <PlayCircle className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Best Practices for Viral Shorts",
    description:
      "Discover the secret ingredients behind viral faceless videos — hooks, pacing, and trends.",
    content: `Start with a powerful hook in the first 2 seconds.
Use trending topics, dynamic visuals, and concise narration.
End with a CTA (Call To Action) — ask viewers to like, follow, or comment.`,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    icon: <Lightbulb className="w-6 h-6 text-rose-500" />,
  },
  {
    title: "Voice Cloning & Narration",
    description:
      "Master the new voice cloning tools to make your content sound more authentic.",
    content: `Try cloning your voice or using our premium AI voices for natural delivery.
Adjust pitch and tone to match your video mood.
Always preview narration before publishing.`,
    image:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80",
    icon: <Wand2 className="w-6 h-6 text-pink-400" />,
  },
  {
    title: "Optimizing AI Art Styles",
    description:
      "Choose the right art style for your niche — anime, cinematic, realistic, or minimalist.",
    content: `Art style sets your video’s vibe. Experiment with cinematic tones for emotional videos, or anime for storytelling.
Try consistent style across your series for brand identity.`,
    image:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=900&q=80",
    icon: <Video className="w-6 h-6 text-rose-400" />,
  },
  {
    title: "Monetization & Growth",
    description:
      "Turn your content into profit by learning affiliate, sponsorship, and ad revenue strategies.",
    content: `Once your videos gain traction, you can monetize through YouTube Shorts fund, affiliate links, or sponsors.
Keep your audience engaged — consistency builds growth.`,
    image:
      "https://images.unsplash.com/photo-1611162616305-4f9a9a7b88e7?auto=format&fit=crop&w=900&q=80",
    icon: <BookOpen className="w-6 h-6 text-pink-500" />,
  },
];

const Guides = () => {
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <div className="relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-rose-600" />
        Video Creation Guides
      </h2>
      <p className="text-slate-600 mb-6 text-sm">
        Explore tutorials and expert tips for creating engaging faceless videos
        using AI tools.
      </p>

      {/* Guide Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {guides.map((guide, index) => (
          <div
            key={index}
            onClick={() => setSelectedGuide(guide)}
            className="cursor-pointer p-5 rounded-xl hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 mb-3">
              {guide.icon}
              <h3 className="text-lg font-semibold text-slate-800">
                {guide.title}
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">{guide.description}</p>
            <span className="text-rose-500 text-sm font-medium hover:underline">
              Read More →
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
          <div className="bg-white w-[90%] max-w-lg shadow-xl p-6 relative border border-rose-100 rounded-2xl">
            <button
              onClick={() => setSelectedGuide(null)}
              className="absolute top-4 right-4 text-rose-500 hover:text-rose-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              {selectedGuide.icon}
              <h3 className="text-xl font-semibold text-rose-600">
                {selectedGuide.title}
              </h3>
            </div>

            <img
              src={selectedGuide.image}
              alt={selectedGuide.title}
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />

            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {selectedGuide.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guides;
