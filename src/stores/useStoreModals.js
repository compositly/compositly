// zunstand
import { create } from 'zustand'

const initialState = {
  modals: {
    testModal: { show: false },
    iconUrlEditableModal: { show: false },
  },
}

/**
 * Example of use on a component:
 * import { useStoreModals } from 'stores/useStoreModals'
 * function Component() {
 *   const { modals, setModal } = useStoreModals()
 *   return (
 *     <div>
 *       <NamedModal />
 *     </div>
 * }
 */
export const useStoreModals = create((set) => ({
  ...initialState,
  setModal: (modal, config = {}) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: { ...state.modals[modal], ...config },
      },
    }))
  },
  openModal: (modal) =>
    set((state) => ({
      modals: {
        ...initialState.modals,
        ...state.modals,
        [modal]: { show: true },
      },
    })),
  closeModal: (modal) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: {
          show: false,
        },
      },
    })),
}))
