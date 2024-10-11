import React, { Fragment, useState } from 'react'

export const EditTodo = ({ todo }) => {
	const [description, setDescription] = useState(todo.description)

	const updateDescription = async () => {
		try {
			await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ description }),
			})

			window.location.reload()
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<Fragment>
			<button
				type='button'
				className='btn btn-warning'
				data-toggle='modal'
				data-target={`#id${todo.todo_id}`}
			>
				Edit
			</button>
			<div
				className='modal'
				id={`id${todo.todo_id}`}
				onClick={() => setDescription(todo.description)}
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Edit todo</h4>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								onClick={() => setDescription(todo.description)}
							>
								&times;
							</button>
						</div>

						<div className='modal-body'>
							<input
								type='text'
								className='form-control'
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</div>

						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-success'
								data-dismiss='modal'
								onClick={updateDescription}
							>
								Edit
							</button>
							<button
								type='button'
								className='btn btn-danger'
								data-dismiss='modal'
								onClick={() => setDescription(todo.description)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}
