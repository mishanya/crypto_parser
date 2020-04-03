export default async function () {

 	let socket = new WebSocket('wss://stream.binance.com/stream?streams=!miniTicker@arr');
	
	socket.onmessage = (e) => {
		try {
			let response = JSON.parse(e.data).data;
			return this.updateData(response);
		} catch (err) {
			this.setState({
				message: 'No valid response'
			})
		}
	}

	socket.onerror = () => this.setState({
		message: 'Connection failed'
	})

	// we save socket data in case of connection to state
  socket.onopen = () => this.setState({
  	WSParams: {
  		opened: true,
  		socket,
  		close: () => socket.close(1000, 'User closed the connection'),
  		error: null
  	}
  })


  // clean the socket data on close
	socket.onclose = (e) => this.setState({
		WSParams: {
			opened: false,
			socket: null,
			close: null,
			error: e.wasClean ? null : 'Connection interrupted'

		}
	})


}