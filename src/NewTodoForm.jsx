import { useState } from "react";

export function NewTodoForm({ addTodo, categories = [] }) {
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;

    onSubmit(newItem, selectedCategory);

    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form" autoComplete="off">
      <div className="form-row">
      <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder="Enter a task here"
        />
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={selectedCategory === category.id}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            {category.name}
          </label>
        ))}
        <button className="btn">
          <svg width="21" height="28" viewBox="0 0 21 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_15)">
              <path d="M11.7359 2.26407C11.0523 1.58047 9.94214 1.58047 9.25855 2.26407L0.508545 11.0141C-0.175049 11.6977 -0.175049 12.8078 0.508545 13.4914C1.19214 14.175 2.30229 14.175 2.98589 13.4914L8.74995 7.72188V24.5C8.74995 25.468 9.53198 26.25 10.5 26.25C11.4679 26.25 12.25 25.468 12.25 24.5V7.72188L18.014 13.4859C18.6976 14.1695 19.8078 14.1695 20.4914 13.4859C21.175 12.8024 21.175 11.6922 20.4914 11.0086L11.7414 2.2586L11.7359 2.26407Z" fill="#131314"/>
            </g>
            <defs>
              <clipPath id="clip0_3_15">
                <rect width="21" height="28" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </form>
  );
}
