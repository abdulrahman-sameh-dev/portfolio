"use client";

import { Dialog } from "radix-ui";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

type LiveDemoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
};

export default function LiveDemoModal({
  open,
  onOpenChange,
  projectTitle,
}: LiveDemoModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-100 bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content
          aria-describedby="live-demo-description"
          className="fixed left-1/2 top-1/2 z-101 w-[min(92vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-indigo-500/25 bg-[#0a0a0a] p-8 text-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-400">
            <Construction aria-hidden="true" className="h-5 w-5" />
          </div>

          <Dialog.Title className="text-xl font-bold tracking-tight">
            {projectTitle} — live demo in progress
          </Dialog.Title>
          <Dialog.Description
            id="live-demo-description"
            className="mt-3 text-sm leading-relaxed text-zinc-400"
          >
            This live demo is currently under construction and will be deployed
            soon.
          </Dialog.Description>

          <div className="mt-8 flex justify-end">
            <Dialog.Close asChild>
              <Button
                aria-label="Close live demo dialog"
                className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20"
              >
                Got it
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
