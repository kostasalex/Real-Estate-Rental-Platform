import React, { useState } from 'react';
import { BsChatSquareTextFill } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';

const Messages = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Henry Boyd' },
    { id: 3, name: 'Marta Curtis' },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[1]);
  const [newMessage, setNewMessage] = useState('');

  const [messages, setMessages] = useState([
    { id: 1, sender: 1, recipient: 2, content: "Hi Henry, I'm interested in your Airbnb listing." },
    { id: 2, sender: 2, recipient: 1, content: "Hello John! I'm glad you're interested. It's a beautiful place." },
    { id: 3, sender: 1, recipient: 2, content: 'Can you tell me more about the amenities?' },
    { id: 4, sender: 2, recipient: 1, content: "Sure! The amenities include a pool, gym, and a stunning view of the city." },
    { id: 5, sender: 1, recipient: 3, content: 'Hi Marta, is your Airbnb available for next month?' },
    { id: 6, sender: 3, recipient: 1, content: "Hi John! Yes, it's available. Let me know your preferred dates." },
  ]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const getUserMessages = (userId) => {
    return messages.filter(
      (message) =>
        (message.sender === userId && message.recipient === 1) ||
        (message.sender === 1 && message.recipient === userId)
    );
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newId = messages.length + 1;

    const newMessageObj = {
      id: newId,
      sender: 1,
      recipient: selectedUser.id,
      content: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessage('');
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
                  {users.length - 1}
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-auto">
                {users.map((user) =>
                  user.id !== 1 ? (
                    <button
                      key={user.id}
                      className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${
                        selectedUser && selectedUser.id === user.id ? 'bg-indigo-100' : ''
                      }`}
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-2 text-sm font-semibold">{user.name}</div>
                    </button>
                  ) : null
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
                          message.sender === 1 ? 'justify-end' : 'justify-'
                        }`}
                      >
                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                          <div className={`flex flex-row items-center ${
                                message.sender === 1 ? 'justify-end' : 'justify-start'
                              } flex-shrink-0`}>
                            {message.sender !== 1 && 
                            (<div
                              className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200 flex-shrink-0"
                            >
                              {selectedUser.name.charAt(0)}
                            </div>)}
                            <div className={`relative ml-3 text-sm bg-white py-2 px-4 shadow  ${
                                message.sender === 1 ? 'bg-blue-200' : 'bg-indigo-500'} rounded-xl`}>
                              <div>{message.content}</div>

                            </div>
                            {message.sender === 1 && 
                              (<div
                                className="flex items-center justify-center h-10 w-10 rounded-full ml-3 bg-indigo-500 flex-shrink-0"
                              >
                                {users[0].name.charAt(0)}
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
