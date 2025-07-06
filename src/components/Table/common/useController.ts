import React from 'react'

const useController = () => {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  })
  const pageSizeOptions = React.useMemo(() => [25, 50, 100, 200], [])
  const dataGridRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (dataGridRef?.current) {
      const mainContent = dataGridRef.current.querySelector(
        '.MuiDataGrid-mainContent',
      )
      if (mainContent) {
        const main = mainContent.querySelector('.MuiDataGrid-main')
        if (main && main.lastElementChild) {
          const lastChild = main.lastElementChild
          if (lastChild instanceof HTMLElement) {
            lastChild.style.display = 'none'
          }
        }
      }
    }
  }, [dataGridRef])
  return {
    paginationModel,
    setPaginationModel,
    pageSizeOptions,
    dataGridRef,
  }
}

export default useController
