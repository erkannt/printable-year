const appContainer = document.querySelector('#appContainer');
if (!appContainer) {
  throw new Error('ERROR: no appContainer found');
}

const isInputElement = (element: Element): element is HTMLInputElement => element instanceof HTMLInputElement;

const yearInput = document.querySelector('#yearInput');
if (!yearInput) {
  throw new Error('ERROR: no yearInput found');
}
if (!isInputElement(yearInput)) {
  throw new Error('ERROR: yearInput not an input');
}

const datesInYear = (year: number) => {
  const dates: Array<Date> = [];
  let currentDate = new Date(year.toString());
  while (currentDate.getFullYear() === year) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const refreshCalendar = (year: number) => {
  appContainer.innerHTML = '';
  const calendarContainer = document.createElement('div');
  calendarContainer.id = 'calendarContainer';
  appContainer.appendChild(calendarContainer);

  const yearFormatter = new Intl.DateTimeFormat('default', { year: '2-digit' });
  const monthFormatter = new Intl.DateTimeFormat('default', { month: 'long' });
  const dayFormatter = new Intl.DateTimeFormat('default', { day: '2-digit' });
  const weekdayFormatter = new Intl.DateTimeFormat('default', { weekday: 'narrow' });

  let monthName: string;
  datesInYear(year).forEach((date) => {
    if (date.getDate() === 1) {
      const month = document.createElement('span');
      monthName = monthFormatter.format(date);
      if (date.getMonth() === 0) {
        monthName = `${monthName} '${yearFormatter.format(date)}`;
      }
      month.textContent = monthName;
      month.classList.add('month', 'calendarItem');
      month.setAttribute('data-month', (date.getMonth() + 1).toString());
      calendarContainer.appendChild(month);
    }

    const day = document.createElement('div');
    day.textContent = `${dayFormatter.format(date)} ${weekdayFormatter.format(date)}`;
    day.classList.add('day', 'calendarItem');
    day.setAttribute('data-month', (date.getMonth() + 1).toString());
    day.setAttribute('data-dayofweek', date.getDay().toString());
    day.setAttribute('data-day', date.getDate().toString());
    calendarContainer.appendChild(day);
  });
};

yearInput.addEventListener('change', () => {
  refreshCalendar(Number(yearInput.value));
});

yearInput.value = new Date().getFullYear().toString();

refreshCalendar(Number(yearInput.value));
