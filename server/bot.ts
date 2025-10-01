import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

const STATIONS = [
  { name: "NPR News", frequency: "89.3 FM", emoji: "📻" },
  { name: "KEXP", frequency: "90.3 FM", emoji: "🎵" },
  { name: "WNYC", frequency: "93.9 FM", emoji: "🎙️" },
  { name: "KCRW", frequency: "89.9 FM", emoji: "🎧" },
];

bot.start((ctx) => {
  ctx.reply(
    `🚀 *Добро пожаловать в ClineGo IDE Bot!*

Я помогу вам работать с кодом, слушать радио и играть в игры прямо в Telegram!

*Доступные команды:*
/code - Открыть редактор кода
/radio - Интернет радио
/games - Игры (Snake, 2048)
/offer - Генератор предложений
/extension - Скачать Codex Free
/help - Показать помощь`,
    { parse_mode: 'Markdown' }
  );
});

bot.help((ctx) => {
  ctx.reply(
    `📚 *Команды ClineGo Bot:*

/code - Редактор кода Monaco
/radio - Радио станции США
/games - Змейка и 2048
/offer - Создать бизнес-оффер
/extension - Скачать расширение VSCode
/about - О проекте`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('code', (ctx) => {
  ctx.reply(
    `💻 *Monaco Code Editor*

Функции:
✅ Подсветка синтаксиса
✅ Автодополнение кода
✅ TypeScript/JavaScript
✅ Множество языков

Для полноценной работы используйте веб-версию:
🌐 ${process.env.REPLIT_DEV_DOMAIN || 'https://clinego.replit.app'}`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('Открыть редактор', process.env.REPLIT_DEV_DOMAIN || 'https://clinego.replit.app')]
      ])
    }
  );
});

bot.command('radio', (ctx) => {
  const buttons = STATIONS.map(station => [
    Markup.button.callback(
      `${station.emoji} ${station.name} - ${station.frequency}`,
      `radio_${station.name}`
    )
  ]);

  ctx.reply(
    `📻 *Интернет Радио*

Выберите станцию:`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(buttons)
    }
  );
});

STATIONS.forEach(station => {
  bot.action(`radio_${station.name}`, (ctx) => {
    ctx.answerCbQuery();
    ctx.reply(
      `${station.emoji} *${station.name}*\n${station.frequency}\n\n▶️ Играет...`,
      { parse_mode: 'Markdown' }
    );
  });
});

bot.command('games', (ctx) => {
  ctx.reply(
    `🎮 *Игры ClineGo*

Выберите игру:`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🐍 Snake (WASD)', 'game_snake')],
        [Markup.button.callback('🎯 2048', 'game_2048')],
      ])
    }
  );
});

bot.action('game_snake', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    `🐍 *Snake Game*

Управление: WASD
Цель: Съешь максимум яблок!

Для игры откройте веб-версию:`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('🎮 Играть', `${process.env.REPLIT_DEV_DOMAIN || 'https://clinego.replit.app'}?game=snake`)]
      ])
    }
  );
});

bot.action('game_2048', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    `🎯 *2048 Game*

Управление: Стрелки или WASD
Цель: Собрать плитку 2048!

Для игры откройте веб-версию:`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('🎮 Играть', `${process.env.REPLIT_DEV_DOMAIN || 'https://clinego.replit.app'}?game=2048`)]
      ])
    }
  );
});

bot.command('offer', (ctx) => {
  ctx.reply(
    `📄 *Генератор Бизнес Предложений*

Создайте профессиональное коммерческое предложение!

Для создания оффера используйте веб-интерфейс:`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('📝 Создать оффер', `${process.env.REPLIT_DEV_DOMAIN || 'https://clinego.replit.app'}?view=offers`)]
      ])
    }
  );
});

bot.command('extension', (ctx) => {
  ctx.reply(
    `📦 *Codex Free Extension*

VSCode расширение для AI-разработки

*Возможности:*
✅ AI автодополнение
✅ Генерация кода
✅ Рефакторинг
✅ Документация

*Установка:*
1. Скачайте .vsix файл
2. Откройте VSCode
3. Extensions → Install from VSIX
4. Выберите файл

Версия: 1.0.0 | Размер: 2.5 MB`,
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.url('⬇️ Скачать', process.env.REPLIT_DEV_DOMAIN || 'https://clinego.replit.app')]
      ])
    }
  );
});

bot.command('about', (ctx) => {
  ctx.reply(
    `ℹ️ *О ClineGo IDE*

AI-powered среда разработки с интегрированными инструментами

*Компоненты:*
• Monaco Code Editor
• Internet Radio (NPR, KEXP, WNYC, KCRW)
• Игры (Snake, 2048)
• Генератор предложений
• Telegram авторизация
• VSCode расширение

*Технологии:*
React • TypeScript • Node.js • Telegraf • Monaco Editor

🔗 GitHub: github.com/hoOjlGun/super-octo-robot`,
    { parse_mode: 'Markdown' }
  );
});

bot.on('text', (ctx) => {
  ctx.reply(
    '❓ Не понял команду. Используйте /help для списка команд',
    {
      ...Markup.inlineKeyboard([
        [Markup.button.callback('📋 Показать команды', 'show_help')]
      ])
    }
  );
});

bot.action('show_help', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    `📚 *Команды ClineGo Bot:*

/code - Редактор кода Monaco
/radio - Радио станции США
/games - Змейка и 2048
/offer - Создать бизнес-оффер
/extension - Скачать расширение VSCode
/about - О проекте`,
    { parse_mode: 'Markdown' }
  );
});

export function startBot() {
  bot.launch();
  console.log('🤖 Telegram bot started successfully!');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

export default bot;
