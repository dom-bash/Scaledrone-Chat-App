const membersCount = document.querySelector('.members-count');
const membersList = document.querySelector('.members-list');
const messages = document.querySelector('.messages');
const input = document.querySelector('.message-form__input');
const form = document.querySelector('.message-form');

  
  form.addEventListener('submit', sendMessage);
  
  function sendMessage() {
    const value = input.value;
    if (value === '') {
      return;
    }
    input.value = '';
    drone.publish({
      room: 'observable-room',
      message: value,
    });
  }
  
  function createMemberElement(member) {
    const {name, color} = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
  }
  
  function updateMembers() {
    membersCount.innerText = `${members.length} members in room:`;
    membersList.innerHTML = '';
    members.forEach(member =>
      membersList.appendChild(createMemberElement(member))
    );
  }
  
  function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
  }
  
  function addMessageToList(text, member) {
    const el = messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    
  }