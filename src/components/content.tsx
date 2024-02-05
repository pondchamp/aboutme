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
        Developed LLM-backed sales pitching tool for TikTok&apos;s salesforce,
        automating pitching process within first week of launch for large
        consumer brands and capturing $10MM+ in total ad campaign spend.
      </>,
    ],
    company: "TikTok",
    description: (
      <>
        Built tools and solutions for Branded Mission, TikTok&apos;s influencer
        marketplace and premium advertisement product. Led multiple engineering
        initiatives to improve stability and efficiency of auction bidding and
        ad delivery mechanisms. Responsible for building next-gen sales team
        experience with Generative AI technology to drive compelling brand
        narratives and boost marketplace demand by onboarding more brands to
        Branded Mission.
      </>
    ),
    startYear: 2022,
    title: "Senior Software Engineer",
  },
];

export const Content = () => {
  return (
    <div className="flex flex-col gap-14">
      <div>
        <p className="text-2xl font-bold text-center">Summary</p>
        <br />
        <p className="text-sm md:text-base md:text-justify">
          <b>The 360° Perceptionist</b>, experienced in supercharging
          engineering team productivity and bridging the gap between emerging
          technology and business application. Proven track record for artfully
          managing long-term projects, bringing the rigor and grit necessary to
          achieve strategic success. Previous areas of focus in ad bidding
          systems, full-stack engineering, and corporate fraud investigations.
          Reputation for building and leading teams to launch new products while
          translating business problems into practical technological solutions.
        </p>
      </div>
      <div>
        <p className="text-2xl font-bold text-center pb-8">
          Professional Experience
        </p>
        <div className="text-sm md:text-base md:text-justify">
          {JobHistory.map((job, i) => (
            <div key={`job-history-${i}`}>
              <div className="font-bold">
                <div className="flex justify-between">
                  <div>{job.company}</div>
                  <div>
                    {job.startYear} &mdash; {job.endYear ?? "Present"}
                  </div>
                </div>
                <div>{job.title}</div>
              </div>
              <div className="pt-8">{job.description}</div>
              {job.accomplishments.length > 0 && (
                <>
                  <div className="pt-8 font-bold text-lg">Accomplishments</div>
                  <ul>
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
      <div className="text-2xl font-bold text-center pb-24">
        🚧 Under Construction 🚧
      </div>
    </div>
  );
};
