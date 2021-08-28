import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function PostTime(num) {
  const conv = format(new Date(num * 1000), "PPPPp", { locale: id });
  return conv;
}

export function LastEditTime(num) {
  const conv = formatDistanceToNow(new Date(num * 1000), {
    addSuffix: true,
    locale: id,
  });
  return conv;
}
