class Users {
	/*
	 | --------------------------------------------------------
	 | State
	 | --------------------------------------------------------
	 */
	
	state() {
		return {
			id: 3,
			status: 'Add',
			newuser: { name: '', username: '' },
			users: {
				1: { name: 'Abdelrahman Salem', username: '@abubakir1997' },
				2: { name: 'Enes Sezen', username: '@esezen' },
				3: { name: 'Omar Salem', username: '@omar94' }
			}
		}
	}

	/*
	 | --------------------------------------------------------
	 | Helpers
	 | --------------------------------------------------------
	 */

	getMaxId(payload) {
		const ids = Object.keys(payload)
		const lastId = Number(ids[ids.length - 1])

		return lastId ? lastId : 0
	}

	getUser(id, type = null) {
		var user = this.state().users[id]

		if (user === undefined) {
			user = { name: 'DNE', username: '@dne' }
		}

		return type === null ? user : user[type]
	}

	/*
	 | --------------------------------------------------------
	 | Actions
	 | --------------------------------------------------------
	 */

	updateUser(state, id) {
		return {
			...state,
			id: Number(id),
			status: 'Update',
			newuser: state.users[id]
		}
	}

	delUser(state, id) {
		const users = {}
		const obj = Object.keys(state.users).map(i => {
			if(i !== id) {
				users[i] = state.users[i]
			}
		})

		return {
			...state,
			id: this.getMaxId(users) + 1,
			users
		}
	}

	addUser(state) {
		const name = state.newuser.name.trim()
		const username = state.newuser.username.trim()

		return {
			...state,
			id: state.id + 1,
			status: 'Add',
			users: {
				...state.users,
				[state.id] : {
					name: name.length > 0 ? name : 'Empty',
					username: username.length > 1 ? username : '@empty'
				}
			}
		}
	}

	updateNewUser(state, payload) {
		return {
			...state,
			newuser: {
				...state.newuser,
				...payload
			}
		}
	}
}