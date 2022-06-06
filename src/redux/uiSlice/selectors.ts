import { allowSkeletons } from "@/src/utils/constants"

import type { RootState } from "../store"

export const selectShowSkeleton = (state: RootState) => {
  if (allowSkeletons) {
    return !state.ui.appLoaded
  }

  return false
}
