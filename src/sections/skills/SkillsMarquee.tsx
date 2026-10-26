import { useState, type ReactElement } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { prefersReducedMotion } from "@/lib/motion";
import type { Skill } from "@/types/content";

// Time one card takes to slide past; with no autoplay delay the row never stops.
const MARQUEE_SPEED_MS = 2500;
const GAP_PX = 12;

// Same column count as the old grid at each width, so the cards keep their size.
const BREAKPOINTS = {
  640: { slidesPerView: 4 },
  768: { slidesPerView: 5 },
  1024: { slidesPerView: 7 },
  1280: { slidesPerView: 10 },
};

interface SkillsMarqueeProps {
  skills: readonly Skill[];
}

export const SkillsMarquee = ({ skills }: SkillsMarqueeProps): ReactElement => {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <div className="animate-fade-in animation-delay-100">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={MARQUEE_SPEED_MS}
        autoplay={
          prefersReducedMotion()
            ? false
            : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        slidesPerView={3}
        spaceBetween={GAP_PX}
        breakpoints={BREAKPOINTS}
        wrapperTag="ul"
        onSwiper={setSwiper}
        onRealIndexChange={({ realIndex }) => setActiveIdx(realIndex)}
        className="skills-marquee py-1"
      >
        {skills.map(({ name, icon: Icon, color }) => (
          <SwiperSlide
            key={name}
            tag="li"
            className="panel group flex! h-auto! flex-col items-center justify-center gap-3 rounded-xl px-2 py-5 text-center transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-raised"
          >
            <Icon
              className="size-8 transition-transform duration-300 group-hover:scale-110"
              style={{ color }}
              aria-hidden="true"
            />
            <span className="text-xs font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
              {name}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>

      <CarouselControls
        label="Skills"
        count={skills.length}
        activeIndex={activeIdx}
        onPrevious={() => swiper?.slidePrev()}
        onNext={() => swiper?.slideNext()}
        onSelect={(idx) => swiper?.slideToLoop(idx)}
        className="mt-8"
      />
    </div>
  );
};
