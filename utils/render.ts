import { NIcon } from 'naive-ui'
import { h } from 'vue'
import type { Component } from 'vue'

export const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}