import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDate = (data: Date, formato: string): string => {
  return format(data, formato, {
    locale: ptBR,
  });
}

export default formatDate;