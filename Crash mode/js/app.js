const toggleButton = document.querySelector('.mode-toggle');
const statusText = document.querySelector('.status');
const logContainer = document.querySelector('.log');
const body = document.body;

const logMessages = [
  'Kernel panic: unexpected energy surge detected... перезапуск невозможен.',
  'GPU overload: shader pipeline crashed. Попробуйте снизить настройки эффектов.',
  'Memory leak warning: виртуальные блоки переполнены на 132%.',
  'ALERT: параметр stability вернулся со значением NaN.',
  'System clock desync: смещение по времени 42 000 мс.',
  'Process #404 not found, но он продолжает отправлять события.',
  'Critical glitch: наблюдается расщепление UI на 3 параллельных потока.',
  'Отклонение цвета: палитра уходит в ультрафиолетовый диапазон.',
  'Input lag увеличен до 4.2 секунд. Пользовательский контроль потерян.',
  'Ошибка: не удалось зафиксировать реальность. Переход в режим симуляции.',
  'Внимание: активирована защита от стабильности. Crash режим вступил в силу.',
  'Stack trace переполнен. Вероятна деградация интерфейса.',
  'Сетевой шум: пакет «/dev/glitch» доставлен с искажениями.',
  'Протокол самоисправления отключён. Сбой будет развиваться.',
  'Звуковая система: зациклена на 8-битных тревожных тонах.'
];

const maxLogLines = 12;
let crashInterval = null;

function appendLogLine(message) {
  const line = document.createElement('p');
  line.className = 'log-line';
  line.textContent = message;
  logContainer.appendChild(line);
  if (logContainer.children.length > maxLogLines) {
    logContainer.removeChild(logContainer.firstElementChild);
  }
  logContainer.scrollTo({ top: logContainer.scrollHeight, behavior: 'smooth' });
}

function startCrashMode() {
  if (crashInterval) return;
  appendLogLine('*** Crash режим активирован. Приготовьтесь к визуальному сбою. ***');
  crashInterval = setInterval(() => {
    const message = logMessages[Math.floor(Math.random() * logMessages.length)];
    appendLogLine(message);
  }, 700);
}

function stopCrashMode() {
  if (!crashInterval) return;
  clearInterval(crashInterval);
  crashInterval = null;
  appendLogLine('*** Crash режим остановлен. Интерфейс стабилизирован. ***');
}

function toggleCrashMode() {
  const isActive = body.classList.toggle('crash-mode');
  toggleButton.setAttribute('aria-pressed', String(isActive));
  toggleButton.textContent = isActive ? 'Выключить crash режим' : 'Включить crash режим';
  statusText.textContent = isActive ? 'Crash режим включён.' : 'Crash режим выключен.';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    appendLogLine('Внимание: включён режим снижения анимаций. Эффекты могут быть ограничены.');
  }

  if (isActive) {
    startCrashMode();
  } else {
    stopCrashMode();
  }
}

toggleButton.addEventListener('click', toggleCrashMode);

// Предзаполняем несколько строк журнала для наглядности
appendLogLine('Система готова к активации crash режима.');
appendLogLine('Нажмите кнопку, чтобы запустить эксперимент.');
