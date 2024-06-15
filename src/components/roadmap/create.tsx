"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "~/components/ui/credenza";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { TextureButton } from "~/components/ui/texture-button";
import { generateRoadmapSchema } from "~/schemas/generate-roadmap-mutation-input";
import type { GenerateRoadmapSchemaType } from "~/schemas/generate-roadmap-mutation-input";
import { api } from "~/trpc/react";
import { Textarea } from "../ui/textarea";

export const CreateRoadmap = () => {
  // router
  const router = useRouter();

  // state
  const [open, setOpen] = useState(false);

  // form
  const form = useForm<GenerateRoadmapSchemaType>({
    resolver: zodResolver(generateRoadmapSchema),
  });

  // mutation
  const { mutateAsync, isPending } = api.ai.generateRoadmap.useMutation({
    retry: 3,
    onSuccess: async (res) => {
      form.reset();
      router.push(`/roadmap/${res.id}`);
    },
  });

  // handlers
  const onSubmit = useCallback(
    (values: GenerateRoadmapSchemaType) => {
      toast.promise(async () => await mutateAsync(values), {
        loading: "Generating your roadmap...",
      });
      setOpen(false);
    },
    [mutateAsync],
  );

  return (
    <Credenza onOpenChange={setOpen} open={open}>
      <CredenzaTrigger asChild>
        <TextureButton className="mt-4">Create Roadmap</TextureButton>
      </CredenzaTrigger>

      <CredenzaContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CredenzaHeader>
              <CredenzaTitle>Create New Roadmap</CredenzaTitle>
              <CredenzaDescription>
                create roadmap description (todo: add proper desc)
              </CredenzaDescription>
            </CredenzaHeader>

            <CredenzaBody className="space-y-2">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a topic to generate roadmap"
                        className="max-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CredenzaBody>

            <CredenzaFooter>
              <CredenzaClose asChild>
                <TextureButton
                  disabled={isPending}
                  type="button"
                  variant="destructive"
                >
                  Close
                </TextureButton>
              </CredenzaClose>

              <TextureButton disabled={isPending} type="submit">
                Submit
              </TextureButton>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
};
