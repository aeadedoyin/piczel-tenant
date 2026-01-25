<script setup lang="ts">
useHead({
  title: 'Preferences | Piczel',
})

const language = ref('english')
const filenameDisplay = ref('show')
const searchVisibility = ref('homepage')
const sharpening = ref('optimal')
const rawSupport = ref(false)
const cookieBanner = ref(false)
</script>

<template>
  <div class="max-w-xl space-y-10">
    <!-- Default Collection Language -->
    <section>
      <h3 class="text-sm font-medium">
        Default Collection Language
      </h3>
      <ShadSelect v-model="language">
        <ShadSelectTrigger class="mt-3">
          <ShadSelectValue placeholder="Select language" />
        </ShadSelectTrigger>
        <ShadSelectContent>
          <ShadSelectItem value="english">
            English
          </ShadSelectItem>
          <ShadSelectItem value="french">
            French
          </ShadSelectItem>
          <ShadSelectItem value="spanish">
            Spanish
          </ShadSelectItem>
          <ShadSelectItem value="german">
            German
          </ShadSelectItem>
          <ShadSelectItem value="portuguese">
            Portuguese
          </ShadSelectItem>
        </ShadSelectContent>
      </ShadSelect>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        Select the default language for newly created collections. You can still change it later in
        each collection's settings.
      </p>
    </section>

    <!-- Filename Display -->
    <section>
      <h3 class="text-sm font-medium">
        Filename Display
      </h3>
      <ShadSelect v-model="filenameDisplay">
        <ShadSelectTrigger class="mt-3">
          <ShadSelectValue placeholder="Select option" />
        </ShadSelectTrigger>
        <ShadSelectContent>
          <ShadSelectItem value="show">
            Show
          </ShadSelectItem>
          <ShadSelectItem value="hide">
            Hide
          </ShadSelectItem>
        </ShadSelectContent>
      </ShadSelect>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        You can choose to show / hide your filenames on photos in your collections.
      </p>
    </section>

    <!-- Search Engine Visibility -->
    <section>
      <h3 class="text-sm font-medium">
        Search Engine Visibility
      </h3>
      <ShadSelect v-model="searchVisibility">
        <ShadSelectTrigger class="mt-3">
          <ShadSelectValue placeholder="Select option" />
        </ShadSelectTrigger>
        <ShadSelectContent>
          <ShadSelectItem value="homepage">
            Homepage Only
          </ShadSelectItem>
          <ShadSelectItem value="all">
            All Pages
          </ShadSelectItem>
          <ShadSelectItem value="none">
            None
          </ShadSelectItem>
        </ShadSelectContent>
      </ShadSelect>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        Choose whether you want your collections to be searchable on search engines (e.g. Google).
        <a
          class="
            text-emerald-500
            hover:underline
          " href="#"
        >Learn more</a>
      </p>
    </section>

    <!-- Sharpening Level -->
    <section>
      <h3 class="text-sm font-medium">
        Sharpening Level
      </h3>
      <ShadSelect v-model="sharpening">
        <ShadSelectTrigger class="mt-3">
          <ShadSelectValue placeholder="Select level" />
        </ShadSelectTrigger>
        <ShadSelectContent>
          <ShadSelectItem value="none">
            None
          </ShadSelectItem>
          <ShadSelectItem value="low">
            Low
          </ShadSelectItem>
          <ShadSelectItem value="optimal">
            Optimal
          </ShadSelectItem>
          <ShadSelectItem value="high">
            High
          </ShadSelectItem>
        </ShadSelectContent>
      </ShadSelect>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        This setting only applies to web display copies of your photos. Your originals are not altered.
        <a
          class="
            text-emerald-500
            hover:underline
          " href="#"
        >Learn more</a>
      </p>
    </section>

    <!-- RAW Photo Support -->
    <section>
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium">
          RAW Photo Support
        </h3>
        <ShadButton
          class="
            h-8 gap-1.5 border-emerald-500/30 text-emerald-500
            hover:bg-emerald-500/10
          " size="sm" variant="outline"
        >
          <LucideSparkles class="size-3.5" />
          Upgrade
        </ShadButton>
      </div>
      <div class="mt-3 flex items-center gap-3">
        <ShadSwitch
          v-model:checked="rawSupport"
          class="data-[state=checked]:bg-emerald-500"
        />
        <span class="text-sm text-muted-foreground">{{ rawSupport ? 'On' : 'Off' }}</span>
      </div>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        <span class="font-medium text-foreground">Pro Feature:</span> Enable RAW photos to be included in your galleries alongside other file formats.
      </p>
    </section>

    <!-- Terms of Service -->
    <section>
      <h3 class="text-sm font-medium">
        Terms of Service
      </h3>
      <div class="mt-3 overflow-hidden rounded-lg border border-border">
        <div
          class="
            flex items-center gap-1 border-b border-border bg-muted/30 px-3 py-2
          "
        >
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideBold class="size-4" />
          </button>
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideItalic class="size-4" />
          </button>
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideUnderline class="size-4" />
          </button>
          <div class="mx-1 h-4 w-px bg-border" />
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideLink class="size-4" />
          </button>
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideUnlink class="size-4" />
          </button>
        </div>
        <ShadTextarea
          class="
            min-h-32 resize-none rounded-none border-0
            focus-visible:ring-0
          "
          placeholder="Enter your terms of service..."
        />
      </div>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        Set the Terms of Service that your customers are subject to. This will be shown in the footer of your collections.
      </p>
    </section>

    <!-- Privacy Policy -->
    <section>
      <h3 class="text-sm font-medium">
        Privacy Policy
      </h3>
      <div class="mt-3 overflow-hidden rounded-lg border border-border">
        <div
          class="
            flex items-center gap-1 border-b border-border bg-muted/30 px-3 py-2
          "
        >
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideBold class="size-4" />
          </button>
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideItalic class="size-4" />
          </button>
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideUnderline class="size-4" />
          </button>
          <div class="mx-1 h-4 w-px bg-border" />
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideLink class="size-4" />
          </button>
          <button
            class="
              rounded-sm p-1.5 text-muted-foreground
              hover:bg-muted hover:text-foreground
            "
          >
            <LucideUnlink class="size-4" />
          </button>
        </div>
        <ShadTextarea
          class="
            min-h-32 resize-none rounded-none border-0
            focus-visible:ring-0
          "
          placeholder="Enter your privacy policy..."
        />
      </div>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        Set the Privacy Policy that your customers are subject to. This will be shown in the footer of your collections.
      </p>
    </section>

    <!-- Enable Cookie Banner -->
    <section>
      <h3 class="text-sm font-medium">
        Enable Cookie Banner
      </h3>
      <div class="mt-3 flex items-center gap-3">
        <ShadSwitch
          v-model:checked="cookieBanner"
          class="data-[state=checked]:bg-emerald-500"
        />
        <span class="text-sm text-muted-foreground">{{ cookieBanner ? 'On' : 'Off' }}</span>
      </div>
      <p class="mt-3 text-sm/relaxed text-muted-foreground">
        Enable banner to notify visitors that your site uses cookies. This will only appear for EU visitors.
      </p>
    </section>
  </div>
</template>
