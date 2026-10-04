import type { ParsedBlock } from "@/services/articles";

function renderBlock(block: ParsedBlock, key: string): React.ReactNode {
  if (block.kind === "paragraph") {
    return (
      <p key={key} className="text-[15px] leading-8 text-foreground [overflow-wrap:anywhere]">
        {block.text}
      </p>
    );
  }

  if (block.kind === "heading") {
    const className =
      block.level <= 2
        ? "mt-10 text-2xl font-bold text-foreground"
        : "mt-8 text-xl font-bold text-foreground";

    if (block.level <= 2) {
      return (
        <h2 key={key} id={block.id} className={className}>
          {block.text}
        </h2>
      );
    }

    return (
      <h3 key={key} id={block.id} className={className}>
        {block.text}
      </h3>
    );
  }

  if (block.kind === "code_block") {
    return (
      <pre
        key={key}
        className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-[13px] leading-6 text-foreground"
      >
        <code className={block.language ? `language-${block.language}` : undefined}>
          {block.code}
        </code>
      </pre>
    );
  }

  if (block.kind === "blockquote") {
    return (
      <blockquote
        key={key}
        className="border-l-2 border-accent pl-4 text-[15px] leading-7 text-muted-foreground italic"
      >
        {block.text}
      </blockquote>
    );
  }

  if (block.kind === "image") {
    return (
      <figure key={key} className="my-8 overflow-hidden rounded-lg border border-border bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={block.src}
          alt={block.alt || "Article image"}
          loading="lazy"
          className="h-auto w-full"
        />
      </figure>
    );
  }

  const ListTag = block.kind === "orderedList" ? "ol" : "ul";
  const listClass = block.kind === "orderedList" ? "list-decimal" : "list-disc";

  return (
    <ListTag key={key} className={`${listClass} space-y-3 pl-6 text-[15px] leading-7 text-foreground`}>
      {block.items.map((itemBlocks, index) => (
        <li key={`${key}-${index}`} className="space-y-2">
          {itemBlocks.map((itemBlock, innerIndex) =>
            renderBlock(itemBlock, `${key}-${index}-${innerIndex}`),
          )}
        </li>
      ))}
    </ListTag>
  );
}

export default function ArticleContentRenderer({ blocks }: { blocks: ParsedBlock[] }) {
  return <div className="space-y-5">{blocks.map((block, index) => renderBlock(block, String(index)))}</div>;
}
