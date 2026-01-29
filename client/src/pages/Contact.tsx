import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useCreateMessage } from "@/hooks/use-messages";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const { mutate, isPending } = useCreateMessage();
  const [success, setSuccess] = useState(false);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertMessage) => {
    mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        form.reset();
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 flex items-center">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold tracking-tighter mb-6 text-white">Get in Touch</h1>
            <p className="text-xl text-zinc-400 font-light mb-8 leading-relaxed">
              Interested in collaborating or discussing AI architecture? 
              I'm always open to interesting conversations and technical challenges.
            </p>
            
            <div className="space-y-4 mb-12">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">Email</h3>
                <a href="mailto:adiprakash35@gmail.com" className="text-xl text-white hover:text-zinc-300 transition-colors">
                  adiprakash35@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
                  <p className="text-zinc-400">Thanks for reaching out! I'll be in touch shortly.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-sm text-white underline hover:text-zinc-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                    <input
                      {...form.register("name")}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Your name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-xs">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="your@email.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-xs">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Message</label>
                    <textarea
                      {...form.register("message")}
                      rows={5}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder="Tell me about your project or inquiry..."
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-400 text-xs">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
