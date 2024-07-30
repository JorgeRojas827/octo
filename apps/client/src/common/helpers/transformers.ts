export function convertFeedbackToMarkdown(feedbackString: string): string {
  let markdownOutput = "";

  const feedbackItems = feedbackString.split("',");

  feedbackItems.forEach((item, index) => {
    item = item
      .replace(/^\[?'?/, "")
      .replace(/'\]?$/, "")
      .trim();

    if (item) {
      const sections = item.split("\n\n");
      sections.forEach((section) => {
        const lines = section.trim().split("\n");
        const title = lines[0].replace(/[🚨🌟*]/g, "").trim();
        markdownOutput += `### ${title}\n`;

        lines.slice(1).forEach((line) => {
          const trimmedLine = line.trim();
          if (trimmedLine) {
            markdownOutput += `${trimmedLine}\n`;
          }
        });

        markdownOutput += "\n";
      });
    }
  });

  return markdownOutput.trim();
}
