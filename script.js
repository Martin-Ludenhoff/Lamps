var count_user = 0; // счётчик щелчков пользователя
var game_is_running = 0; // флаг запущенной игры
var audio = new Audio('click.mp3');
var min_turns = 0; // минимальное количество ходов для завершения игры

// обработчики кликов по лампочкам
img11.addEventListener('click', e => { switch_elems ('1', '1'); });
img12.addEventListener('click', e => { switch_elems ('1', '2'); });
img13.addEventListener('click', e => { switch_elems ('1', '3'); });
img14.addEventListener('click', e => { switch_elems ('1', '4'); });
img15.addEventListener('click', e => { switch_elems ('1', '5'); });
img16.addEventListener('click', e => { switch_elems ('1', '6'); });
img21.addEventListener('click', e => { switch_elems ('2', '1'); });
img22.addEventListener('click', e => { switch_elems ('2', '2'); });
img23.addEventListener('click', e => { switch_elems ('2', '3'); });
img24.addEventListener('click', e => { switch_elems ('2', '4'); });
img25.addEventListener('click', e => { switch_elems ('2', '5'); });
img26.addEventListener('click', e => { switch_elems ('2', '6'); });
img31.addEventListener('click', e => { switch_elems ('3', '1'); });
img32.addEventListener('click', e => { switch_elems ('3', '2'); });
img33.addEventListener('click', e => { switch_elems ('3', '3'); });
img34.addEventListener('click', e => { switch_elems ('3', '4'); });
img35.addEventListener('click', e => { switch_elems ('3', '5'); });
img36.addEventListener('click', e => { switch_elems ('3', '6'); });
img41.addEventListener('click', e => { switch_elems ('4', '1'); });
img42.addEventListener('click', e => { switch_elems ('4', '2'); });
img43.addEventListener('click', e => { switch_elems ('4', '3'); });
img44.addEventListener('click', e => { switch_elems ('4', '4'); });
img45.addEventListener('click', e => { switch_elems ('4', '5'); });
img46.addEventListener('click', e => { switch_elems ('4', '6'); });
img51.addEventListener('click', e => { switch_elems ('5', '1'); });
img52.addEventListener('click', e => { switch_elems ('5', '2'); });
img53.addEventListener('click', e => { switch_elems ('5', '3'); });
img54.addEventListener('click', e => { switch_elems ('5', '4'); });
img55.addEventListener('click', e => { switch_elems ('5', '5'); });
img56.addEventListener('click', e => { switch_elems ('5', '6'); });
img61.addEventListener('click', e => { switch_elems ('6', '1'); });
img62.addEventListener('click', e => { switch_elems ('6', '2'); });
img63.addEventListener('click', e => { switch_elems ('6', '3'); });
img64.addEventListener('click', e => { switch_elems ('6', '4'); });
img65.addEventListener('click', e => { switch_elems ('6', '5'); });
img66.addEventListener('click', e => { switch_elems ('6', '6'); });

// ===================================================================================

function switch_elems (str, col) {
  // клик по лампочке (строка, колонка); переключает все лампочки в строке и колонке
  if (game_is_running == 0) { return; }
  for (let i = 1; i < 7; i++) {
    switch_elem ('img' + str + i);
    switch_elem ('img' + i + col);
  }
  switch_elem ('img' + str + col);
  audio.play();
  count_user++; // счётчик щелчков пользователя
  status_str.innerText = 'Ходов: ' + count_user + ' (минимум ' + min_turns + ')';
  borders_off();
  if (is_game_over() == 1) {
    game_is_running = 0;
    status_str.innerText = status_str.innerText + ', игра окончена.';
    min_turns = 0;
    var sound = new Audio('game_over.mp3');
    sound.play();
  }
}

function switch_elem (elem_name) {
  // переключает конкретную лампочку (id элемента)
  var elem_obj = document.getElementById(elem_name);
  if (elem_obj.src.substr(-7) == 'off.png') {
    elem_obj.src = 'on.png';
    } else {
    elem_obj.src = 'off.png';
  }
}

new_game_href.addEventListener('click', e => {
  // клик по ссылке "Новая игра"
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      var elem_obj = document.getElementById('img' + i + j);
      elem_obj.src = 'off.png';
      var is_on = randomInteger(0, 1);
      if (is_on == 1) { elem_obj.src = 'on.png'; }
    }
  }
  count_user = 0; // обнуляем счётчик щелчков пользователя
  game_is_running = 1; // флаг запущенной игры
  var sound = new Audio('game_start.mp3');
  sound.play();
  min_turns = turns_min().length;
  status_str.innerText = 'Ходов: ' + count_user + ' (минимум ' + min_turns + ')';
  borders_off();
});

status_str.addEventListener('click', e => {
  // подсказка, ставит рамки вокруг всех лампочек, которые нужно нажать
  if (game_is_running == 1) {
    var turns = turns_min();
    for (let i = 0; i < turns.length; i++) {
      var elem_obj = document.getElementById('img' + turns[i]);
      elem_obj.border = '1px';
    }
  }
});

function borders_off() {
  // снимает рамки со всех лампочек, если они есть
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      var elem_obj = document.getElementById('img' + i + j);
      elem_obj.border = '';
    }
  }
}

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function is_game_over() {
  // проверяет, все ли лампочки зажжены (игра завершена); возвращает 0 или 1
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      var elem_obj = document.getElementById('img' + i + j);
      if (elem_obj.src.substr(-7) == 'off.png') { return 0; }
    }
  }
  return 1;
}

function turns_min() {
  // определяет минимальные ходы для завершения
  let arr = [];
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      var elem_obj = document.getElementById('img' + i + j);
      if (elem_obj.src.substr(-7) == 'off.png') {
        arr.push('1' + j);
        arr.push('2' + j);
        arr.push('3' + j);
        arr.push('4' + j);
        arr.push('5' + j);
        arr.push('6' + j);
        arr.push(i + '1');
        arr.push(i + '2');
        arr.push(i + '3');
        arr.push(i + '4');
        arr.push(i + '5');
        arr.push(i + '6');
        arr.push('' + i + j);
      }
    }
  }
  // теперь из массива надо исключить все элементы, которые встречаются чётное количество раз,
  // а те элементы, которые встречаются нечётное количество раз, нужно оставить в единственом экземпляре
  let res = [];
  for (let i = 1; i < 7; i++) {
    for (let j = 1; j < 7; j++) {
      var find = arr.filter(el => el === '' + i + j); // возвращает массив, включающий все совпадения
      if (find.length % 2 != 0) { res.push('' + i + j); }
    }
  }
  return res;
}
