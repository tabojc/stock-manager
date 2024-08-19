import { ActionType, ModuleType } from "../constants";

export const mapModulesToActions = ({ action }) => {
  if (action === ModuleType.PAYMENT || action === ModuleType.RECEIPT) {
    return ActionType.ADD;
  }
  return action;
};
