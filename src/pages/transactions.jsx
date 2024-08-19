import { useRef, useState } from "react";
import { NewButton } from "@/components/NewButton";
import { SearchInput } from "@/components/SearchInput";
import { TransactionsTable } from "@/components/Transactions/TransactionsTable";
import { useTransactionsData } from "@/hooks/useTransactionsData";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  ActionType,
  ERROR,
  MISSING_REQUIRED_FIELDS,
  SUCCESS,
  TRANSACTION_CREATE_SUCCESSFULLY,
} from "@/utils/constants";
import { getFormData } from "@/utils/getformdata";
import { isEmptyObject } from "@/utils/isEmptyObject";
import { useNotificationStore } from "@/store/notifications";
import { AddTransactionModal } from "@/components/Transactions/AddTransactionModal";
import { ShowTransactionModal } from "@/components/Transactions/ShowTransactionModal";
import { useAccountList } from "@/hooks/use-account-list";
import { Paginator } from "@/components/common/Paginator";

export default function Transactions({ action, params }) {
  const buttonRef = useRef(null);
  const [options, setOptions] = useState({ action, params });
  const { transactions, createTransaction, transaction, error, info } =
    useTransactionsData({ action: options.action, params: options.params });
  const [inputValue, setInputValue] = useState("");
  const { accounts, loading: accountLoading } = useAccountList({
    term: inputValue,
  });
  const [value, setValue] = useState({});

  const handleAccountTermChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAccountChange = (event, newValue) => {
    setValue(newValue);
  };

  const notificationShow = useNotificationStore(
    (state) => state.notificationShow
  );

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = getFormData(form);

    const { search } = formData;

    setOptions((state) => ({
      action: state.action,
      params: { ...state.params, search, page: undefined },
    }));
  };

  const handleCreateDialog = (event) => {
    event.preventDefault();

    setOptions((prevState) => ({
      action: ActionType.ADD,
      params: {
        page: prevState.params.page,
      },
    }));
  };

  const handleRowSelect = (target) => (event) => {
    event.preventDefault();

    setOptions((prevState) => ({
      action: target?.action,
      params: {
        page: prevState.params.page,
        ...target?.params,
      },
    }));
  };

  const resetOptions = () => {
    setOptions((prevState) => ({
      action: ActionType.LIST,
      params: {
        page: prevState.params.page,
      },
    }));
  };

  const handleClose = (event) => {
    event.preventDefault();

    enabledConfirmButton;

    resetOptions();
  };

  const handleCreateTransaction = async (event) => {
    event.preventDefault();

    disabledConfirmButton();

    const form = event.target;
    const isValid = form.checkValidity();

    if (!isValid) {
      notificationShow({
        message: MISSING_REQUIRED_FIELDS,
        notificationType: ERROR,
      });
      return;
    }

    const data = getFormData(form);

    const { id: accountId } = value;

    const transactionData = { ...data, accountId };

    await createTransaction(transactionData);

    checkMessage();
  };

  const getTransactionError = () => {
    let message, notificationType;

    if (error && !isEmptyObject(error)) {
      message = error?.message;
      notificationType = ERROR;
    } else {
      if (transaction && !isEmptyObject(transaction)) {
        message = TRANSACTION_CREATE_SUCCESSFULLY;
        notificationType = SUCCESS;
      }
    }

    return {
      message,
      notificationType,
    };
  };

  const checkMessage = () => {
    const { message, notificationType } = getTransactionError();

    if (message && notificationType)
      notificationShow({
        message,
        notificationType,
      });

    resetOptions();
  };

  const hanglePageChange = (event, value) => {
    setOptions((prevState) => ({
      ...prevState,
      params: {
        ...prevState.params,
        page: value,
      },
    }));
  };

  const disabledConfirmButton = () => {
    if (buttonRef?.current) {
      buttonRef.current.disabled = true;
    }
  };

  const enabledConfirmButton = () => {
    if (buttonRef?.current) {
      buttonRef.current.disabled = false;
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="end"
        alignItems="center"
      >
        <Box component="form" onSubmit={handleSearchSubmit}>
          <SearchInput name="search" placeholder={"Buscar"} />
        </Box>
        <Box component="form">
          <NewButton
            label={"Agregar"}
            id="newBtn"
            onClick={handleCreateDialog}
          />
        </Box>
      </Stack>
      <TransactionsTable rows={transactions} onSelect={handleRowSelect} />
      {transactions && (
        <Paginator
          id="paginator"
          pages={info?.pages}
          current={info?.current}
          onChange={hanglePageChange}
        />
      )}
      <AddTransactionModal
        showModal={ActionType.ADD === options.action}
        accountTerm={inputValue}
        accounts={accounts}
        account={value}
        accountLoading={accountLoading}
        onAccountTermChange={handleAccountTermChange}
        onAccountChange={handleAccountChange}
        onSubmit={handleCreateTransaction}
        onClose={handleClose}
        buttonRef={buttonRef}
      />
      <ShowTransactionModal
        showModal={ActionType.SHOW === options.action}
        transaction={options.params}
        accountTerm={inputValue}
        accounts={accounts}
        account={value}
        accountLoading={accountLoading}
        onAccountTermChange={handleAccountTermChange}
        onAccountChange={handleAccountChange}
        onClose={handleClose}
      />
    </>
  );
}
