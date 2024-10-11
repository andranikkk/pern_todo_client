import React, { Fragment, useEffect, useState } from 'react'
import { EditTodo } from './EditTodo'

const ListTodo = () => {
	const [todos, setTodos] = useState([])

	const getTodos = async () => {
		try {
			const response = await fetch('http://localhost:5000/todos')
			const jsonData = await response.json()
			console.log(jsonData, 'jsonData from listTodo component')

			setTodos(jsonData)
		} catch (error) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	const deleteTodo = async id => {
		try {
			await fetch(`http://localhost:5000/todos/${id}`, {
				method: 'DELETE',
			})

			setTodos(todos.filter(todo => todo.todo_id !== id))
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<Fragment>
			<div className='container'>
				<table className='table mt-5 text-center'>
					<thead>
						<tr>
							<th>Description</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{todos.map(todo => (
							<tr key={todo.todo_id}>
								<td>{todo.description}</td>
								<td>
									<EditTodo todo={todo} />
								</td>
								<td>
									<button
										onClick={() => deleteTodo(todo.todo_id)}
										className='btn btn-danger'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Fragment>
	)
}

export default ListTodo
