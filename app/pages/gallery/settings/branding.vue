<script setup lang="ts">
import { Button } from '@/components/shadcn-ui/button'
import { Input } from '@/components/shadcn-ui/input'
import { Label } from '@/components/shadcn-ui/label'
import { Switch } from '@/components/shadcn-ui/switch'

definePageMeta({
  title: 'Branding - Gallery Settings',
})

const auth = useAuth()
const username = computed(() => auth.user?.name?.toLowerCase().replace(/\s+/g, '') || 'yourname')

const piczelBranding = ref(true)
</script>

<template>
  <div class="max-w-xl space-y-12">
    <!-- Domain -->
    <section class="space-y-3">
      <h3 class="text-sm font-medium">Domain</h3>
      <div class="rounded-lg bg-muted/80 px-4 py-3.5">
        <span class="text-sm">{{ username }}.piczel.io</span>
      </div>
      <p class="text-sm leading-relaxed text-muted-foreground">
        Your client galleries and mobile gallery apps are always available with your default site
        address. To change your default domain, edit your username under
        <NuxtLink to="/settings/account" class="text-emerald-500 hover:underline">
          Account
        </NuxtLink>.
      </p>
    </section>

    <!-- Custom Domain -->
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium">Custom Domain</h3>
        <Button variant="outline" size="sm" class="h-8 gap-1.5 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10">
          <LucideSparkles class="size-3.5" />
          Upgrade
        </Button>
      </div>
      <Input
        placeholder="www.yourdomain.com"
        disabled
        class="bg-muted/80"
      />
      <p class="text-sm leading-relaxed text-muted-foreground">
        Use your own custom domain for your client galleries. This feature is available with an
        upgraded account.
        <a href="#" class="text-emerald-500 hover:underline">Learn more</a>
      </p>
    </section>

    <!-- Upgrade Card -->
    <section class="overflow-hidden rounded-2xl border border-border/50 bg-card px-8 py-8">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold">
              Upgrade for more brand control
            </h3>
            <p class="mt-2 text-sm text-muted-foreground">
              Upgrade to a paid plan to add your full logo, custom favicon and more.
            </p>
          </div>
          <Button variant="outline" size="sm" class="h-8 shrink-0 gap-1.5 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10">
            <LucideSparkles class="size-3.5" />
            Upgrade
          </Button>
        </div>

        <!-- Logos -->
        <div class="mt-12">
          <h4 class="text-sm font-semibold">Logos</h4>
          <button
            class="
              mt-4 flex h-32 w-32 items-center justify-center rounded-2xl
              border-2 border-dashed border-border bg-muted/30
              text-muted-foreground/50 transition-all duration-200
              hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500/70
            "
          >
            <LucidePlus class="size-10 stroke-[1.5]" />
          </button>
          <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
            Your logo will be used in place of the text logo and profile icon, including on the
            white background of your homepage. For the cover logo, use a light/white logo
            with a transparent background for best display.
            <a href="#" class="text-emerald-500 hover:underline">Learn more</a>
          </p>
        </div>

        <!-- Favicon -->
        <div class="mt-12">
          <h4 class="text-sm font-semibold">Favicon</h4>
          <button
            class="
              mt-4 flex h-32 w-32 items-center justify-center rounded-2xl
              border-2 border-dashed border-border bg-muted/30
              text-muted-foreground/50 transition-all duration-200
              hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500/70
            "
          >
            <LucidePlus class="size-10 stroke-[1.5]" />
          </button>
          <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
            You can upload a GIF, PNG or ICO file up to 32x32 pixels.
            <a href="#" class="text-emerald-500 hover:underline">Learn more</a>
          </p>
        </div>

        <!-- Piczel Branding Toggle -->
        <div class="mt-12">
          <h4 class="text-sm font-semibold">Piczel Branding</h4>
          <div class="mt-4 flex items-center gap-3">
            <Switch
              v-model:checked="piczelBranding"
              class="data-[state=checked]:bg-emerald-500"
            />
            <span class="text-sm text-muted-foreground">{{ piczelBranding ? 'On' : 'Off' }}</span>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
            Switching this off will hide Piczel branding from your collections and homepage.
          </p>
        </div>
    </section>
  </div>
</template>
