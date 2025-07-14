import { format, isToday, isYesterday, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatChatDate(dateString: string): string {
  const date = parse(dateString, "yyyy-MM-dd HH:mm", new Date());

  if (isToday(date)) {
    return `Hoje às ${format(date, "HH:mm")}`;
  }

  if (isYesterday(date)) {
    return `Ontem às ${format(date, "HH:mm")}`;
  }

  return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}
