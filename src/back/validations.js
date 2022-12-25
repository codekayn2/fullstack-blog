import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неправельний формат").isEmail(),
  body("password", " Пароль має бути мінімум 8 символів").isLength({ min: 5 }),
];


export const registerValidation = [
  body("email", "Неправельний формат").isEmail(),
  body("password", " Пароль має бути мінімум 8 символів").isLength({ min: 5 }),
  body("fullName", "Вкажіть імя").isLength({ min: 3 }),
  body("avatarUrl", "Неправильна силка на аватарку").optional().isURL(),
];


export const postCreateValidations = [
  body("title", "Введіть заголовок статті").isLength({ min: 3}).isString(),
  body("text", "Введіть текст статті").isLength({ min: 3 }).isString(),
  body("tags", "Неправильний формат тегів (вкажіть маcсив)").optional().isString(),
  body("imageUrl", "Неправильна силка на картинку").optional().isString(),
];


