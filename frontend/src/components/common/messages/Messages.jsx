import React, { useState } from 'react';
import { BsChatSquareTextFill, BsFillTrashFill } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';


const Messages = ({ loggedInUserId, loggedInFirstName }) => {
	const [users, setUsers] = useState([]);

	const [selectedUser, setSelectedUser] = useState();
	const [newMessage, setNewMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const fetchUserMessages = async (userId) => {
		try {
			const response = await fetch(`https://localhost:8443/messages/user/${userId}`);
			if (response.ok) {
				const messages = await response.json();
				setMessages(messages);
			} else {
				throw new Error('Failed to fetch user messages');
			}
		} catch (error) {
			console.error(error);
		}

		try {
			const response = await fetch(`https://localhost:8443/messages/users/${userId}`);
			if (response.ok) {
				const users = await response.json();
				setUsers(users);
				setSelectedUser(users[0]);
			} else {
				throw new Error('Failed to fetch users');
			}
		} catch (error) {
			console.error(error);
		}

	};

	React.useEffect(() => {
		fetchUserMessages(loggedInUserId);
	}, []);


	const handleUserClick = (user) => {
		setSelectedUser(user);
	};

	const getUserMessages = (userId) => {
		return messages.filter(
			(message) =>
				message.senderId === userId || message.recipientId === userId
		);
	};


	const handleInputChange = (event) => {
		setNewMessage(event.target.value);
	};

	const handleSendMessage = async () => {
		if (newMessage.trim() === '') return;

		const newMessageObj = {
			senderId: loggedInUserId,
			recipientId: selectedUser.id,
			content: newMessage,
		};

		try {
			const response = await fetch('https://localhost:8443/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newMessageObj),
			});

			if (response.ok) {
				// Message send successfully, update the state or fetch the updated messages
				fetchUserMessages(loggedInUserId);
				setNewMessage('');
			} else {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			console.error(error);

		}
	};


	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSendMessage();
		}
	};

	const handleDeleteMessage = async (messageId) => {
		try {
			const response = await fetch(`https://localhost:8443/messages/${messageId}`, {
				method: 'DELETE',
			});

			if (response.ok) {
				// Message deleted successfully, update the state or fetch the updated messages
				fetchUserMessages(loggedInUserId);
			} else {
				throw new Error('Failed to delete message');
			}
		} catch (error) {
			console.error(error);
		}
	};


	return (
		<div className="container mx-auto min-h-screen bg-gray-100 shadow-lg pt-10 rounded-lg">
			<div className="flex justify-center items-center gap-x-5 text-blue1 font-bold text-3xl">
				<BsChatSquareTextFill />
				Messages
			</div>
			<div className="flex h-screen antialiased text-gray-800">
				<div className="flex flex-row h-full w-full overflow-x-auto">
					<div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
						<div className="flex flex-col mt-8">
							<div className="flex flex-row items-center justify-between text-sm">
								<div className="ml-2 font-bold text-2xl">Conversations</div>
								<span className="flex items-center justify-center bg-gray-300 h-4 w-4 p-3 font-semibold rounded-full">
									{users.length ? users.length : 0}
								</span>
							</div>
							<div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-auto">
								{users.map((user) =>
									user.id !== loggedInUserId && (
										<button
											key={user.id}
											className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${selectedUser && selectedUser.id === user.id ? 'bg-indigo-100' : ''
												}`}
											onClick={() => handleUserClick(user)}
										>
											<div className="flex items-center justify-center h-8 w-8 font-semibold bg-indigo-200 rounded-full">
												{user.name.charAt(0)}
											</div>
											<div className="ml-2 text-md font-semibold">{user.name}</div>
										</button>
									)
								)}
							</div>
						</div>
					</div>
					<div className="flex flex-col flex-auto h-full p-6">
						<div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
							<div className="flex flex-col h-full overflow-auto mb-4">
								{selectedUser ? (
									<>
										<div className="font-bold mb-2">{selectedUser.name}</div>
										{getUserMessages(selectedUser.id).map((message) => (
											<div
												key={message.id}
												className={`flex gap-2 ${message.senderId === loggedInUserId ? 'justify-end' : 'justify-start'
													}`}
											>
												{message.senderId !== loggedInUserId && (
													<div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200">
														{selectedUser.name.charAt(0)}
													</div>
												)}
												<div
													className={`relative p-3 max-w-xs rounded-xl shadow ${message.senderId === loggedInUserId ? 'bg-indigo-100' : 'bg-white'
														}`}
												>
													{message.content}
												</div>
												{message.senderId === loggedInUserId && (
													<div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500">
														{loggedInFirstName.charAt(0)}
													</div>
												)}
												{(message.senderId === loggedInUserId || message.senderId !== loggedInUserId) && (
													<button className="text-red-500" onClick={() => handleDeleteMessage(message.id)}>
														<BsFillTrashFill />
													</button>
												)}
											</div>
										))}
									</>
								) : (
									<div className="text-xl">Select a user to view messages</div>
								)}
							</div>
							<div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
								<div className="flex-grow ml-4">
									<div className="relative w-full">
										<input
											type="text"
											value={newMessage}
											onChange={handleInputChange}
											className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
											onKeyDown={handleKeyDown}
											placeholder="Type a message..."
										/>
									</div>
								</div>
								<div className="ml-4">
									{users.length ? (
										<button
											onClick={handleSendMessage}
											className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 mt-2"
										>
											<span>Send</span>
											<span className="ml-2">
												<TbSend />
											</span>
										</button>
									) : (
										<div className="flex items-center justify-center bg-gray-400 border-1 border-gray-800 rounded-xl text-white px-4 py-1 mt-2">
											<span>Send</span>
											<span className="ml-2">
												<TbSend />
											</span>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Messages;
