import { useState } from 'react'

const useInput = (validator) => {
	const [input, setInput] = useState('')

	const isValid = () => {
		return validator(input)
	}

	return [input, setInput, isValid]
}

export default useInput
