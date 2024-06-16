import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GradientHeading } from "~/components/ui/gradient-text";
import Particles from "~/components/ui/particles";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { TextureButton } from "~/components/ui/texture-button";

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={"#000"}
        refresh
      />

      <main className="relative flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 px-6 pt-[15vh] md:pt-36">
        <GradientHeading size="xl" className="text-balance text-center">
          Unlock Your Personalized Learning Journey
        </GradientHeading>

        <h3 className="text-balance text-center text-muted-foreground max-sm:w-4/5 max-sm:text-sm">
          Discover a tailored roadmap to achieve your goals. Share your
          interests, and we'll create a customized learning plan just for you,
          using advanced AI technology from OpenAI and Google Gemini. Start your
          journey today and reach new heights with a plan designed uniquely for
          you.
        </h3>

        <Link href="/app">
          <TextureButton className="md:w-72">
            Get Started <ArrowRight className="w-4" />
          </TextureButton>
        </Link>

        <Popover>
          <PopoverTrigger asChild>
            <TextureButton
              variant="minimal"
              className="-mt-2 h-6 border-yellow-100 bg-yellow-300/50"
              size={"sm"}
            >
              <div className="flex flex-row items-center gap-x-1">
                Note
                <InfoCircledIcon className="size-3" />
              </div>
            </TextureButton>
          </PopoverTrigger>
          <PopoverContent className="rounded-lg bg-yellow-300/30 px-3 py-2">
            <p className="text-center font-medium text-black text-xs">
              Note: We're still perfecting your personalized learning
              experience!
            </p>
          </PopoverContent>
        </Popover>
      </main>

      <div className="relative mx-auto mt-6 aspect-video w-11/12 overflow-hidden rounded-lg border md:w-full md:rounded-xl">
        <Image
          className="object-cover object-bottom"
          src={"/hero-desk.png"}
          fill
          alt="hero image"
        />
      </div>
    </div>
  );
}
