import education from "@/data/education.json";
import Kicker from "@/components/kicker";

export default function Education() {
  return (
    <section className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div>
          <Kicker>Academics</Kicker>
          <h2 className="mt-4 text-3xl font-bold text-foreground uppercase sm:text-4xl">
            Education
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-border pt-8 sm:mt-16 sm:grid-cols-3 sm:gap-8 sm:pt-10">
          {education.map((item, index) => (
            <div
              key={item.degree}
              className="border-border pl-0 sm:border-l sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <p className="text-2xl font-bold text-accent sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-sm font-semibold tracking-wide text-foreground uppercase">
                {item.degree}
              </h3>
              <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                {item.institution} &middot; {item.duration}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
              {item.grade && (
                <p className="mt-3 text-xs font-semibold tracking-wide text-accent uppercase">
                  <span className="text-muted-foreground">Grade: </span> {item.grade}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
