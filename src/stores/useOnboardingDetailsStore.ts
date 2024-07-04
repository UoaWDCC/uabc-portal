import { create } from "zustand";

interface OnboardingDetailsState {
  firstName: string;
  lastName: string;
  member: boolean | null;
}

interface OnboardingDetailsAction {
  setFirstName: (firstName: OnboardingDetailsState["firstName"]) => void;
  setLastName: (lastName: OnboardingDetailsState["lastName"]) => void;
  setMember: (member: boolean) => void;
}

export const useOnboardingDetailsStore = create<
  OnboardingDetailsState & OnboardingDetailsAction
>((set) => ({
  firstName: "",
  lastName: "",
  member: null,
  setFirstName: (firstName) => set(() => ({ firstName: firstName })),
  setLastName: (lastName) => set(() => ({ lastName: lastName })),
  setMember: (member) => set(() => ({ member: member })),
}));
