const TAG_COLOR_CLASSES = [
  "border-blue-200 bg-blue-50",
  "border-purple-200 bg-purple-50",
  "border-emerald-200 bg-emerald-50",
  "border-amber-200 bg-amber-50",
  "border-pink-200 bg-pink-50",
  "border-teal-200 bg-teal-50",
] as const;

export function getTagColorClass(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) & 0xffff;
  }
  return TAG_COLOR_CLASSES[hash % TAG_COLOR_CLASSES.length];
}
