import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { IndicatorCard } from "@/components/IndicatorCard";

export function CustomerCounter({ amount }) {
  return (
    <IndicatorCard
      icon={<EmojiPeopleIcon />}
      title="Contador de Clientes"
      amount={amount}
    />
  );
}
