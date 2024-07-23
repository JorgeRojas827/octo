import MaxWidthWrapper from "@/common/components/utils/max-width-wrapper";
import TestimonialCard from "./testimonial-card";

const Testimonials = () => {
  return (
    <div className="w-full flex justify-center items-center mb-20 md:mb-60">
      <MaxWidthWrapper className="flex flex-col justify-center items-center space-y-8">
        <h4 className="text-6xl font-bold">Experiences with Octa:</h4>
        <section className="grid md:grid-cols-2 gap-6">
          <TestimonialCard
            name="Jonh Kennedy"
            username="@jonhkenn"
            text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas placeat,
        tempore asperiores harum modi provident, sequi cumque at veritatis illo
        minus nihil magnam autem odit non aut vero nam omnis id. Sint quod
        voluptate cum cumque impedit dolores, placeat quaerat."
          />
          <TestimonialCard
            name="Veronica Smith"
            username="@versmith"
            text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas placeat,
        tempore asperiores harum modi provident, sequi cumque at veritatis illo
        minus nihil magnam autem odit non aut vero nam omnis id. Sint quod
        voluptate cum cumque impedit dolores, placeat quaerat."
          />
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Testimonials;
