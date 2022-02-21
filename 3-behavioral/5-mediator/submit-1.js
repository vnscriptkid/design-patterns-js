class Person {
  constructor(name) {
    // todo: his name, chatLog is a list of received messages, room is the room he joined.
    this.name = name;
    this.chatLog = [];
    this.room = null;
  }

  receive(sender, message) {
    let s = `${sender}: '${message}'`;
    console.log(`[${this.name}'s chat session] ${s}`);
    this.chatLog.push(s);
  }

  say(message) {
    // assuming person has already joined the room
    // todo: broadcast to current rom
    this.room.broadcast(this.name, message);
  }

  pm(who, message) {
    // send message in current room from current person to someone with msg content
    this.room.message(this.name, who, message);
  }
}

// centralized place to coordinate communication between persons
class ChatRoom {
  constructor() {
    // todo: keeps a list of persons
    this.people = [];
  }

  broadcast(source, message) {
    for (let p of this.people)
      if (p.name !== source) p.receive(source, message);
    // everyone in chatroom should receive message from source, except for the one who sends it
  }

  join(p) {
    let joinMsg = `${p.name} joins the chat`;

    // todo: broadcast joinMsg to room
    this.broadcast("room", joinMsg);
    // attach room to newly joined person
    p.room = this;
    // add person to chat room
    this.people.push(p);
  }

  message(source, destination, message) {
    // find the person with same name as dest
    // let him receive message only
    const destPerson = this.people.find((p) => p.name === destination);

    if (!destPerson) return;

    destPerson.receive(source, message);
  }
}

let room = new ChatRoom();

let john = new Person("John");
let jane = new Person("Jane");

room.join(john);
room.join(jane);

john.say("hi room");
jane.say("oh, hey john");

let simon = new Person("Simon");
room.join(simon);
simon.say("hi everyone!");

jane.pm("Simon", "glad you could join us!");
