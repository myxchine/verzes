import { remark } from "remark";
import gfm from "remark-gfm";
import rehype from "remark-rehype";
import stringify from "rehype-stringify";
export default async function markdownToHtml(
  markdown: string
): Promise<string> {
  const result = await remark()
    .use(gfm) // Enable GitHub Flavored Markdown (GFM), including tables
    .use(rehype) // Convert Markdown to HTML AST
    .use(stringify) // Convert HTML AST to HTML string
    .process(markdown);
  return result.toString();
}
