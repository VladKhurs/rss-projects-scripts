export default function AboutPage(): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <a style={{ margin: '0 auto', marginTop: '50px' }} href="https://rs.school/" aria-label="RS School website">
        <img src="/img/rss.jpg" width="150px" alt="" />
      </a>
      <h1 style={{ margin: '0 auto', marginTop: '50px' }}>Информация об участниках команды</h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Максим Коправчук</h2>
          <p>
            <b>Роль:</b>разработчик
          </p>
          <b>Краткая биография:</b>
          <p> возраст: 35 лет;</p>
          <p> место проживания: Омск, Россия</p>
          <p> занятия в свободное время: Front-end</p>
          <p>
            <b>Роль:</b>тимлид и разработчик
          </p>
          <img src="public/img/selfie-2.jpg" width="100px" alt="developer" />
          <a href="https://github.com/iMaxZorky">GitHub Link</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Хурс Владислав</h2>
          <p>
            <b>Роль:</b>разработчик
          </p>
          <b>Краткая биография:</b>
          <p> возраст: 19 лет;</p>
          <p> место проживания: Минск, Беларуь</p>
          <p> занятия в свободное время: Front-end</p>
          <p>
            <b>Роль:</b>разработчик
          </p>
          <img src="/img/selfie-1.png" width="110px" alt="developer" />
          <a href="https://github.com/VladKhurs">GitHub Link</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Александр Федоров</h2>
          <p>
            <b>Роль:</b>разработчик
          </p>
          <b>Краткая биография:</b>
          <p> возраст: 30 лет;</p>
          <p> место проживания: Пенза, Россия</p>
          <p> занятия в свободное время: Front-end</p>
          <p>
            <b>Роль:</b>разработчик
          </p>
          <img src="/img/selfie-3.jpg" width="150px" alt="developer" />
          <a href="https://github.com/gitalexus">GitHub Link</a>
        </div>
      </div>
      <h1 style={{ margin: '0 auto', marginTop: '50px' }}>Вклад в приложение</h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        <div>
          <h2>Максим Коправчук</h2>
          <p>
            Организовывал работу каждого из разработчиков в качестве тимлида, сделал страницу логина, настроил сборщик,
            проводил код-ревью
          </p>
        </div>
        <div>
          <h2>Хурс Владислав</h2>
          <p>
            Сделал страницу регистрации, настроил сборщик, создал страницу профиля покупателя, добавил страницу &quot;О
            нас &quot;, проводил код-ревью
          </p>
        </div>
        <div>
          <h2>Александр Фёдоров</h2>
          <p>Сделал React router, настроил сборщик, создал компонет меню, оформил шапку, проводил код-ревью</p>
        </div>
      </div>
      <h1 style={{ margin: '0 auto', marginTop: '50px' }}>Сотрудничество </h1>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        <div>
          <p style={{ display: 'flex', margin: '0 auto', maxWidth: '80vw' }}>
            В процессе разработки каждый из участников акивно обсуждал вопросы и предложения по разрабатываемому
            приложению; каждую неделю проходили встречи в Google Meet, где подводились итоги разрботки прошедшей недели
            и обсуждались актуальные вопросы.
          </p>
        </div>
      </div>
    </div>
  );
}
