import { Avatar, AvatarFallback } from "@/common/components/ui/avatar";

const TestimonialCard = ({
  name,
  username,
  text,
}: {
  name: string;
  username: string;
  text: string;
}) => {
  const avatarFallback = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials;
  };

  return (
    <div className="flex flex-col w-full p-2">
      <p>{text}</p>
      <section className="flex items-center space-x-4 mt-4">
        <Avatar>
          <AvatarFallback>{avatarFallback(name)}</AvatarFallback>
        </Avatar>
        <section>
          <h4>{name}</h4>
          <p className="opacity-50">{username}</p>
        </section>
      </section>
    </div>
  );
};

export default TestimonialCard;
