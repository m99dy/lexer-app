"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'lexer-app';
    }
    AppComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var result = recognizeTokens('My tea is cold now for 10 minutes while we waited from 13.50, capiche?');
var Token = /** @class */ (function () {
    function Token(tokenType, currentChar) {
        this.tokenType = '';
        this.currentChar = '';
        this.tokenType = tokenType;
        this.currentChar = currentChar;
    }
    return Token;
}());
var TokenType;
(function (TokenType) {
    TokenType["Operator"] = "OPR";
    TokenType["OpenParenthesis"] = "OP";
    TokenType["CloseParenthesis"] = "CP";
    TokenType["Number"] = "NUM";
    TokenType["Identifier"] = "ID";
    TokenType["Keyword"] = "KW";
})(TokenType || (TokenType = {}));
console.log(result);
function isLetter(char) {
    return /[a-zA-Z]/.test(char);
}
function isDigit(char) {
    //return !isNaN(Number(char));
    return /[0-9]/.test(char);
}
function readIdentifier(input, currentPosition) {
    var identifier = "";
    while (currentPosition < input.length && (isLetter(input[currentPosition]) || isDigit(input[currentPosition]))) {
        identifier += input[currentPosition];
        currentPosition++;
    }
    return identifier;
}
function readNumber(input, currentPosition) {
    var number = "";
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
function isKeyword(identifier) {
    var keywords = ["if", "else", "for", "while", "function", "var", "let", "const"];
    return keywords.includes(identifier);
}
function recognizeTokens(input) {
    var currentPosition = 0;
    var tokens = [];
    while (currentPosition < input.length) {
        var currentChar = input[currentPosition];
        if (currentChar === '+') {
            tokens.push(new Token(TokenType.Operator, currentChar));
            currentPosition++;
            continue;
        }
        else if (currentChar === '-') {
            tokens.push(new Token(TokenType.Operator, currentChar));
            currentPosition++;
            continue;
        }
        else if (currentChar === '*') {
            tokens.push(new Token(TokenType.Operator, currentChar));
            currentPosition++;
            continue;
        }
        else if (currentChar === '/') {
            tokens.push(new Token(TokenType.Operator, currentChar));
            currentPosition++;
            continue;
        }
        else if (currentChar === '(') {
            tokens.push(new Token(TokenType.OpenParenthesis, currentChar));
            currentPosition++;
            continue;
        }
        else if (currentChar === ')') {
            tokens.push(new Token(TokenType.CloseParenthesis, currentChar));
            currentPosition++;
            continue;
        }
        else if (isDigit(currentChar)) {
            var number = readNumber(input, currentPosition);
            tokens.push(new Token(TokenType.Number, number));
            currentPosition += number.length;
            continue;
        }
        else if (isLetter(currentChar)) {
            var identifier = readIdentifier(input, currentPosition);
            var tokenType = TokenType.Identifier;
            if (isKeyword(identifier)) {
                tokenType = TokenType.Keyword;
            }
            tokens.push(new Token(tokenType, identifier));
            currentPosition += identifier.length;
            continue;
        }
        else if (currentChar === ' ' || currentChar === '\t' || currentChar === '\n') {
            currentPosition++;
            continue;
        }
        else {
            throw new Error("Invalid character: ".concat(currentChar));
        }
    }
    return tokens;
}
