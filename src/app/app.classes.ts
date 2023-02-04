export class Token {
    tokenType: string = '';
    currentChar: string = '';
  
    constructor (tokenType: string, currentChar: string){
      this.tokenType = tokenType;
      this.currentChar = currentChar;
    }
  }