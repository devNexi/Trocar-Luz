import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BRAZILIAN_STATES } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

const miniLeadSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  whatsapp: z.string().min(10, "WhatsApp válido é obrigatório"),
  estado: z.string().min(2, "Estado é obrigatório"),
});

type MiniLeadFormProps = {
  heading: string;
  sourcePage: string;
};

export function MiniLeadForm({ heading, sourcePage }: MiniLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const createLead = useCreateLead();

  const form = useForm<z.infer<typeof miniLeadSchema>>({
    resolver: zodResolver(miniLeadSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      estado: "",
    },
  });

  const onSubmit = (values: z.infer<typeof miniLeadSchema>) => {
    const urlParams = new URLSearchParams(window.location.search);

    createLead.mutate({
      data: {
        type: "residential",
        nome: values.nome,
        whatsapp: values.whatsapp,
        estado: values.estado,
        pageSource: sourcePage,
        utmSource: urlParams.get("utm_source") || undefined,
        utmMedium: urlParams.get("utm_medium") || undefined,
        utmCampaign: urlParams.get("utm_campaign") || undefined,
      }
    }, {
      onSuccess: () => {
        setSubmitted(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="rounded-[12px] p-6 text-center">
        <div className="flex justify-center mb-3">
          <CheckCircle2 className="text-[#00B86B]" size={40} />
        </div>
        <h4 className="font-display font-semibold text-lg text-white mb-1">Tudo certo!</h4>
        <p className="text-gray-300 text-sm">
          Entraremos em contato pelo WhatsApp em breve.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-display font-bold text-xl text-white mb-4">{heading}</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 text-sm">Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    {...field}
                    className="h-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00B86B]"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 text-sm">WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(11) 99999-9999"
                    type="tel"
                    {...field}
                    className="h-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#00B86B]"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 text-sm">Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-10 bg-white/10 border-white/20 text-white focus:border-[#00B86B] [&>span]:text-white data-[placeholder]:text-gray-400">
                      <SelectValue placeholder="Selecione" className="text-gray-400" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BRAZILIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full btn-primary h-11 mt-2"
            disabled={createLead.isPending}
          >
            {createLead.isPending ? "Enviando..." : "Falar com especialista"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
