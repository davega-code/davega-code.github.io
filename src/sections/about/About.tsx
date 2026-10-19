import { PixelCanvas } from "../../shared/index.ts";
import {
  capIcon,
  degreeScene,
  fileIcon,
  hammerIcon,
  internScene,
  leadScene,
  oreIcon,
  pipelineScene,
  reviewScene,
  robotIcon,
  sunIcon,
  telemetryScene,
} from "./pixel-scenes/index.ts";
import * as css from "./about.css.ts";

const TIMELINE = [
  {
    when: "2026 – now",
    role: "Senior Software Engineer · Mojang Studios",
    detail:
      "Telemetry & Player Insights. Every Mojang game sends back signals, and I help turn them into answers about how people actually play.",
    icon: oreIcon,
    scene: telemetryScene,
    label: "Pixel animation: a pickaxe breaks an ore block, the gem inside signals a computer, and the computer fills a dashboard with charts.",
  },
  {
    when: "2022 – 2026",
    role: "Senior Software Engineer · Microsoft Gaming Safety & Trust",
    detail:
      "Tech lead on the shared moderation platform behind Xbox, Minecraft and Activision, and on keeping it fast, affordable and pleasantly boring to run.",
    icon: robotIcon,
    scene: leadScene,
    label: "Pixel animation: three games send signals to a computer run by a robot reviewer, which sends a ban hammer back to each game.",
  },
  {
    when: "2021 – 2022",
    role: "Software Engineer II · Xbox Safety",
    detail:
      "Scaled proactive moderation to media and text, fanned its decisions out to every service that needed them, and helped launch moderation in Minecraft.",
    icon: fileIcon,
    scene: pipelineScene,
    label: "Pixel animation: files fly into a computer that passes each one along cables to a network of other computers.",
  },
  {
    when: "2019 – 2021",
    role: "Software Engineer · Xbox Safety",
    detail:
      "First job out of school: event-driven moderation for Xbox Live that catches harmful content before anyone has to report it, rolled out to studios like Rare and Turn 10.",
    icon: hammerIcon,
    scene: reviewScene,
    label: "Pixel animation: a report flies into a computer, the reviewer stamps it with a big red X, and the X turns into a ban hammer.",
  },
  {
    when: "2016 – 2018",
    role: "Software Engineering Intern · Microsoft",
    detail:
      "Three summers, three teams: shipped the Data Science VM, wired up Office Online telemetry (a theme that came back later) and smoothed OneDrive onboarding.",
    icon: sunIcon,
    scene: internScene,
    label: "Pixel animation: over three summers the sun crosses the window while an intern ships a terminal, a chart and a cloud to the shelf.",
  },
  {
    when: "2018",
    role: "B.Sc. Computer Systems Engineering · IPN ESCOM",
    detail:
      "Mexico City, with a thesis on an augmented-reality social network and a semester in Stockholm at KTH along the way.",
    icon: capIcon,
    scene: degreeScene,
    label: "Pixel animation: a graduate tosses their cap in front of the school while a plane flies overhead.",
  },
];

const STACK = ["C# / .NET", "Python", "TypeScript", "React", "Azure", "Kubernetes", "Kafka", "Event Hubs", "Cosmos DB", "Redis", "Terraform"];

const PROJECTS = [
  {
    name: "OSO",
    detail: "Organized Self Orchestrator: a personal agent whose memory I can actually read, and whose tools are supervised.",
  },
  {
    name: "garmin-tracker",
    detail: "Pulls my runs and lifts off Garmin into a self-hosted dashboard that shows exactly what I care about.",
  },
  { name: "lightroom-cli", detail: "Talks to my Lightroom library from the terminal, so photo chores become scripts." },
  { name: "vault", detail: "lightroom-cli's companion: backs my photos up to Azure Blob Storage so nothing lives on just one disk." },
  { name: "prune", detail: "Sweeps away the stale local git branches that pile up, safely." },
];

export function About() {
  return (
    <div className={css.root}>
      <div className={css.intro}>
        <div className={css.portrait} aria-hidden="true">
          DV
        </div>
        <p className={css.greeting}>Hi, I'm David.</p>
      </div>

      <div className={css.story}>
        <p className={css.opener}>
          I'm a software engineer who likes turning messy, ambiguous problems into
          systems people can rely on.
        </p>
        <p>
          I studied Computer Systems Engineering at IPN in Mexico City, took a
          detour to Stockholm for a semester at KTH, and spent three summers interning at Microsoft before joining full
          time in 2019.
        </p>
        <p>
          Most of the years since went into gaming safety at Xbox, where a single
          moderation pipeline grew into a platform that helps keep players safe across Xbox, Minecraft and Activision.
          Today I'm at Mojang on Telemetry &amp; Player Insights, working through the
          data from every game the studio makes to understand how people really play.
        </p>
        <p>
          Outside the day job I build small tools for myself: an agent with a memory
          I can read, a tracker for my training, and a handful of CLIs that scratch my own itches.
        </p>
      </div>

      <section className={css.block}>
        <h2 className={css.heading}>Path so far</h2>
        <ol className={css.timeline}>
          {TIMELINE.map((item) => (
            <li key={item.role} className={css.entry}>
              <div className={css.entryHeader}>
                <span className={css.entryIcon}>
                  <PixelCanvas scene={item.icon} scale={2} />
                </span>
                <div>
                  <p className={css.when}>{item.when}</p>
                  <p className={css.role}>{item.role}</p>
                </div>
              </div>
              <p>{item.detail}</p>
              <div className={css.scene}>
                <PixelCanvas scene={item.scene} label={item.label} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={css.block}>
        <h2 className={css.heading}>What I work with</h2>
        <ul className={css.tags}>
          {STACK.map((name) => (
            <li key={name} className={css.tag}>
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className={css.block}>
        <h2 className={css.heading}>Things I build for fun</h2>
        <ul className={css.projects}>
          {PROJECTS.map((project) => (
            <li key={project.name}>
              <a
                className={css.link}
                href={`https://github.com/davega-code/${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
              <p>{project.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}