import { Title } from "../Share/Title";
import { motion } from "motion/react";

export default function Testimonial() {
  return (
    <div className="w-11/12 md:w-9/12 mx-auto pb-10 lg:pb-20">
      <section className="mx-auto w-full">
        <Title
          title={" What our users say about NextGen Hunt"}
          para={
            "See how NextGen Hunt is helping tech enthusiasts and innovators!"
          }
          align={"center"}
          btn={"hidden"}
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 w-full">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 lg:col-span-2 flex flex-col gap-y-10 justify-between"
          >
            <div className="flex flex-col gap-y-3.5">
              <p className="font-bold text-xl text-white">
                A game-changer for product discovery!
              </p>
              <p className="font-medium text-white">
                NextGen Hunt helped me discover incredible AI tools I never knew
                existed. The community-driven insights make all the difference!
              </p>
            </div>
            <div className="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/43.jpg"
                alt="Lisa Carter"
                className="h-10 w-10"
              />
              <p className="pt-2 text-sm font-semibold text-white">
                Lisa Carter
              </p>
              <p className="text-sm font-medium text-slate-100/70">
                Tech Enthusiast & AI Developer
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 flex flex-col gap-y-10 justify-between"
          >
            <div className="flex flex-col gap-y-3.5">
              <p className="font-bold text-xl text-white">
                Perfect platform for launching products
              </p>
              <p className="font-medium text-white">
                We launched our startup here, and within days, we saw a massive
                surge in interest. The upvoting system helped boost our
                visibility!
              </p>
            </div>
            <div className="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/34.jpg"
                alt="Daniel Green"
                className="h-10 w-10"
              />
              <p className="pt-2 text-sm font-semibold text-white">
                Daniel Green
              </p>
              <p className="text-sm font-medium text-slate-100/70">
                Co-Founder at TechWave
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 flex flex-col gap-y-10 justify-between"
          >
            <div className="flex flex-col gap-y-3.5">
              <p className="font-bold text-xl text-white">
                Great for market research
              </p>
              <p className="font-medium text-white">
                As a product manager, I use NextGen Hunt to track trending
                innovations. The insights and reviews help shape our roadmap!
              </p>
            </div>
            <div className="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/71.jpg"
                alt="Sophia Lee"
                className="h-10 w-10"
              />
              <p className="pt-2 text-sm font-semibold text-white">
                Sophia Lee
              </p>
              <p className="text-sm font-medium text-slate-100/70">
                Product Manager at InnovateX
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 lg:col-span-2 flex flex-col gap-y-10 justify-between"
          >
            <div className="flex flex-col gap-y-3.5">
              <p className="font-bold text-xl text-white">
                Engaging and active tech community
              </p>
              <p className="font-medium text-white">
                Love being part of the discussions! The ability to upvote,
                review, and share feedback keeps the platform engaging.
              </p>
            </div>
            <div className="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/71.jpg"
                alt="Alex Johnson"
                className="h-10 w-10"
              />
              <p className="pt-2 text-sm font-semibold text-white">
                Alex Johnson
              </p>
              <p className="text-sm font-medium text-slate-100/70">
                SaaS Founder & Product Enthusiast
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
