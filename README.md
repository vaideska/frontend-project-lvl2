# frontend-project-lvl2
Учебный проект по JS "Вычислитель отличий".

[![Node CI](https://github.com/vaideska/frontend-project-lvl2/workflows/Node%20CI/badge.svg?branch=master&kill_cache=1)](https://github.com/vaideska/frontend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/7c8b223430257fd96a46/maintainability)](https://codeclimate.com/github/vaideska/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/7c8b223430257fd96a46/test_coverage)](https://codeclimate.com/github/vaideska/frontend-project-lvl2/test_coverage)

## Для установки пакета необходимо:
- клонировать репозиторий
- установить npm (команда `make install` из корневого каталога)
- создать локальную связь (команда `npm link`, возможно придется запустить под sudo)
- после можно пользоваться пакетом, подробнее команда: `gendiff -h`

#### Демонстрация установки пакета "Вычислитель отличий":

[![asciicast](https://asciinema.org/a/KoGvhhjKS0ySG8lJr2g2obUel.svg)](https://asciinema.org/a/KoGvhhjKS0ySG8lJr2g2obUel)

### Пакет возможно использовать как библиотеку
Результат функции - строка.

<code>
import genDiff from 'frontend-project-lvl2';
</code>
<code>
const diff = genDiff(filepath1, filepath2, format);<br>
console.log(diff);
</code>

### Можно сравнить файлы с расширениями .json и .yml с разными типами вывода
Следующие демонтрации на тестовых файлах из каталога репозитория: `frontend-project-lvl2/__tests__/__fixtures__/`
Программа работает как с относительными, так и абсолютными путями до файлов.

## Вывод отличий в формате по-умоланию: stylish

[![asciicast](https://asciinema.org/a/CMGYBA9pLJgulJEjPqGyNnoYG.svg)](https://asciinema.org/a/CMGYBA9pLJgulJEjPqGyNnoYG)

## Вывод отличий в плоском формате: plain

[![asciicast](https://asciinema.org/a/T14CRTfLSRt4JwH0IRzh1zb28.svg)](https://asciinema.org/a/T14CRTfLSRt4JwH0IRzh1zb28)

## Вывод отличий в json формате: json

[![asciicast](https://asciinema.org/a/pc8aDawD9c2qRhq6r1ldQ9exN.svg)](https://asciinema.org/a/pc8aDawD9c2qRhq6r1ldQ9exN)