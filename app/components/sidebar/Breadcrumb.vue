<script setup lang="ts">
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
  <ShadBreadcrumb>
    <ShadBreadcrumbList>
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.title">
        <ShadBreadcrumbItem :class="{ 'hidden md:block': index < breadcrumbs.length - 1 }">
          <ShadBreadcrumbLink v-if="crumb.href" as-child>
            <NuxtLink :to="crumb.href">
              {{ crumb.title }}
            </NuxtLink>
          </ShadBreadcrumbLink>
          <ShadBreadcrumbPage v-else>
            {{ crumb.title }}
          </ShadBreadcrumbPage>
        </ShadBreadcrumbItem>
        <ShadBreadcrumbSeparator
          v-if="index < breadcrumbs.length - 1"
          :class="{ 'hidden md:block': index < breadcrumbs.length - 2 }"
        />
      </template>
    </ShadBreadcrumbList>
  </ShadBreadcrumb>
</template>
