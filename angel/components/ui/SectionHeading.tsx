type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  level?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  level = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  const Heading = level;

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span
          className={`h-px w-8 ${inverse ? "bg-[#d4b678]" : "bg-[#b08d57]"}`}
          aria-hidden="true"
        />
        <p
          className={`text-xs font-semibold uppercase tracking-[0.24em] ${
            inverse ? "text-[#d8c08e]" : "text-[#8b6b3c]"
          }`}
        >
          {eyebrow}
        </p>
      </div>
      <Heading
        className={`display-font text-balance text-[2.55rem] leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem] ${
          inverse ? "text-white" : "text-[#18343b]"
        }`}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={`mt-6 max-w-2xl text-[1.03rem] leading-8 ${
            centered ? "mx-auto" : ""
          } ${inverse ? "text-white/65" : "text-[#647477]"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
