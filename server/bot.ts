import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

const getWebAppUrl = () => {
  const domain = process.env.REPLIT_DEV_DOMAIN || 'https://clinego.replit.app';
  return domain.startsWith('http') ? domain : `https://${domain}`;
};

bot.start((ctx) => {
  const webAppUrl = getWebAppUrl();
  
  ctx.reply(
    `🚀 *Добро пожаловать в ClineGo IDE!*

AI-powered среда разработки прямо в Telegram

*Возможности:*
💻 Monaco Code Editor
📻 Интернет радио (NPR, KEXP, WNYC, KCRW)
🎮 Игры (Snake, 2048)
📄 Генератор предложений
📦 VSCode расширение

Нажмите кнопку ниже для запуска приложения! 👇`,
    {
      parse_mode: 'Markdown',
      ...Markup.keyboard([
        [Markup.button.webApp('🚀 Открыть ClineGo IDE', webAppUrl)],
        [Markup.button.text('📚 Помощь'), Markup.button.text('ℹ️ О проекте')]
      ]).resize()
    }
  );
});

bot.hears('📚 Помощь', (ctx) => {
  ctx.reply(
    `📚 *Как пользоваться ClineGo IDE:*

1️⃣ Нажмите кнопку "🚀 Открыть ClineGo IDE"
2️⃣ Приложение откроется во встроенном браузере
3️⃣ Используйте все функции прямо в Telegram!

*Основные разделы:*
• **Редактор** - пишите код с подсветкой
• **Радио** - слушайте музыку во время работы
• **Игры** - отдохните со Snake или 2048
• **Офферы** - создавайте бизнес-предложения

Все работает без выхода из Telegram! 🎉`,
    { parse_mode: 'Markdown' }
  );
});

bot.hears('ℹ️ О проекте', (ctx) => {
  ctx.reply(
    `ℹ️ *О ClineGo IDE*

AI-powered среда разработки с интегрированными инструментами

*Технологии:*
• React + TypeScript
• Monaco Editor
• Telegram WebApp API
• Node.js + Express

*GitHub:*
github.com/hoOjlGun/super-octo-robot

*Автор:* @ClineGo_Team
*Версия:* 1.0.0`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('app', (ctx) => {
  const webAppUrl = getWebAppUrl();
  
  ctx.reply(
    '🚀 Запускаю ClineGo IDE...',
    {
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🚀 Открыть приложение', webAppUrl)]
      ])
    }
  );
});

bot.command('radio', (ctx) => {
  const webAppUrl = `${getWebAppUrl()}?view=radio`;
  
  ctx.reply(
    '📻 Открываю интернет-радио...',
    {
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('📻 Слушать радио', webAppUrl)]
      ])
    }
  );
});

bot.command('games', (ctx) => {
  const webAppUrl = `${getWebAppUrl()}?view=games`;
  
  ctx.reply(
    '🎮 Открываю игры...',
    {
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('🎮 Играть', webAppUrl)]
      ])
    }
  );
});

bot.command('code', (ctx) => {
  const webAppUrl = `${getWebAppUrl()}?view=editor`;
  
  ctx.reply(
    '💻 Открываю редактор кода...',
    {
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('💻 Открыть редактор', webAppUrl)]
      ])
    }
  );
});

bot.command('offer', (ctx) => {
  const webAppUrl = `${getWebAppUrl()}?view=offers`;
  
  ctx.reply(
    '📄 Открываю генератор предложений...',
    {
      ...Markup.inlineKeyboard([
        [Markup.button.webApp('📄 Создать оффер', webAppUrl)]
      ])
    }
  );
});

bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    
    ctx.reply(
      `✅ Данные получены:\n\n${JSON.stringify(data, null, 2)}`,
      { parse_mode: 'Markdown' }
    );
  } catch (error) {
    ctx.reply('❌ Ошибка обработки данных');
  }
});

bot.on('text', (ctx) => {
  if (!ctx.message.text.startsWith('/')) {
    const webAppUrl = getWebAppUrl();
    
    ctx.reply(
      'Используйте кнопку ниже для запуска приложения 👇',
      {
        ...Markup.keyboard([
          [Markup.button.webApp('🚀 Открыть ClineGo IDE', webAppUrl)]
        ]).resize()
      }
    );
  }
});

export function startBot() {
  bot.launch();
  console.log('🤖 Telegram bot started successfully!');
  console.log('📱 WebApp URL:', getWebAppUrl());

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

export default bot;
