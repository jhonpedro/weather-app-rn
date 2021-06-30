import { useSelector } from 'react-redux'

const useSearch = () => useSelector((state) => state.search)

export default useSearch
