import create from "zustand";

export interface ExcerciseState {
  excercises: {
    title: string;
    description: string;
    referenceQuery: string;
    tablesOfInterest: string[];
    solutionQuery?: string;
  }[];
  selectedExcercise: number;
  firstExcercise: () => void;
  nextExcercise: () => void;
  prevExcercise: () => void;
  lastExcercise: () => void;
}

export const useExcerciseStore = create<ExcerciseState>((set) => ({
  excercises: [
    {
      title: "Задача 1",
      description: "Запросик",
      referenceQuery: "SELECT * FROM test",
      tablesOfInterest: ["test"],
    },
  ],
  selectedExcercise: 0,
  firstExcercise: () => set({ selectedExcercise: 0 }),
  nextExcercise: () =>
    set((state) => ({
      selectedExcercise: Math.min(
        state.excercises.length - 1,
        state.selectedExcercise + 1
      ),
    })),
  prevExcercise: () =>
    set((state) => ({
      selectedExcercise: Math.max(0, state.selectedExcercise - 1),
    })),
  lastExcercise: () =>
    set((state) => ({ selectedExcercise: state.excercises.length - 1 })),
}));
