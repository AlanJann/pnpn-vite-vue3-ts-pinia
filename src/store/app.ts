import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const piniaState = 'pinia 字符串'

  return {
    piniaState
  }
})