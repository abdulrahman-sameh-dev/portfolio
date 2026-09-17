"use client"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useEffect, useRef, useCallback } from "react";

import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  REQUEST_PROTOCOL_EVENT,
  serviceProtocolToContact,
  type RequestProtocolDetail,
} from "@/lib/contact";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  category: z.string().min(1, "Please select a category"), // خليناه string بسيط للـ Select
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue,
    control, // محتاجين control عشان الـ Select
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      category: "Project",
    }
  });

  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const applyProtocol = useCallback((protocol: RequestProtocolDetail) => {
    setValue("category", protocol.category, { shouldValidate: false });
    setValue("message", protocol.message, { shouldValidate: false });
    messageRef.current?.focus({ preventScroll: true });
  }, [setValue]);

  // Same-page bridge: Engagement Protocols → smooth scroll already done by Services,
  // here we only listen for the protocol payload and pre-fill the form.
  useEffect(() => {
    const handleProtocol = (e: Event) => {
      const detail = (e as CustomEvent<RequestProtocolDetail>).detail;
      if (!detail) return;
      applyProtocol(detail);
    };
    window.addEventListener(REQUEST_PROTOCOL_EVENT, handleProtocol);
    return () => window.removeEventListener(REQUEST_PROTOCOL_EVENT, handleProtocol);
  }, [applyProtocol]);

  // Deep-link support: pre-fill when landing directly on /#contact?service=X.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const protocol = service ? serviceProtocolToContact[service] : undefined;
    if (!protocol || !service) return;
    applyProtocol({ service, ...protocol });
  }, [applyProtocol]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error();
      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.error("Failed to send message.");
    }
  };

  return (
    <section id="contact" className="py-24 scroll-mt-24 px-6 max-sm:px-2 max-w-7xl mx-auto min-h-[85vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        <div className="space-y-8 lg:sticky lg:top-24">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Building the future, <br />
              <span className="text-indigo-500 font-mono">systematically.</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed">
              Have a project in mind? Let&apos;s discuss the architecture and implementation.
            </p>
          </div>
          
          <div className="pt-8 border-t border-zinc-800 flex flex-col gap-1">
            <span className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Direct Line</span>
            <span className="text-white text-lg font-mono">abdulrahman.sameh.dev@proton.me</span>
          </div>
        </div>

        <div className="max-sm:p-6 p-8 rounded-xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-zinc-300">First Name</Label>
                <Input id="firstName" {...register("firstName")} placeholder="Abdulrahman" className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-indigo-500" />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-zinc-300">Last Name</Label>
                <Input id="lastName" {...register("lastName")} placeholder="Sameh" className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-indigo-500" />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                <Input id="email" {...register("email")} placeholder="hello@abdulrahmansameh.dev" className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-indigo-500" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-300">Phone Number</Label>
                <Input id="phone" type="tel" {...register("phone")} placeholder="+20 10 0000 0000" className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-indigo-500" />
              </div>
            </div>

            {/* Shadcn Select with Controller */}
            <div className="space-y-2">
              <Label className="text-zinc-300">Reason for Inquiry</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-zinc-900/50 border-zinc-800 focus:ring-indigo-500 text-zinc-400 w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-300">
                      <SelectItem value="Project">Full-stack Project</SelectItem>
                      <SelectItem value="Consultation">Technical Consultation</SelectItem>
                      <SelectItem value="Collaboration">Collaboration</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-zinc-300">Message</Label>
              <Textarea id="message" {...register("message")} ref={(el) => { register("message").ref(el); messageRef.current = el; }} placeholder="Tell me about your vision..." className="min-h-[120px] bg-zinc-900/50 border-zinc-800 focus-visible:ring-indigo-500 resize-none" />
              {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 text-base transition-all"
            >
              {isSubmitting ? "Processing..." : "Send Message"}
            </Button>
          </form>
        </div>

      </div>
    </section>
  );
}