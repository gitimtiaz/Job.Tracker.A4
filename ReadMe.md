# 📌 Job Application Tracker — Notes

While building this project, I used different DOM and event concepts. Below are my short explanations based on what I actually applied in the code.

---

## 1️⃣ Difference between `getElementById`, `getElementsByClassName`, and `querySelector / querySelectorAll`

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

## 2️⃣ How to create and insert a new element into the DOM

The usual steps I follow:

1. Create element using **`document.createElement()`**
2. Add classes/content
3. Append it to a parent using **`appendChild()`** or **`append()`**

Example pattern I used:

```js
const div = document.createElement('div');
div.innerHTML = '...';
parent.appendChild(div);