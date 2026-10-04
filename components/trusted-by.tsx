import Image from "next/image";
import showcase from "@/data/showcase.json";
import Kicker from "@/components/kicker";

export default function TrustedBy() {
  return (
    <section className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="flex shrink-0 items-center gap-4">
            <Kicker>Designed and built for</Kicker>
            <span className="hidden h-px w-10 bg-border lg:block" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-4 lg:flex lg:flex-1 lg:flex-wrap lg:justify-between lg:gap-10">
            {showcase.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noreferrer"
                aria-label={client.name}
                title={client.name}
                className="relative block h-8 duration-300 sm:h-10 lg:h-9 lg:w-28"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  sizes="(min-width: 1024px) 112px, (min-width: 640px) 22vw, 40vw"
                  className={`object-contain transition duration-300 ${client.inverted ? "invert" : ""}`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
