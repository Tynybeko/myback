# myback


**NODE JS**

### Документация API

#### Базовый URL: `https://test-ss-lrp7.onrender.com`

---

### 1. **Posts API**

#### 1.1. Получить все посты
- **Endpoint:** `/posts`
- **Method:** `GET`
- **Authentication:** Не требуется
- **Query Parameters:**
  - `page` (опционально): Номер страницы для пагинации.
  - `sort` (опционально): Сортировка по количеству просмотров (`asc` или `desc`).
  - `limit` (опционально): Количество постов на странице.
- **Response:** Список постов.

#### 1.2. Получить один пост по ID
- **Endpoint:** `/posts/:id`
- **Method:** `GET`
- **Authentication:** Не требуется
- **Parameters:**
  - `id`: ID поста.
- **Response:** Данные поста.

#### 1.3. Создать пост
- **Endpoint:** `/posts/create`
- **Method:** `POST`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - `title`: Заголовок поста.
  - `desc`: Описание поста.
  - `categoryId`: ID категории.
  - `images`: Массив изображений (опционально).
- **Response:** Созданный пост.

#### 1.4. Удалить пост
- **Endpoint:** `/posts/remove/:id`
- **Method:** `DELETE`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `id`: ID поста.
- **Response:** Сообщение об успешном удалении.

#### 1.5. Обновить пост
- **Endpoint:** `/posts/update/:id`
- **Method:** `PATCH`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `id`: ID поста.
- **Request Body:**
  - `title`: Заголовок поста.
  - `desc`: Описание поста.
  - `categoryId`: ID категории.
  - `images`: Массив изображений (опционально).
- **Response:** Обновленный пост.

---

### 2. **Images Upload API**

#### 2.1. Загрузить аватар
- **Endpoint:** `/upload/avatar`
- **Method:** `POST`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - `image`: Файл изображения.
- **Response:** Данные загруженного изображения.

#### 2.2. Загрузить изображения для пользователя
- **Endpoint:** `/upload/user/images`
- **Method:** `POST`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - `images`: Массив файлов изображений (максимум 3).
- **Response:** Данные загруженных изображений.

#### 2.3. Удалить аватар
- **Endpoint:** `/remove/avatar`
- **Method:** `DELETE`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - `url`: URL изображения.
  - `imgId`: ID изображения.
- **Response:** Сообщение об успешном удалении.

#### 2.4. Удалить изображение пользователя
- **Endpoint:** `/remove/user/image`
- **Method:** `DELETE`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - `url`: URL изображения.
  - `imgId`: ID изображения.
- **Response:** Сообщение об успешном удалении.

#### 2.5. Загрузить изображения для поста
- **Endpoint:** `/upload/post/images/:postId`
- **Method:** `POST`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `postId`: ID поста.
- **Request Body:**
  - `images`: Массив файлов изображений (максимум 3).
- **Response:** Данные загруженных изображений.

#### 2.6. Удалить изображение поста
- **Endpoint:** `/remove/post/image/:postId`
- **Method:** `DELETE`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `postId`: ID поста.
- **Request Body:**
  - `url`: URL изображения.
  - `imgId`: ID изображения.
- **Response:** Сообщение об успешном удалении.

---

### 3. **User API**

#### 3.1. Вход в систему
- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Authentication:** Не требуется
- **Request Body:**
  - `email`: Email пользователя.
  - `password`: Пароль пользователя.
- **Response:** Данные пользователя и JWT токен.

#### 3.2. Регистрация пользователя
- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Authentication:** Не требуется
- **Request Body:**
  - `email`: Email пользователя.
  - `name`: Имя пользователя.
  - `surname`: Фамилия пользователя.
  - `sex`: Пол пользователя.
  - `phonenumber`: Номер телефона пользователя.
  - `private`: Приватность аккаунта (true/false).
  - `password`: Пароль пользователя.
- **Response:** Данные пользователя и JWT токен.

#### 3.3. Обновить данные пользователя
- **Endpoint:** `/auth/update/`
- **Method:** `PATCH`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - Любые данные пользователя для обновления.
- **Response:** Обновленные данные пользователя.

#### 3.4. Изменить пароль
- **Endpoint:** `/auth/changepass/`
- **Method:** `PATCH`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - `password`: Текущий пароль.
  - `newpassword`: Новый пароль.
- **Response:** Сообщение об успешном изменении пароля.

#### 3.5. Получить данные текущего пользователя
- **Endpoint:** `/auth/me`
- **Method:** `GET`
- **Authentication:** Требуется (JWT токен)
- **Response:** Данные текущего пользователя.

---

### 4. **Category API**

#### 4.1. Получить все категории
- **Endpoint:** `/categories`
- **Method:** `GET`
- **Authentication:** Не требуется
- **Response:** Список категорий.

#### 4.2. Получить одну категорию по ID
- **Endpoint:** `/categories/:id`
- **Method:** `GET`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `id`: ID категории.
- **Response:** Данные категории.

#### 4.3. Создать категорию
- **Endpoint:** `/categories/create`
- **Method:** `POST`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - `title`: Название категории.
- **Response:** Созданная категория.

#### 4.4. Удалить категорию
- **Endpoint:** `/categories/remove/:id`
- **Method:** `DELETE`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `id`: ID категории.
- **Response:** Сообщение об успешном удалении.

#### 4.5. Обновить категорию
- **Endpoint:** `/categories/update/:id`
- **Method:** `PATCH`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `id`: ID категории.
- **Request Body:**
  - `title`: Новое название категории.
- **Response:** Сообщение об успешном обновлении.

---

### 5. **Likes API**

#### 5.1. Поставить лайк на пост
- **Endpoint:** `/like/:postId`
- **Method:** `POST`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `postId`: ID поста.
- **Response:** Сообщение об успешном добавлении лайка.

#### 5.2. Удалить лайк с поста
- **Endpoint:** `/like/:postId`
- **Method:** `DELETE`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `postId`: ID поста.
- **Response:** Сообщение об успешном удалении лайка.

---

### 6. **Comment API**

#### 6.1. Добавить комментарий к посту
- **Endpoint:** `/comment/:postId`
- **Method:** `POST`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `postId`: ID поста.
- **Request Body:**
  - `text`: Текст комментария.
- **Response:** Сообщение об успешном добавлении комментария.

#### 6.2. Удалить комментарий
- **Endpoint:** `/comment/:commentId`
- **Method:** `DELETE`
- **Authentication:** Требуется (JWT токен)
- **Parameters:**
  - `commentId`: ID комментария.
- **Response:** Сообщение об успешном удалении комментария.

---

### 7. **Crypto API**

#### 7.1. Получить данные о криптовалютах
- **Endpoint:** `/cryptobase`
- **Method:** `GET`
- **Authentication:** Не требуется
- **Response:** Данные о криптовалютах.

---

### 8. **Currency API**

#### 8.1. Получить данные о валюте
- **Endpoint:** `/currencyAPI`
- **Method:** `GET`
- **Authentication:** Не требуется
- **Response:** Данные о валюте.

---

### 9. **Дополнительные Endpoints**

#### 9.1. Получить данные о пользователе
- **Endpoint:** `/auth/me`
- **Method:** `GET`
- **Authentication:** Требуется (JWT токен)
- **Response:** Данные текущего пользователя.

#### 9.2. Обновить данные пользователя
- **Endpoint:** `/auth/update/`
- **Method:** `PATCH`
- **Authentication:** Требуется (JWT токен)
- **Request Body:**
  - Любые данные пользователя для обновления.
- **Response:** Обновленные данные пользователя.

---

### Примечания:
- **JWT токен** должен быть передан в заголовке `Authorization` в формате `Bearer <token>`.
- Все запросы, требующие авторизации, должны включать JWT токен.
- Для загрузки изображений используется `multipart/form-data`.
