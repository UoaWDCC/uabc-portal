import { create } from "zustand";

interface AccountState {
  firstName: string;
  lastName: string;
  member: boolean;
}

interface AccountAction {
  setFirstName: (firstName: AccountState["firstName"]) => void;
  setLastName: (lastName: AccountState["lastName"]) => void;
  setMember: (member: AccountState["member"]) => void;
}

export const useAccountStore = create<AccountState & AccountAction>((set) => ({
  firstName: "",
  lastName: "",
  member: false,
  setFirstName: (firstName) => set(() => ({ firstName: firstName })),
  setLastName: (lastName) => set(() => ({ lastName: lastName })),
  setMember: (member) => set(() => ({ member: member })),
}));
