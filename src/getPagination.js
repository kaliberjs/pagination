export function getPagination({ padding, current, max }) {
  const min = 1
  const { leftPage, rightPage } = determineLeftAndRight()
  
  const availablePages = sequence(max).map(i => i + 1)
  const visiblePages = availablePages.filter(shouldShow)
  return insertNullToIndicateGap(visiblePages)

  function shouldShow(page) {
    return page === min || page === max || (page >= leftPage && page <= rightPage)
  }

  function insertNullToIndicateGap(pages) {
    return pages.reduce(
      (result, x, i, array) => {
        const previous = array[i - 1]
        const insertGapIndicator = previous && previous !== x - 1
        return result.concat(insertGapIndicator ? [null, x] : [x])
      },
      []
    )
  }
  
  function determineLeftAndRight() {
    const [leftPage, rightPage]  = [current - padding, current + padding]
    
    const [missingLeftPages, missingRightPages] = [
      Math.max(0, rightPage - (max - 2)), 
      Math.max(0, (min + 2) - leftPage)
    ] 
    
    return { leftPage: leftPage - missingLeftPages, rightPage: rightPage + missingRightPages }
  }
}

function sequence(n) {
  return Array.from(Array(n), (_, i) => i)
}