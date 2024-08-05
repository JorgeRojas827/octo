import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import TestimonialCard from "./testimonial-card";

const Testimonials = () => {
  return (
    <div className="w-full flex justify-center items-center mb-20 md:mb-60">
      <MaxWidthWrapper className="flex flex-col justify-center items-center space-y-8">
        <h4 className="text-6xl font-bold">Experiences with Octo:</h4>
        <section className="grid md:grid-cols-2 gap-6">
          <TestimonialCard
            name="Diego Lozano"
            username="Techinical Team Leader at Delfosti"
            text="Reviewing Merge Requests is a daily task that consumes a considerable amount of time. A tool that identifies patterns of good and bad practices not only helps reduce the backlog but also streamlines the analysis process, enabling a more efficient and focused approach to addressing critical issues and improving overall code quality."
          />
          <TestimonialCard
            name="Leonardo Iglesias"
            username="Developer at Flash Gas"
            text="The daily task of reviewing code can be quite laborious. Octo is a tool that can greatly alleviate this burden for developers. This allows them to dedicate more time and resources to key areas, thereby improving the quality, efficiency, and overall effectiveness of the code."
          />
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Testimonials;
