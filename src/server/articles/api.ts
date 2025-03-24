import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const articlesDirectory = join(process.cwd(), "_articles");
const exercicesDirectory = join(process.cwd(), "_exercises");

export function getArticleSlugs() {
  return fs.readdirSync(articlesDirectory);
}

export function getArticleBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  try {
    const fullPath = join(articlesDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content } as Article;
  } catch (e) {
    return null;
  }
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();

  try {
    const Articles = slugs
      .map((slug) => getArticleBySlug(slug))
      ?.filter((Article) => Article !== null)
      .sort((Article1, Article2) => (Article1.date > Article2.date ? -1 : 1));
    return Articles;
  } catch (e) {
    return [];
  }
}

export function getExerciseSlugs() {
  return fs.readdirSync(exercicesDirectory);
}

export function getExerciseBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");

  try {
    const fullPath = join(exercicesDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content } as ExerciseArticle;
  } catch (e) {
    return null;
  }
}

export function getAllExercises(): ExerciseArticle[] {
  const slugs = getExerciseSlugs();

  try {
    const Articles = slugs
      .map((slug) => getExerciseBySlug(slug))
      ?.filter((Article) => Article !== null)
      .sort((Article1, Article2) => (Article1.date > Article2.date ? -1 : 1));
    return Articles;
  } catch (e) {
    return [];
  }
}
