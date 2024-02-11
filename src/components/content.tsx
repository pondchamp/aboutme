import Image from "next/image";
import Link from "next/link";
import { BoxArrowUpRight } from "react-bootstrap-icons";

interface JobHistoryEntry {
  accomplishments: JSX.Element[];
  company: string;
  description: JSX.Element;
  endYear?: number;
  logo?: string;
  startYear: number;
  title: string;
  url?: string;
}

interface ProjectHistoryEntry {
  description: JSX.Element;
  logo: string;
  title: string;
  url?: string;
}

const Projects: ProjectHistoryEntry[] = [
  {
    description: (
      <>
        Built curated travel planning app leverag&shy;ing ChatGPT within one
        week, enabling 30+ new users in first seven days to create fully
        customized itiner&shy;aries in 1-2 minutes.
      </>
    ),
    logo: "img/logo/conciergpt.png",
    title: "ConcierGPT",
    url: "https://conciergpt.ai/",
  },
];

const JobHistory: JobHistoryEntry[] = [
  {
    accomplishments: [
      <>
        Developed LLM-backed sales pitch&shy;ing tool for TikTok&apos;s
        sales&shy;force, automat&shy;ing pitch&shy;ing process within first week
        of launch for large consumer brands and captur&shy;ing $10MM+ in total
        ad campaign spend.
      </>,
    ],
    company: "TikTok",
    description: (
      <>
        Built tools and solutions for Branded Mission, TikTok&apos;s influencer
        market&shy;place and premium advert&shy;isement product. Led multiple
        engineer&shy;ing initiatives to improve stability and efficiency of
        auction bidding and ad delivery mech&shy;anisms. Responsible for
        build&shy;ing next-gen sales team experience with Generative AI
        technology to drive compell&shy;ing brand narratives and boost
        market&shy;place demand by onboard&shy;ing more brands to Branded
        Mission.
      </>
    ),
    logo: "img/logo/tiktok.png",
    startYear: 2022,
    title: "Senior Software Engineer",
    url: "https://www.tiktok.com/business/en-US/blog/branded-mission-topview-cpm-top-feed",
  },
  {
    accomplishments: [
      <>
        Designed and built moneti&shy;zation platform, enabling company to
        on&shy;board 30+ new monthly subscribers in first six months, averaging
        a customer life&shy;time value of $280.
      </>,
      <>
        Spearheaded technical and person&shy;nel reforms for team of five
        engin&shy;eers, boosting team morale and enabling launch of first two
        product front&shy;ends within 9 months.
      </>,
      <>
        Ideated and built slimmer product variant of Foliko with lower price
        point, surging new user count to company record of 60k+, exceed&shy;ing
        previous record of 25 Foliko Premium users.
      </>,
    ],
    company: "SynerAI",
    description: (
      <>
        Led all technical strategic and cultural initiat&shy;ives at SynerAI
        that pursue company&apos;s mission to clarify the world&apos;s news to
        unlock decision-making power for every person and organization around
        the world. Primarily resp&shy;onsible for product manage&shy;ment and
        business develop&shy;ment strategy for B2C products, plus career
        develop&shy;ment and product&shy;ive utili&shy;zation of five engineers
        across multiple engineer&shy;ing disciplines.
      </>
    ),
    logo: "img/logo/synerai.png",
    startYear: 2021,
    title: "Chief Technology Officer",
    url: "https://synerai.com/",
  },
  {
    accomplishments: [
      <>
        Developed programming library to improve service resiliency to network
        errors, reducing on-call pages 60% and saving 600+ annual
        engineer&shy;ing hours across company.
      </>,
      <>
        Led end-to-end migration of submission platform for creator sponsorship
        market&shy;place, elimin&shy;ating ⅓ of micro&shy;services
        maint&shy;ained by engineers and cutting API mean latency 50%.
      </>,
    ],
    company: "Twitch",
    description: (
      <>
        Built full-stack applications for experi&shy;mental premium ad formats,
        primarily for Bounty Board, Twitch&apos;s influencer market&shy;place.
        Responsible for multiple initi&shy;atives to simplify backend
        infra&shy;structure and improve team engineering and operational
        excellence. Contributed to front-end and backend development of
        Multi&shy;player Ads on Twitch.
      </>
    ),
    endYear: 2022,
    logo: "img/logo/twitch.png",
    startYear: 2020,
    title: "Software Engineer II",
    url: "https://twitchadvertising.tv/bounty-board/",
  },
  {
    accomplishments: [
      <>
        Developed new fraud alert data process&shy;ing and analysis
        pipe&shy;line, identifying $12MM+ in annual unrecon&shy;ciled
        charge&shy;back losses.
      </>,
      <>
        Built new fraud signals data pipe&shy;line, cutting signal deli&shy;very
        time from 24hr to 15min and improv&shy;ing investi&shy;gators access to
        payment data from 1% to 100%.
      </>,
    ],
    company: "Microsoft",
    description: (
      <>
        Built tools and systems empower&shy;ing hundreds of team members from
        Micro&shy;soft&apos;s global commerc&shy;ial plat&shy;form from business
        analysts to data scient&shy;ists. Led team of contractors to develop
        data pipelines and API services capable of processing critical
        commerc&shy;ial data at speed, scale, and flexi&shy;bility to adapt to
        wide variety of use cases. Contri&shy;buted to develop&shy;ment of
        Microsoft&apos;s upgraded internal test pay&shy;ment plat&shy;form, with
        focus on reducing risk of abuse by employees while minim&shy;izing
        friction in testing Microsoft pay&shy;ment plat&shy;forms end-to-end.
      </>
    ),
    endYear: 2020,
    logo: "img/logo/microsoft.png",
    startYear: 2017,
    title: "Data Engineer II",
  },
  {
    accomplishments: [
      <>
        Built predictive model to geo&shy;locate EFTPOS terminals, enabling
        Aust&shy;ralian bank to pinpoint card transac&shy;tions within several
        meters of accuracy, identifying 225K+ term&shy;inals nation&shy;wide.
      </>,
    ],
    company: "Commonwealth Bank",
    description: <></>,
    endYear: 2017,
    logo: "img/logo/commbank.png",
    startYear: 2016,
    title: "Data Science Intern",
  },
  {
    accomplishments: [
      <>
        Taught two univer&shy;sity courses for 300+ students while study&shy;ing
        part-time, receiving 95% satis&shy;faction rating for both courses on
        student feed&shy;back survey.
      </>,
    ],
    company: "University of NSW",
    description: <></>,
    endYear: 2016,
    logo: "img/logo/unsw.png",
    startYear: 2016,
    title: "Teaching Assistant",
  },
];

export const Content = () => {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <p className="text-2xl font-bold text-center">Summary</p>
        <br />
        <p className="text-sm md:text-base text-justify hyphens-manual">
          <b>The 360° Perceptionist</b>, experienced in super&shy;charging
          engineer&shy;ing team product&shy;ivity and bridging the gap between
          emerging technology and business appli&shy;cation. Proven track record
          for artfully managing long-term projects, bringing the rigor and grit
          necessary to achieve strat&shy;egic success. Previous areas of focus
          in ad bidding systems, full-stack engineer&shy;ing, and corporate
          fraud invest&shy;igations. Reputation for building and leading teams
          to launch new products while translating business problems into
          practical techno&shy;logical solutions.
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold text-center pb-8">
          Professional Experience
        </p>
        <div className="text-justify hyphens-manual flex flex-col gap-8">
          {JobHistory.map((job, i) => (
            <div key={`job-history-${i}`}>
              <div className="flex items-center gap-4">
                <div>
                  <Image
                    className="rounded-lg border-2 border-beige/80"
                    src={job.logo ?? ""}
                    alt={`company logo ${job.company}`}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="grow font-bold flex flex-col gap-1">
                  <div className="text-base md:text-lg flex justify-between">
                    <div className="flex items-center gap-2">
                      {job.url ? (
                        <>
                          <Link target="_blank" href={job.url}>
                            {job.company}
                          </Link>
                          <BoxArrowUpRight className="text-xs" />
                        </>
                      ) : (
                        <>{job.company}</>
                      )}
                    </div>
                    <div>
                      {job.startYear}
                      {job.startYear != job.endYear && (
                        <> &mdash; {job.endYear ?? "Present"}</>
                      )}
                    </div>
                  </div>
                  <div className="text-sm md:text-base">{job.title}</div>
                </div>
              </div>
              <div className="text-sm md:text-base pt-4">{job.description}</div>
              {job.accomplishments.length > 0 && (
                <>
                  <div className="pt-4 pb-2 font-bold md:text-lg text-center">
                    Accomplishments
                  </div>
                  <ul className="text-sm md:text-base list-disc pl-4">
                    {job.accomplishments.map((acc, j) => (
                      <li key={`job-history-${i}-acc-${j}`}>{acc}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-center pb-8">Projects</p>
        <div className="text-justify hyphens-manual flex flex-col gap-8">
          {Projects.map((project, i) => (
            <div key={`project-${i}`}>
              <div className="flex items-center gap-4">
                <div>
                  <Image
                    className="rounded-lg border-2 border-beige/80"
                    src={project.logo ?? ""}
                    alt={`project logo ${project.title}`}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="grow font-bold flex flex-col gap-1">
                  <div className="text-base md:text-lg flex items-center gap-2">
                    {project.url ? (
                      <>
                        <Link target="_blank" href={project.url}>
                          {project.title}
                        </Link>
                        <BoxArrowUpRight className="text-xs" />
                      </>
                    ) : (
                      <>{project.title}</>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm md:text-base pt-4">
                {project.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
