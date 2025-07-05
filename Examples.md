# JavaScript Examples

## Ternary Operator Examples

### Simple If-Else Statement
```javascript
let filteredBookmarks;
if (category === "all") {
    filteredBookmarks = bookmarks;
} else {
    filteredBookmarks = bookmarks.filter(b => b.category === category);
}
```

### Ternary Operator (Shorthand)
```javascript
const filteredBookmarks = category === "all" 
    ? bookmarks 
    : bookmarks.filter(b => b.category === category);
```

### Ternary Operator Syntax
```javascript
condition ? valueIfTrue : valueIfFalse
```

### More Examples

#### Simple Number Comparison
```javascript
// If-else way
let result;
if (age >= 18) {
    result = "adult";
} else {
    result = "minor";
}

// Ternary way
const result = age >= 18 ? "adult" : "minor";
```

#### String Operations
```javascript
// If-else way
let greeting;
if (name) {
    greeting = "Hello, " + name;
} else {
    greeting = "Hello, Guest";
}

// Ternary way
const greeting = name ? "Hello, " + name : "Hello, Guest";
```