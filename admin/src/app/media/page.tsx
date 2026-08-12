import { GlassCard } from "@/components/ui/Cards";
import { Image as ImageIcon } from "lucide-react";

export default function MediaAdmin() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-wide">Media Library</h1>
          <p className="text-secondary mt-1">Manage Aegivon digital assets and media</p>
        </div>
      </div>

      <GlassCard className="p-12 text-center flex flex-col items-center justify-center">
        <ImageIcon className="w-16 h-16 text-primary/50 mb-4" />
        <h3 className="text-xl font-heading font-medium text-white mb-2">Media Library Coming Soon</h3>
        <p className="text-secondary max-w-md mx-auto">
          The media management module is currently under development. Check back later.
        </p>
      </GlassCard>
    </div>
  );
}
