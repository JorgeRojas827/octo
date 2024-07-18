import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "lucide-react";

export default function AskIA({ className }: { className: string }) {
  return (
    <div className={cn("flex flex-col rounded-md bg-muted/50", className)}>
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
        </div>
      </div>
      <div className="border-t px-6 py-4">
        <div className="relative">
          <Textarea
            placeholder="Escribe tu mensaje..."
            name="message"
            id="message"
            rows={1}
            className="min-h-[48px] rounded-2xl resize-none p-4 shadow-sm pr-16"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute w-8 h-8 top-3 right-3"
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span className="sr-only">Enviar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
