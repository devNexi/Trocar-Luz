import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BRAZILIAN_STATES, CONSUMPTION_BANDS, BILL_BANDS, BUSINESS_SEGMENTS } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

const baseLeadSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  whatsapp: z.string().min(10, "WhatsApp válido é obrigatório"),
  estado: z.string().min(2, "Estado é obrigatório"),
});

const residentialSchema = baseLeadSchema.extend({
  consumoBand: z.string().min(1, "Consumo médio é obrigatório"),
  distribuidora: z.string().optional(),
});

const businessSchema = baseLeadSchema.extend({
  empresa: z.string().min(2, "Nome da empresa é obrigatório"),
  valorContaBand: z.string().min(1, "Valor médio é obrigatório"),
  segmento: z.string().optional(),
});

type LeadFormProps = {
  type: "residential" | "business";
  sourcePage?: string;
};

export function LeadForm({ type, sourcePage = "unknown" }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const createLead = useCreateLead();

  const isResidential = type === "residential";
  const schema = isResidential ? residentialSchema : businessSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      estado: "",
      ...(isResidential ? { consumoBand: "", distribuidora: "" } : { empresa: "", valorContaBand: "", segmento: "" }),
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const urlParams = new URLSearchParams(window.location.search);
    
    createLead.mutate({
      data: {
        type: type,
        nome: values.nome,
        whatsapp: values.whatsapp,
        estado: values.estado,
        ...(isResidential 
            ? { consumoBand: (values as any).consumoBand, distribuidora: (values as any).distribuidora } 
            : { empresa: (values as any).empresa, valorContaBand: (values as any).valorContaBand, segmento: (values as any).segmento }),
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
      <div className="bg-[#F7F7F5] rounded-[12px] p-8 text-center border border-[#E2E1DC]">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-[#00B86B]" size={48} />
        </div>
        <h3 className="font-display font-semibold text-2xl text-[#1A1F36] mb-2">Tudo certo!</h3>
        <p className="text-[#6B7080] text-base">
          Recebemos seus dados. Um de nossos especialistas entrará em contato pelo WhatsApp em breve para mostrar suas opções de economia.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#E2E1DC] shadow-sm">
      <h3 className="font-display font-semibold text-xl text-[#1A1F36] mb-6">
        {isResidential ? "Veja quanto você pode economizar em casa" : "Simule a economia da sua empresa"}
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome {isResidential ? "completo" : ""}</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Empresa (Business Only) */}
          {!isResidential && (
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Sua empresa" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* WhatsApp */}
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" type="tel" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estado */}
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Selecione seu estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BRAZILIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Consumo / Valor da Conta */}
          {isResidential ? (
            <FormField
              control={form.control}
              name="consumoBand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo médio de energia</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CONSUMPTION_BANDS.map((band) => (
                        <SelectItem key={band} value={band}>{band}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="valorContaBand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor médio da conta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BILL_BANDS.map((band) => (
                        <SelectItem key={band} value={band}>{band}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Segmento (Business Optional) */}
          {!isResidential && (
            <FormField
              control={form.control}
              name="segmento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segmento (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BUSINESS_SEGMENTS.map((seg) => (
                        <SelectItem key={seg} value={seg}>{seg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button 
            type="submit" 
            className="w-full btn-primary h-14 mt-4 text-base"
            disabled={createLead.isPending}
          >
            {createLead.isPending ? "Enviando..." : "Descobrir economia"}
          </Button>
          <p className="text-xs text-center text-[#6B7080] mt-2">
            Seus dados estão seguros. Sem complicação.
          </p>
        </form>
      </Form>
    </div>
  );
}
