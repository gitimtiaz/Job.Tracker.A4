# Job Application Tracker — Notes

While building this project, I used different DOM and event concepts. Below are my short explanations based on what I actually applied in the code.

---

## 1. Difference between `getElementById`, `getElementsByClassName`, and `querySelector / querySelectorAll`

- **`getElementById()`**  
  Returns a single element by its unique id. It’s fast and straightforward. I used it when I knew there would only be one element (like counters).

- **`getElementsByClassName()`**  
  Returns a live HTMLCollection of elements with the same class. It updates automatically if DOM changes, which can sometimes be tricky to manage.

- **`querySelector()` / `querySelectorAll()`**  
  These are more flexible because they support full CSS selectors.  
  - `querySelector()` → returns the first match  
  - `querySelectorAll()` → returns a static NodeList  

In this project, I preferred **`querySelector` + `closest()`** for flexibility when working with cards.

---

## 2. How to create and insert a new element into the DOM

The usual steps I follow:

1. Create element using **`document.createElement()`**
2. Add classes/content
3. Append it to a parent using **`appendChild()`** or **`append()`**

Example pattern I used:

```js
const div = document.createElement('div');
div.innerHTML = '...';
parent.appendChild(div);
```
This is how the filtered cards are rendered dynamically.

---

## 3. What is Event Bubbling? How does it work?

Event bubbling means when an event happens on a child element, it first runs on that element and then bubbles up to its parent elements.

So the flow is like:

```text
button → card → container → document
```

In my project, clicks on buttons bubble up to the main container, which allowed me to use a single listener instead of many.

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

Event delegation is when we attach one event listener to a parent and handle events for its children using bubbling.

I used it on the main container like this:

- Instead of adding listeners to every card button
- I added one listener on **`<main>`**
- Then detected clicks using **`event.target.closest()`**

**Why it’s useful:**

- better performance
- works for dynamically added elements
- cleaner code
- easier to maintain

This was especially helpful since cards move between Interview and Rejected sections.

---

## 5. Difference between `preventDefault()` and `stopPropagation()`

These two are often confused but they do different things.

**`preventDefault()`**
Stops the browser’s default behavior.
Example: stopping a form from submitting or a link from navigating.

**`stopPropagation()`**
Stops the event from bubbling up to parent elements.

**In simple terms:**

**`preventDefault()`** → stops browser action

**`stopPropagation()`** → stops event travel

In this project I mainly relied on bubbling (not stopping it) because event delegation depends on bubbling.

---

## Final Note

This project helped me get more comfortable with:

- DOM traversal
- event delegation
- dynamic rendering
- state syncing between UI sections

Still room to polish, but the core logic is working solid.
