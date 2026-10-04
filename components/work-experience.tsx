import work from "@/data/work.json";
import Kicker from "@/components/kicker";

const DOT_COLORS = ["#0a7758", "#ea580c", "#eab308"];

export default function WorkExperience() {
  return (
    <section className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div>
          <Kicker>Career</Kicker>
          <h2 className="mt-4 text-3xl font-bold text-foreground uppercase sm:text-4xl">
            Work Experience
          </h2>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 border-l border-dashed border-border sm:left-1/2"
          />

          <div className="flex flex-col gap-10 sm:gap-14">
            {work.map((job, index) => {
              const color = DOT_COLORS[index % DOT_COLORS.length];
              return (
              <div
                key={`${job.company}-${job.period}`}
                className="relative grid grid-cols-1 gap-2 pl-10 sm:grid-cols-2 sm:gap-x-12 sm:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-4 flex h-6 w-6 -translate-x-1/2 -translate-y-1.5 items-center justify-center rounded-full border border-dotted bg-background-secondary sm:left-1/2"
                  style={{ borderColor: color }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </span>

                <div className="sm:pr-12 sm:text-right">
                  <p className="font-semibold text-foreground">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.period}</p>
                </div>

                <div className="sm:pl-12">
                  <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{job.summary}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
