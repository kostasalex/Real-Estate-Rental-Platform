import React, { useState } from 'react';
import { BsChatSquareTextFill } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';

const Messages = ({loggedInUserId, loggedInFirstName}) => {
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchUserMessages = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/messages/user/${userId}`);
      if (response.ok) {
        const messages = await response.json();
        setMessages(messages);
        console.log(messages);
      } else {
        throw new Error('Failed to fetch user messages');
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
    
    try {
      const response = await fetch(`http://localhost:8080/api/v1/messages/users/${userId}`);
      if (response.ok) {
        const users = await response.json();
        setUsers(users);
        setSelectedUser(users[0]);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
    console.log("users : ");
    console.log(users);
    console.log("endof users");

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
      const response = await fetch('http://localhost:8080/api/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessageObj),
      });
  
      if (response.ok) {
        // Message sent successfully, update the state or fetch the updated messages
        fetchUserMessages(loggedInUserId);
        setNewMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto shadow-lg pt-10 rounded-lg">
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
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full  overflow-auto">
                {users.map((user) =>
                  user.id !== loggedInUserId && (
                    <button
                      key={user.id}
                      className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${
                        selectedUser && selectedUser.id === user.id ? 'bg-indigo-100' : ''
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
                        className={`flex flex col gap-y-2 ${
                          message.senderId === loggedInUserId ? 'justify-end' : 'justify-'
                        }`}
                      >
                        <div className="col-start-1 font-semibold col-end-8 p-3 rounded-lg">
                          <div className={`flex flex-row items-center ${
                                message.senderId === loggedInUserId ? 'justify-end' : 'justify-start'
                              } flex-shrink-0`}>
                            {message.senderId !== loggedInUserId && 
                            (<div
                              className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200 flex-shrink-0"
                            >
                              {selectedUser.name.charAt(0)}
                            </div>)}
                            <div className={`relative ml-3 text-md  py-2 px-4 shadow  ${
                                message.senderId === loggedInUserId ? 'bg-blue-200' : 'bg-white'} rounded-xl`}>
                              <div>{message.content}</div>

                            </div>
                            {message.senderId === loggedInUserId && 
                              (<div
                                className="flex items-center  justify-center h-10 w-10 rounded-full ml-3 bg-indigo-500 flex-shrink-0"
                              >
                                {loggedInFirstName.charAt(0)}
                              </div>)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div>Select a user to view messages</div>
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
                    <button
                      onClick={handleSendMessage}
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 mt-2"
                    >
                    <span>Send</span>
                    <span className="ml-2">
                      <TbSend />
                    </span>
                  </button>
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
