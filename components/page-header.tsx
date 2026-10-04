import Kicker from "@/components/kicker";

type PageHeaderProps = {
  kicker: string;
  title: string;
  description: string;
};

export default function PageHeader({ kicker, title, description }: PageHeaderProps) {
  return (
    <div className="max-w-2xl">
      <Kicker>{kicker}</Kicker>
      <h1 className="mt-4 text-3xl font-bold text-foreground uppercase sm:text-4xl">{title}</h1>
      <p className="mt-4 text-sm text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}
