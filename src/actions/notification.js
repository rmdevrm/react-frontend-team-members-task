import { createAction } from 'redux-actions'

import { RESET_NOTIFICATION } from './actionTypes'

export const resetNotification = createAction(
  RESET_NOTIFICATION,
  () => null
)
