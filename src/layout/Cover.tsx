import { CoverStatic } from "@/lib/data/Cover";
import { contacts } from "@/lib/StaticData";
import SplitText from "@/components/SplitText";
import ScrollExpand from "@/components/ScrollExpand";
import Link from "next/link";

function Cover() {
  const { callToAction, name, photo, shortTagline, title } = CoverStatic;

  return (
    <ScrollExpand
      src={photo}
      alt="Mohamed Sherif, Full-Stack Web Developer"
      title={name}
      scrollHint="Scroll to explore"
      useWindowScroll
      startWidth={36}
      startHeight={52}
      startRadius={999}
      endRadius={0}
      overlayScrim={0.6}
    >
      <p className="text-white/80 text-lg sm:text-xl">Hi, I am {name}</p>

      <SplitText
        text={title}
        className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-3 text-white"
        delay={50}
        duration={0.25}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="0px"
        textAlign="center"
      />

      <p className="text-white/80 text-base sm:text-lg mt-4 max-w-xl">
        {shortTagline}
      </p>
      <p className="text-accent text-lg font-semibold mt-3">{callToAction}</p>

      <div className="mt-8 flex gap-4 justify-center">
        {contacts.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            target="_blank"
            className="text-white bg-white/10 backdrop-blur p-3 rounded-lg hover:bg-primary transition-colors duration-300"
          >
            <span>{item.icon}</span>
          </Link>
        ))}
      </div>
    </ScrollExpand>
  );
}

export default Cover;