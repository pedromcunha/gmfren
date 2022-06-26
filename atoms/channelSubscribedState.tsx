import { atom } from 'recoil'

const channelSubscribedState = atom({
  key: 'channelState',
  default: false,
})

export default channelSubscribedState
