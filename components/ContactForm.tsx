"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import * as z from "zod";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";


const contactFormSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
  lastName: z.string().min(2, "الاسم الأخير مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().optional(),
  category: z.enum(["Project", "Consultation", "Collaboration", "Other"]),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormValues>({
    // @ts-ignore - حل مشكلة تعارض النسخ بين Zod و Resolver في بيئة pnpm
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      category: "Project",
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error('Failed to send message');
  
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset(); // عشان نصفر الـ Form بعد الإرسال
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* الجانب الأيسر: Branding & Identity */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight font-serif">
            Let's build something <span className="text-indigo-500">extraordinary</span> together.
          </h2>
          <p className="text-zinc-400">
            Have a concept? I have the engineering mindset to bring it to life. 
            Drop a message and let's start the conversation.
          </p>
          <div className="pt-4 space-y-2">
            <p className="text-zinc-500 font-mono text-sm tracking-tighter">Abdulrahman.sameh@dev.com</p>
            <p className="text-zinc-500 font-mono text-sm tracking-tighter">Cairo, Egypt</p>
          </div>
        </div>

        {/* الجانب الأيمن: The Interactive Form */}
        <div className="relative group p-px rounded-3xl overflow-hidden">
          {/* الـ Animated Border المطلب من صورتك السابقة */}
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50 bg-size-[200%_200%] animate-[gradient_3s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative bg-[#080808] rounded-[23px] p-8 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[14px] font-mono font-bold text-zinc-500 uppercase tracking-widest">First Name</label>
                  <input 
                    {...register("firstName")} 
                    className={`w-full bg-zinc-900/50 border ${errors.firstName ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all`} 
                    placeholder="Abdulrahman" 
                  />
                  {errors.firstName && <span className="text-[10px] text-red-500 uppercase font-mono">{errors.firstName.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Last Name</label>
                  <input 
                    {...register("lastName")} 
                    className={`w-full bg-zinc-900/50 border ${errors.lastName ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all`} 
                    placeholder="Sameh" 
                  />
                  {errors.lastName && <span className="text-[10px] text-red-500 uppercase font-mono">{errors.lastName.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input 
                  {...register("email")} 
                  className={`w-full bg-zinc-900/50 border ${errors.email ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all`} 
                  placeholder="hello@example.com" 
                />
                {errors.email && <span className="text-[10px] text-red-500 uppercase font-mono">{errors.email.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Reason for Inquiry</label>
                <div className="relative">
                  <select 
                    {...register("category")} 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Project">Full-stack Project</option>
                    <option value="Consultation">Technical Consultation</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea 
                  {...register("message")} 
                  rows={4} 
                  className={`w-full bg-zinc-900/50 border ${errors.message ? 'border-red-500/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all resize-none`} 
                  placeholder="Tell me about your vision..." 
                />
                {errors.message && <span className="text-[10px] text-red-500 uppercase font-mono">{errors.message.message}</span>}
              </div>

              <motion.button 
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Send Message"}
              </motion.button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}