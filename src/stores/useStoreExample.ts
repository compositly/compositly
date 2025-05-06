import { create } from 'zustand'
import { Example } from '../interfaces/Example'

interface AgendaState {
  exampleArray: Example[]
  setExampleArray: (exampleArray: Example[]) => void
  selectedExample: Example | null
  setSelectedExample: (example: Example) => void
}

const initialState: Omit<
  AgendaState,
  'setExampleArray' | 'setSelectedExample'
> = {
  exampleArray: [{ id: '1' }, { id: '2' }, { id: '3' }],
  selectedExample: null,
}

export const useStoreAgenda = create<AgendaState>((set) => ({
  ...initialState,
  setExampleArray: (exampleArray) =>
    set((state) => ({ ...state, exampleArray })),
  setSelectedExample: (example) =>
    set((state) => ({ ...state, selectedExample: example })),
}))
