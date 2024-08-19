import { useAccountsData } from "@/hooks/useAccountsData";
import { BanksTablelist } from "@/components/Banks/BanksTablelist";
import { ActionType } from "@/utils/constants";

export function BankBalanceCard() {
  const { accounts } = useAccountsData(ActionType.LIST, {});

  return (
    <>
      <BanksTablelist rows={accounts} />
    </>
  );
}
