import { create } from "zustand";

export type BaseDate = {
  baseDate: Date
  set: (date: Date) => void
}

export const useBaseDate = create<BaseDate>((set, get) => ({
  baseDate: new Date(),
  set: date => {
    const copy = new Date(get().baseDate)
    copy.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
    set({ baseDate: copy })
  }
}))
