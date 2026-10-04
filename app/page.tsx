import { PROFILE } from "@/app/constants";
import AboutImpact from "@/components/about-impact";
import SelectedWork from "@/components/selected-work";
import TrustedBy from "@/components/trusted-by";
import WorkExperience from "@/components/work-experience";
import Education from "@/components/education";
import Research from "@/components/research";
import BlogPosts from "@/components/blog-posts";
import SocialIconLinks from "@/components/social-icon-links";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute top-6 left-4 h-6 w-6 border-t border-l border-border sm:top-8 sm:left-6 lg:left-8" />
          <span className="absolute top-6 right-4 h-6 w-6 border-t border-r border-border sm:top-8 sm:right-6 lg:right-8" />
          <span className="absolute bottom-6 left-4 h-6 w-6 border-b border-l border-border sm:bottom-8 sm:left-6 lg:left-8" />
          <span className="absolute right-4 bottom-6 h-6 w-6 border-r border-b border-border sm:right-6 sm:bottom-8 lg:right-8" />
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/60" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-14 pb-16 text-center sm:px-6 sm:pt-20 sm:pb-24 lg:px-8">
          <h1
            aria-label={PROFILE.name}
            className="w-full max-w-full font-light tracking-wide text-foreground uppercase select-none"
          >
            <span aria-hidden="true" className="block text-[clamp(3.5rem,20vw,13rem)] leading-[0.82]">
              v&nbsp;e&nbsp;d&nbsp;a
            </span>
            <span aria-hidden="true" className="mt-4 block text-[clamp(1.5rem,12vw,8rem)] leading-[0.92]">
              salkar
            </span>
          </h1>

          <span aria-hidden="true" className="mt-6 h-px w-10 bg-border" />

          <p className="mt-6 max-w-2xl text-sm text-muted-foreground sm:text-base">
            I am a passionate researcher and engineer, dedeicated to advancing the field of AI in manufacturing
            and solving data visualisation challenges.
          </p>

          <span aria-hidden="true" className="mt-6 h-px w-10 bg-border " />
    
          <SocialIconLinks className="mt-6 flex items-center gap-4" />
        </div>
      </section>

      <AboutImpact />
      <SelectedWork />
      <TrustedBy />
      <WorkExperience />
      <Education />
      <Research />
      <BlogPosts />
    </>
  );
}
