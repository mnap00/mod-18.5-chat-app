Chat App
========

Join Chat
---------
Story:
> As a chat user
> In order to join the chat
> I want to select my user name and join the chat

Acceptance Criteria:
  * if the user isn't signed in, the app should show a simple view with one input for the user's nickname
  * there should be a simple validation for that input (if the name is empty, don't leave the page)
  * writing down the nickname and pressing enter should redirect the user to chat view
  * signing in to the chat should communicate other users that a new person has joined

See Who's Online
-----------------
Story:
> As a chat user
> In order to know who is online
> I want to see a list of users and the number of people who are online

Acceptance Criteria:
  * on the chat view, the user should see the number of people available online
  * the aforementioned number should be dynamic so that when another user will join or leave, the number will change

Send Messages
-------------
Story:
> As a chat user
> In order to talk to other users
> I want to send messages to channel

Acceptance Criteria:
  * there should be an input where new messages can be written
  * when the enter key is pressed, the message should be sent
  * after sending a message, the input should be cleared

Receive Messages
----------------
Story:
> As a chat user
> In order to receive messages
> I want to see what another user wrote instantly, without refreshing the page

Acceptance Criteria:
  * the message that was sent should be displayed on the messages list
  * other users should see the message that was sent as well

Receive Notifications
---------------------
Story:
> As a chat user
> In order to know if other person wrote something on chat
> I want to see some kind of notification

Acceptance Criteria:
  * on the chat view, there should be information about unread messages
  * that information should be placed near user name (red dot)
