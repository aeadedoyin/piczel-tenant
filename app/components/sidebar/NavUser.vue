<script setup lang="ts">
import type { User } from '@/types/navigation'

defineProps<{
  user: User
}>()

const auth = useAuth()
const { isMobile } = useSidebar()

async function handleSignOut() {
  await auth.signOut()
}
</script>

<template>
  <ShadSidebarMenu>
    <ShadSidebarMenuItem>
      <ShadDropdownMenu>
        <ShadDropdownMenuTrigger as-child>
          <ShadSidebarMenuButton
            class="
              data-[state=open]:bg-sidebar-accent
              data-[state=open]:text-sidebar-accent-foreground
            "
            size="lg"
          >
            <ShadAvatar class="size-8 rounded-lg">
              <ShadAvatarImage v-if="user.avatar" :alt="user.name" :src="user.avatar" />
              <ShadAvatarFallback class="rounded-lg">
                {{ getInitials(user.name) }}
              </ShadAvatarFallback>
            </ShadAvatar>
            <div class="grid flex-1 text-left text-sm/tight">
              <span class="truncate font-medium">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <LucideChevronsUpDown class="ml-auto size-4" />
          </ShadSidebarMenuButton>
        </ShadDropdownMenuTrigger>
        <ShadDropdownMenuContent
          align="end"
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <ShadDropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <ShadAvatar class="size-8 rounded-lg">
                <ShadAvatarImage v-if="user.avatar" :alt="user.name" :src="user.avatar" />
                <ShadAvatarFallback class="rounded-lg">
                  {{ getInitials(user.name) }}
                </ShadAvatarFallback>
              </ShadAvatar>
              <div class="grid flex-1 text-left text-sm/tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </ShadDropdownMenuLabel>
          <ShadDropdownMenuSeparator />
          <ShadDropdownMenuGroup>
            <ShadDropdownMenuItem as-child>
              <NuxtLink to="/settings/profile">
                <LucideBadgeCheck class="mr-2 size-4" />
                Account
              </NuxtLink>
            </ShadDropdownMenuItem>
            <ShadDropdownMenuItem as-child>
              <NuxtLink to="/settings/payments">
                <LucideCreditCard class="mr-2 size-4" />
                Billing
              </NuxtLink>
            </ShadDropdownMenuItem>
            <ShadDropdownMenuItem as-child>
              <NuxtLink to="/settings">
                <LucideSettings class="mr-2 size-4" />
                Settings
              </NuxtLink>
            </ShadDropdownMenuItem>
          </ShadDropdownMenuGroup>
          <ShadDropdownMenuSeparator />
          <ShadDropdownMenuItem @click="handleSignOut">
            <LucideLogOut class="mr-2 size-4" />
            Log out
          </ShadDropdownMenuItem>
        </ShadDropdownMenuContent>
      </ShadDropdownMenu>
    </ShadSidebarMenuItem>
  </ShadSidebarMenu>
</template>
