interface JobHistoryEntry {
  accomplishments: JSX.Element[];
  company: string;
  description: JSX.Element;
  endYear?: number;
  logo?: string;
  startYear: number;
  title: string;
}

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
    startYear: 2022,
    title: "Senior Software Engineer",
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
        <div className="text-sm md:text-base text-justify hyphens-manual">
          {JobHistory.map((job, i) => (
            <div key={`job-history-${i}`}>
              <div className="font-bold flex flex-col gap-1">
                <div className="text-lg flex justify-between">
                  <div>{job.company}</div>
                  <div>
                    {job.startYear} &mdash; {job.endYear ?? "Present"}
                  </div>
                </div>
                <div className="text-base">{job.title}</div>
              </div>
              <div className="pt-4">{job.description}</div>
              {job.accomplishments.length > 0 && (
                <>
                  <div className="pt-4 pb-2 font-bold text-lg text-center">
                    Accomplishments
                  </div>
                  <ul className="list-disc pl-4">
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
      {/* <div className="text-2xl font-bold text-center pb-24">
        🚧 Under Construction 🚧
      </div> */}
    </div>
  );
};
