import { Component } from '@angular/core';
import { Token } from './app.classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lexer-app';
}


// export class Token {
//   tokenType: string = '';
//   currentChar: string = '';

//   constructor (tokenType: string, currentChar: string){
//     this.tokenType = tokenType;
//     this.currentChar = currentChar;
//   }
// }

const enum TokenType {
  Operator = "OPR",
  OpenParenthesis = "OP",
  CloseParenthesis = "CP",
  Number = "NUM",
  Identifier = "ID",
  Keyword = "KW"
}



// let result = recognizeTokens("+ My tea is cold now for 10 minutes while we waited from 13.50 capiche");

function isLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char);
}

function isDigit(char: string): boolean {
  //return !isNaN(Number(char));
  return /[0-9]/.test(char);
}  

function readIdentifier(input: string, currentPosition: number): string {
  let identifier = "";

  while (currentPosition < input.length && (isLetter(input[currentPosition]) || isDigit(input[currentPosition]))) {
      identifier += input[currentPosition];
      currentPosition++;
  }

  return identifier;
}

function readNumber(input: string, currentPosition: number): string {
  let number = "";

  if (input[currentPosition] === '+' || input[currentPosition] === '-') {
      number += input[currentPosition];
      currentPosition++;
  }

  while (currentPosition < input.length && isDigit(input[currentPosition])) {
      number += input[currentPosition];
      currentPosition++;
  }

  if (input[currentPosition] === '.') {
      number += input[currentPosition];
      currentPosition++;
      while (currentPosition < input.length && isDigit(input[currentPosition])) {
          number += input[currentPosition];
          currentPosition++;
      }
  }
  return number;
}

function isKeyword(identifier: string): boolean {
  let keywords = ["if", "else", "for", "while", "function", "var", "let", "const"];
  return keywords.includes(identifier);
}


function recognizeTokens(input: string): Array<Token> {
  let currentPosition = 0;
  let tokens: Array<Token> = [];
  // console.log(TokenType.Identifier);

  while (currentPosition < input.length) {
      let currentChar = input[currentPosition];

      if (currentChar === '+') {
          tokens.push(new Token(TokenType.Operator, currentChar));
          currentPosition++;
          continue;
      } else if (currentChar === '-') {
          tokens.push(new Token(TokenType.Operator, currentChar));
          currentPosition++;
          continue;
      } else if (currentChar === '*') {
          tokens.push(new Token(TokenType.Operator, currentChar));
          currentPosition++;
          continue;
      } else if (currentChar === '/') {
          tokens.push(new Token(TokenType.Operator, currentChar));
          currentPosition++;
          continue;
      } else if (currentChar === '(') {
          tokens.push(new Token(TokenType.OpenParenthesis, currentChar));
          currentPosition++;
          continue;
      } else if (currentChar === ')') {
          tokens.push(new Token(TokenType.CloseParenthesis, currentChar));
          currentPosition++;
          continue;
      } else if (isDigit(currentChar)) {
          let number = readNumber(input, currentPosition);
          tokens.push(new Token(TokenType.Number, number));
          currentPosition += number.length;
          continue;
      } else if (isLetter(currentChar)) {
          let identifier = readIdentifier(input, currentPosition);
          let tokenType = TokenType.Identifier;
          if (isKeyword(identifier)) {
              tokenType = TokenType.Keyword;
          }
          tokens.push(new Token(tokenType, identifier));
          currentPosition += identifier.length;
          continue;
      } else if (currentChar === ' ' || currentChar === '\t' || currentChar === '\n') {
          currentPosition++;
          continue;
      } else {
          throw new Error(`Invalid character: ${currentChar}`);
      }
  }

  return tokens;
}

function printTokens() {
  let input = (document.getElementById("input-text") as HTMLInputElement).value;
  console.log(input);
  let tokens = recognizeTokens(input);
  let tokensDiv = document.getElementById("tokens-div");
  tokensDiv!.innerHTML = "";
  for (let token of tokens) {
      let tokenDiv = document.createElement("div");
      tokenDiv.innerHTML = `Type: ${token.tokenType}, Value: ${token.currentChar}`;
      tokensDiv!.appendChild(tokenDiv);
  }
}


// let tokensButton = document.getElementById("tokens-button") as HTMLButtonElement;
// if (tokensButton) {
//   tokensButton.addEventListener("click", printTokens);
// }






