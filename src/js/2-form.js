const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};
// Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
let formData = {
  email: '',
  message: '',
};

//При завантаженні сторінки перевір, чи є дані у локальному сховищі. Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.

const savedData = localStorage.getItem('feedback-form-state'); // витягуємо дані з localStorage
if (savedData) {
  try {
    formData = JSON.parse(savedData); // перетворюємо рядок в обєкт (FormData)
    const { email, message } = formData; // витягуємо email і message  і вставляємо в поля форми
    refs.feedbackForm.elements.email.value = email || '';
    refs.feedbackForm.elements.message.value = message || '';
  } catch (error) {
    // ловимо можливу помилку та виводимо в консоль
    console.log('Error parsing saved data:', error.message);
  }
}

//Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.

refs.feedbackForm.addEventListener('input', e => {
  // ставимо слухача подій
  const { name, value } = e.target; // з поля те що друкуємо дістаю його name і value
  if (name in formData) {
    // перевіряю чи є такий name в formData
    formData[name] = value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData)); // Зберігаю formDAta в localStorage
  }
});

//Перед відправленням форми переконайся, що обидва поля форми заповнені. Якщо будь-яке з полів (властивостей об’єкта formData) порожнє, показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями, очисти локальне сховище, об’єкт formData і поля форми.

refs.feedbackForm.addEventListener('submit', e => {
  // ставлю слухача подій на сабміт
  e.preventDefault();

  if (!formData.email || !formData.message) {
    // перевіряю заповнення полів
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted:', formData);

  //Очистка форми

  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
  formData = { email: '', message: '' };
});
