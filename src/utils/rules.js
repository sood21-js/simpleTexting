export const rulesRequired = {
    required: true,
    message: "Должно быть заполнено",
};

export const emailPattern = {
    pattern: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g,
    message: "Должно соответствовать формату email",
};