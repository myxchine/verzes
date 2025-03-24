import Image from "next/image";
import Link from "next/link";
export default function ExerciseList({
  articles,
  cols,
  h3,
  lineclamp,
}: {
  articles: Article[];
  cols?: string;
  h3?: boolean;
  lineclamp?: boolean;
}) {
  const orderedArticles = articles.sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1
  );

  return (
    <div
      className={`grid text-left w-full gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 `}
    >
      {orderedArticles.map((article) => (
        <Link
          href={`/${article.slug}`}
          className="  flex flex-col gap-2 md:gap-4 "
          key={article.slug}
        >
          <Image
            src={article.image}
            alt={article.title}
            width={500}
            priority
            height={300}
            className=" w-full object-cover aspect-[4/3] md:aspect-[13/9]  rounded-lg shadow-xl mb-2"
          />

          {h3 ? (
            <h3 className="line-clamp-2">{article.title}</h3>
          ) : (
            <h2 className="line-clamp-2">{article.title}</h2>
          )}
          <p
            className={
              lineclamp
                ? "line-clamp-2 normal-case"
                : "normal-case line-clamp-2"
            }
          >
            {article.excerpt}
          </p>
          <span className="hover:underline ">Read More {"->"}</span>
        </Link>
      ))}
    </div>
  );
}
