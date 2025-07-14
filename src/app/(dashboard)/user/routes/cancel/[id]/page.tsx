"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/button";

export default function CancelRoute() {
  const { id } = useParams();
  const [selected, setSelected] = useState<string>("Mudança de destino?");
  const router = useRouter();
  const motives = [
    "Mudança de destino?",
    "Problemas com o transporte",
    "Horário incompatível",
    "Companheiros não apareceram?",
    "outro",
  ];
  return (
    <section className="h-screen flex flex-col gap-7">
      <span className="shadow-md flex p-4 ">
        <h1 className="text-md font-semibold">Cancelar rota</h1>
      </span>
      <form
        action=""
        className="p-3 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="text-md font-semibold">
          Qual o motivo do cancelamento?
        </h1>
        <RadioGroup
          value={selected}
          defaultValue={motives[0]}
          onValueChange={setSelected}
        >
          {motives.map((item, index) => (
            <div
              key={index}
              className={clsx("flex items-center gap-3", {
                "text-primary": selected === item,
              })}
            >
              <RadioGroupItem value={item} id={`motiv-${index}`} />
              <Label className="text-md font-normal" htmlFor={`motiv-${index}`}>
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Label className="text-md font-semibold" htmlFor="message">
          Adicione um comentário
        </Label>
        <Textarea
          placeholder="Comentário"
          id="message"
          className="resize-none h-30"
        />
        <Button className="h-[45px] text-md" type="submit">
          Enviar
        </Button>
        <Button
          variant={"outline"}
          type="reset"
          className="text-primary  h-[45px] text-md boder border-primary shadow-none"
          onClick={() => {
            router.back();
          }}
        >
          Voltar
        </Button>
      </form>
    </section>
  );
}
