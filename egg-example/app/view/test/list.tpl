<!DOCTYPE html>
<html>
<head>
    <title>Hacker News</title>
</head>
<body>
<ul class="news-view view">
    {% for item, v in list %}
    <li class="item">
        <a href="{{ item }}">{{ item + ':'+ v }}</a>
    </li>
    {% endfor %}
</ul>

<form method="POST" action="/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
    title: <input name="title" />
    file: <input name="file" type="file" />
    <button type="submit">Upload</button>
</form>
</body>
</html>
