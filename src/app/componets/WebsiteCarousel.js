"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Mousewheel } from "swiper/modules";

import websites from "@/data/websites";

import "swiper/css";
import "swiper/css/effect-coverflow";

export default function WebsiteCarousel() {
    return (
        <section className="w-full overflow-hidden bg-black py-5 sm:py-14 md:py-20">
            <Swiper
                modules={[EffectCoverflow, Mousewheel, Autoplay]}
                effect="coverflow"
                centeredSlides
                slidesPerView="auto"
                grabCursor
                loop
                mousewheel
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 180,
                    modifier: 1,
                    scale: 0.85,
                    slideShadows: false,
                }}
                className="w-full"
            >
                {websites.map((website) => (
                    <SwiperSlide
                        key={website.id}
                        className="
                            !w-[240px]
                            sm:!w-[280px]
                            md:!w-[340px]
                            lg:!w-[400px]
                        "
                    >
                        <div
                            className="
                                relative
                                aspect-[3/4]
                                overflow-hidden
                                rounded-md
                                bg-neutral-900
                                shadow-2xl
                            "
                        >
                            <Image
                                src={website.image}
                                alt={website.title}
                                fill
                                sizes="
                                    (max-width: 640px) 240px,
                                    (max-width: 768px) 280px,
                                    (max-width: 1024px) 340px,
                                    400px
                                "
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
