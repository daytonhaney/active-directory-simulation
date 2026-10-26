import {
  ArrowLeft,
  ArrowRight,
  FolderOpen,
  RefreshCw,
  Search,
  ChevronDown,
} from "lucide-solid";

export default function MenuBarIcons() {
  return (
    <div class="toolbar">
      <button class="toolbar-button" title="Back" aria-label="Back">
        <ArrowLeft size={17} color="#478AC4" strokeWidth={2.5} />
      </button>

      <button class="toolbar-button" title="Forward" aria-label="Forward">
        <ArrowRight size={17} color="#808080" strokeWidth={2.5} />
      </button>

      <span class="toolbar-separator" />

      <button
        class="toolbar-button"
        title="Up One Level"
        aria-label="Up One Level"
      >
        <FolderOpen size={17} color="#D9A832" strokeWidth={2.5} />
      </button>

      <span class="toolbar-separator" />

      <button class="toolbar-button" title="Refresh" aria-label="Refresh">
        <RefreshCw size={18} color="#32C900" strokeWidth={3} />
      </button>

      <button class="toolbar-button" title="Find" aria-label="Find">
        <Search size={17} color="#4A82AA" strokeWidth={2.5} />
      </button>

      <span class="toolbar-separator" />

      <button class="toolbar-button toolbar-actions" title="Actions">
        Actions
        <ChevronDown size={12} color="#3774A8" />
      </button>
    </div>
  );
}
