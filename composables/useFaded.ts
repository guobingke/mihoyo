function isNotIndexPage(page: unknown) {
  return page !== undefined && page !== "index" && page !== "product" && page !== null && page !== "" && page !== "/"
}

function getFirstElement(className: string) {
  return document.getElementsByClassName(className)[0] as HTMLElement | undefined
}

export function useFaded(className: string, isRender: Ref<boolean>) {
  const route = useRoute()
  isRender.value = isNotIndexPage(route.query.page)

  watch(
    () => route.query.page,
    (nextPage) => {
      if (!isNotIndexPage(nextPage)) {
        const element = getFirstElement(className)
        element?.classList.add("fade-leave-active", "fade-leave-to")
        setTimeout(() => {
          isRender.value = isNotIndexPage(nextPage)
        }, 400)
        return
      }

      isRender.value = true
      nextTick(() => {
        const element = getFirstElement(className)
        element?.classList.add("fade-enter-active", "fade-enter-to")
        setTimeout(() => element?.classList.remove("fade-enter-to"), 40)
        setTimeout(() => element?.classList.remove("fade-enter-active"), 200)
      })
    }
  )
}
