# Quiz Game - API
Here is an web application written in vanilla Javascript, CSS and HTML5. I used Open Trivia Database API for the questions.

<p align="center">
  <img src="https://user-images.githubusercontent.com/80858788/194381771-e167b6ec-8d61-426b-b308-b3d43ddac039.gif" alt="Quick Look">
</p>

## API for Request
[Quiz API](https://opentdb.com/api_config.php)

## API Usage

- To create a URL object, pass the URL as a string into a const.
- To start a request, call the special function ````fetch()```` and pass the url object as an argument.
- The method returns a promise, so you have to wait for the JSON: ````await result.json()````.

````
async function loadQuestion() {
    const APIUrl = 'https://opentdb.com/api.php?amount=1';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    showQuestion(data.results[0]);
    _result.innerHTML = "";
}
````





