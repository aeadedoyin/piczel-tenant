<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbSegment {
  title: string
  href?: string
}

const route = useRoute()

// Generate breadcrumbs from route path
const breadcrumbs = computed<BreadcrumbSegment[]>(() => {
  const segments = route.path.split('/').filter(Boolean)
  const result: BreadcrumbSegment[] = []

  let currentPath = ''
  segments.forEach((segment, i) => {
    currentPath += `/${segment}`

    // Capitalize and format segment name
    const title = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Last segment is current page (no link)
    if (i === segments.length - 1) {
      result.push({ title })
    }
    else {
      result.push({ title, href: currentPath })
    }
  })

  return result
})
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.title">
        <BreadcrumbItem :class="{ 'hidden md:block': index < breadcrumbs.length - 1 }">
          <BreadcrumbLink v-if="crumb.href" as-child>
            <NuxtLink :to="crumb.href">
              {{ crumb.title }}
            </NuxtLink>
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ crumb.title }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator
          v-if="index < breadcrumbs.length - 1"
          :class="{ 'hidden md:block': index < breadcrumbs.length - 2 }"
        />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
