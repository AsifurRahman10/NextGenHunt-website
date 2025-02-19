import { Title } from "../Share/Title";

export default function Testimonial() {
  return (
    <div class="w-11/12 md:w-9/12 mx-auto pb-10 lg:pb-20">
      <section class="mx-auto w-full">
        <Title
          title={" What our users say about NextGen Hunt"}
          para={
            "See how NextGen Hunt is helping tech enthusiasts and innovators!"
          }
          align={"center"}
          btn={"hidden"}
        />
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 w-full">
          <div class="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 lg:col-span-2 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl text-white">
                A game-changer for product discovery!
              </p>
              <p class="font-medium text-white">
                NextGen Hunt helped me discover incredible AI tools I never knew
                existed. The community-driven insights make all the difference!
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/43.jpg"
                alt="Lisa Carter"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold text-white">Lisa Carter</p>
              <p class="text-sm font-medium text-slate-100/70">
                Tech Enthusiast & AI Developer
              </p>
            </div>
          </div>
          <div class="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl text-white">
                Perfect platform for launching products
              </p>
              <p class="font-medium text-white">
                We launched our startup here, and within days, we saw a massive
                surge in interest. The upvoting system helped boost our
                visibility!
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/34.jpg"
                alt="Daniel Green"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold text-white">Daniel Green</p>
              <p class="text-sm font-medium text-slate-100/70">
                Co-Founder at TechWave
              </p>
            </div>
          </div>
          <div class="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl text-white">
                Great for market research
              </p>
              <p class="font-medium text-white">
                As a product manager, I use NextGen Hunt to track trending
                innovations. The insights and reviews help shape our roadmap!
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/71.jpg"
                alt="Sophia Lee"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold text-white">Sophia Lee</p>
              <p class="text-sm font-medium text-slate-100/70">
                Product Manager at InnovateX
              </p>
            </div>
          </div>
          <div class="border p-7 rounded-xl bg-btnPrimary drop-shadow-md border-neutral-800/50 col-span-3 lg:col-span-2 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl text-white">
                Engaging and active tech community
              </p>
              <p class="font-medium text-white">
                Love being part of the discussions! The ability to upvote,
                review, and share feedback keeps the platform engaging.
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/71.jpg"
                alt="Alex Johnson"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold text-white">Alex Johnson</p>
              <p class="text-sm font-medium text-slate-100/70">
                SaaS Founder & Product Enthusiast
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
