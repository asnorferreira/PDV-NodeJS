import fs from "fs/promises";
import handlebars from "handlebars";

export const compilatorHtml = async (archive, context) => {
  const html = await fs.readFile(archive);
  const compilator = handlebars.compile(html.toString());
  const htmlString = compilator(context);
  return htmlString;
};
