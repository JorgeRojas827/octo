import MaxWidthWrapper from "../MaxWidthWrapper";
import { Separator } from "../ui/separator";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <MaxWidthWrapper className="flex flex-col justify-center items-center space-y-8">
        <h4 className="text-6xl font-bold">Experiences with Octa:</h4>
        <section className="flex space-x-4">
          <TestimonialCard
            name="Jonh Kennedy"
            username="@jonhkenn"
            text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas placeat,
        tempore asperiores harum modi provident, sequi cumque at veritatis illo
        minus nihil magnam autem odit non aut vero nam omnis id. Sint quod
        voluptate cum cumque impedit dolores, placeat quaerat."
          />
          <Separator orientation="vertical"/>
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
