"use client";

// Renders the corner-zone objects from Home's 3D object showcase (everything
// except "devops", which is anchored inside Portrait's own container so it
// sits exactly behind the character — see Hero.tsx). Driven by the shared
// useHomeObjectScheduler so both pieces stay in sync on the same clock.
import { AnimatePresence, motion } from "framer-motion";
import { getHomeObject, objectTiming, ZONE_CLASSES, type ObjectSize } from "@/lib/homeObjectShowcase";
import { withBasePath } from "@/lib/utils";

const SIZE_CLASSES: Record<ObjectSize, string> = {
  small: "w-28 sm:w-36",
  medium: "w-44 sm:w-60",
  large: "w-64 sm:w-[24rem]"
};

export function HomeObjectShowcase({
  primaryId,
  secondaryId,
  isMobile,
  reducedMotion
}: {
  primaryId: string | null;
  secondaryId: string | null;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const renderObject = (id: string | null, isPrimary: boolean) => {
    if (!id || id === "devops") return null;
    const obj = getHomeObject(id);
    if (!obj || !obj.zone) return null;
    if (isMobile && !obj.mobileEnabled) return null;

    const enterX = isPrimary ? 40 : -30;

    return (
      <motion.div
        key={id}
        aria-hidden
        className={`absolute ${ZONE_CLASSES[obj.zone]} ${SIZE_CLASSES[obj.size]} z-[6] pointer-events-none`}
        style={{ aspectRatio: obj.aspect }}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.86, x: enterX }}
        animate={
          reducedMotion
            ? { opacity: 1, scale: 1, x: 0 }
            : { opacity: 1, scale: 1, x: 0, y: [0, -10, 0] }
        }
        exit={reducedMotion ? undefined : { opacity: 0, scale: 0.92, x: enterX }}
        transition={
          reducedMotion
            ? { duration: 0.6 }
            : {
                opacity: { duration: objectTiming.enterDuration },
                scale: { duration: objectTiming.enterDuration },
                x: { duration: objectTiming.enterDuration },
                y: { duration: obj.holdSeconds, repeat: Infinity, ease: "easeInOut" }
              }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath(obj.src)} alt={obj.alt} className="h-full w-full object-contain" draggable={false} />
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {renderObject(primaryId, true)}
        {renderObject(secondaryId, false)}
      </AnimatePresence>
    </div>
  );
}
