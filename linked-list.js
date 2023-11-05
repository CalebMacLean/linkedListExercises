/** Node: node for a singly linked list. */

class Node {
  constructor(val, prev=null, next=null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }
  // Unspecified function that is used in all the solutions. This assignment kind of sucks.
  _get(idx) {
    // Access first node in list.
    let current = this.head;
    // Create count var that will keep track of what index each node is in the list.
    let count = 0;
    // While loop that moves through linked list till at the proper index.
    while(current !== null && count != idx) {
      count += 1;
      current = current.next
    }

    return current;
  }
  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    // Checks to see if it is the first node in the LinkedList
    if(!this.head) this.head = newNode;
    // Checks to see there is a last node in the LinkedList, and updates its next attribute.
    if(this.tail !== null) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }
    // Appends new node to end of the list and updates length
    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    // Checks to see if there is a first node in the LinkedList
    if(this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    if(this.length === 0) this.tail = this.head;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // Check for invalid index
    if(idx >= length || idx < 0) throw new Error("Invalid index");
    // Get Node at passed argument
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // Check for invalid index
    if(idx >= length || idx < 0) throw new Error("Invalid index");
    // Get node at given index and change its value
    let node = this._get(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // Check for invalid index
    if(idx >= length || idx < 0) throw new Error("Invalid index");
    // First Node in List Case
    if(idx === 0) return this.unshift(val);
    // Last Node in List Case
    if(idx === this.length) return this.push(val);
    // Get the node at the index
    let prev = this._get(idx);
    // Create new node
    let newNode = new Node(val, prev, prev.next);
    prev.next.prev = newNode;
    prev.next = newNode;
    // Update Length property
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // Invalid index case
    if(idx >= this.length || idx < 0) {
      throw new Error("Invalid Index");
    }
    // Index is first item case
    if(idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.head.prev = null;
      this.length -= 1;
      if(this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // Index is last item case
    if(idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }
    // Index is middle item case
    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length = -1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    // Empty list Case
    if(this.length === 0) return 0;
    // Create var for sum and current node
    let sum = 0;
    let currNode = this.head;
    // While loop that will add each node's value to sum
    while(currNode) {
      sum += currNode.val;
      currNode = currNode.next;
    }
    // return average
    return sum / this.length;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(superprop) {
    super(superprop);
  }

  reverseInPlace() {
    // Check for empty list
    if(this.length = 0) throw new Error("Empty list");
    // Create current node
    let currNode = this.tail;
    // While loop that swaps prev and next values
    while(currNode) {
      // Checks to see if its the last node left in the list;
      if(currNode.prev === null) this.tail = currNode;
      // prev and next variables
      let currprev = currNode.prev;
      let currNext = currNode.next;
      // Swap prev and next values
      currNode.next = currprev;
      currNode.prev = currNext;
      // Change current Node
      currNode = currNode.next;
    }
  }
}
module.exports = LinkedList;
