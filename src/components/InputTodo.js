import React, { Fragment, useState } from 'react'

const InputTodo = () => {
	const [description, setDescription] = useState('')

	const onSubmit = async e => {
		e.preventDefault()
		try {
			const body = { description }
			const response = await fetch('http://localhost:5000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})

			console.log(response, 'response from inputTodo component')
			window.location.reload()
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<Fragment>
			<h1 className='text-center mt-5'>Pern todo list</h1>
			<form className='d-flex mt-5 gap-1' onSubmit={onSubmit}>
				<input
					type='text'
					className='form-control text-center'
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder='Add todo'
				/>
				<button className='btn btn-success'>add</button>
			</form>
		</Fragment>
	)
}

export default InputTodo
