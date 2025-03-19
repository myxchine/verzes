export default function Component({
  children,
  centered,
  row,
  justifybetween,
  small,
  padding,
  centeredmobile,
}: Readonly<{
  children: React.ReactNode;
  centered?: boolean;
  row?: boolean;
  justifybetween?: boolean;
  small?: boolean;
  padding?: boolean;
  centeredmobile?: boolean;
}>) {
  return (
    <div
      className={`flex flex-col gap-3 md:gap-4   w-full     ${
        centered ? "items-center text-center justify-center mx-auto" : ""
      } ${small ? "max-w-2xl " : null}
      ${padding ? "my-12 md:my-16" : null}
      ${
        centeredmobile
          ? "items-center text-center justify-center mx-auto md:mx-0 md:text-left md:items-start md:justify-start"
          : ""
      }
      `}
    >
      {children}
    </div>
  );
}
