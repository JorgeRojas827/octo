import { cn } from "@/lib/cn";

interface TextFormatterProps {
  text: string;
}

const formatTextToSections = (text: string) => {
  const sections = text.split(/(🚨|🌟)/).filter(Boolean);

  const formattedSections: { title: string; points: string[] }[] = [];

  for (let i = 0; i < sections.length; i += 2) {
    const emoji = sections[i];
    const content = sections[i + 1]?.trim();

    if (!content) continue;

    const titleMatch = content.match(/\*\*(.*?)\*\*/);
    if (!titleMatch) continue;

    const title = titleMatch[1]?.trim() || "";
    const contentWithoutTitle = content.replace(titleMatch[0], "").trim();
    const points = contentWithoutTitle
      .split("*")
      .filter(Boolean)
      .map((item) => item.replace(/^[^\w\s]*\s*/, "").trim());

    formattedSections.push({ title, points });
  }

  return formattedSections;
};

const TextFormatter: React.FC<TextFormatterProps> = ({ text }) => {
  const formattedSections = formatTextToSections(text);

  return (
    <span>
      {formattedSections.map((section, index) => (
        <div key={index} className="my-4">
          <h4
            className={cn("font-bold", {
              "text-red-500": section.title.toLowerCase().includes("critical"),
              "text-orange-500": section.title
                .toLowerCase()
                .includes("missing"),
              "text-green-500": section.title
                .toLowerCase()
                .includes("good points"),
              "text-black":
                !section.title.toLowerCase().includes("critical") &&
                !section.title.toLowerCase().includes("missing") &&
                !section.title.toLowerCase().includes("good points"),
            })}
          >
            {section.title}
          </h4>
          <ul>
            {section.points.map((point, i) => (
              <li key={i}>{point.replace(/^[^\w\s]*\s*/, "")}</li> // Remove any leading non-word characters (including emojis) again
            ))}
          </ul>
        </div>
      ))}
    </span>
  );
};

export default TextFormatter;
