import type { Component, ConcreteComponent } from 'vue'

export interface NavItem {
  title: string
  url: string
  icon: Component | ConcreteComponent | string
  isActive?: boolean
  items?: NavSubItem[]
}

export interface NavSubItem {
  title: string
  url: string
}

export interface User {
  name: string
  email: string
  avatar?: string
}
