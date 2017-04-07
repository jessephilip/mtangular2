export class User {
  constructor(
    private id:number,
    private firstName:string,
    private lastName:string,
    private username:string,
    private email:string,
  ) { }

  getId():number {
	  return this.id;
  }

  setId(id:number):number {
	  this.id = id;
	  return this.id;
  }

  getFirstName():string {
	  return this.firstName;
  }

  setFirstName(firstName:string):string {
	  this.firstName = firstName;
	  return this.firstName;
  }

  getLastName():string {
	  return this.lastName;
  }

  setLastName(lastName:string):string {
	  this.lastName = lastName;
	  return this.lastName;
  }

  getUsername():string {
	  return this.username;
  }

  setUsername(username:string):string {
	  this.username = username;
	  return this.username;
  }

  getEmail():string {
	  return this.email;
  }

  setEmail(email:string):string {
	  this.email = email;
	  return this.email;
  }
}

export class Deck {
  private deckName:string;
  private deckType:string;
}
